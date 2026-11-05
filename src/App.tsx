import React, { useState, useEffect } from 'react';
import { ScreenTab, Vendor, VendorPackage, BudgetItem, CeremonialEvent, RoyalGuest } from './types';
import {
  INITIAL_VENDORS,
  AUSPICIOUS_MUHURATS,
  INITIAL_BUDGET_ITEMS,
  INITIAL_EVENTS,
  INITIAL_GUESTS,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { DirectoryView } from './components/DirectoryView';
import { VendorDetailModal } from './components/VendorDetailModal';
import { MuhuratCalendarView } from './components/MuhuratCalendarView';
import { BudgetTrackerView } from './components/BudgetTrackerView';
import { CeremonialItineraryView } from './components/CeremonialItineraryView';
import { GuestRosterView } from './components/GuestRosterView';
import { SaveTheDateModal } from './components/SaveTheDateModal';
import { BookingAdvanceModal } from './components/BookingAdvanceModal';
import { AuthProvider, useAuth } from './firebase/authContext';
import {
  subscribeBudgetItems,
  saveBudgetItem,
  subscribeGuests,
  saveGuest,
  subscribeEvents,
  saveEvent,
  getWeddingSettings,
  saveWeddingSettings,
} from './firebase/firestoreService';
import { Heart, ShieldCheck, Cloud, LogIn } from 'lucide-react';

function WeddingApp() {
  const { currentUser, loginWithGoogle } = useAuth();
  const [currentTab, setCurrentTab] = useState<ScreenTab>('directory');
  const [activeMuhuratDate, setActiveMuhuratDate] = useState<string>('2026-11-28');
  const [vendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [muhuratDates] = useState(AUSPICIOUS_MUHURATS);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(INITIAL_BUDGET_ITEMS);
  const [events, setEvents] = useState<CeremonialEvent[]>(INITIAL_EVENTS);
  const [guests, setGuests] = useState<RoyalGuest[]>(INITIAL_GUESTS);

  // Modals state
  const [selectedVendorForModal, setSelectedVendorForModal] = useState<Vendor | null>(null);
  const [bookingModalState, setBookingModalState] = useState<{
    vendor: Vendor;
    selectedPackage?: VendorPackage;
  } | null>(null);
  const [isSaveTheDateOpen, setIsSaveTheDateOpen] = useState(false);

  // Sync with Firestore when currentUser is available
  useEffect(() => {
    if (!currentUser) return;

    // 1. Fetch wedding settings
    getWeddingSettings(currentUser.uid).then((settings) => {
      if (settings && settings.activeMuhuratDate) {
        setActiveMuhuratDate(settings.activeMuhuratDate);
      } else {
        saveWeddingSettings(currentUser.uid, {
          activeMuhuratDate: '2026-11-28',
          totalBudget: 1800000,
        });
      }
    });

    // 2. Subscribe Budget
    const unsubBudget = subscribeBudgetItems(currentUser.uid, (items) => {
      if (items.length > 0) {
        setBudgetItems(items);
      } else {
        // Seed initial items for new users in Firestore
        INITIAL_BUDGET_ITEMS.forEach((item) => {
          saveBudgetItem(currentUser.uid, item);
        });
      }
    });

    // 3. Subscribe Guests
    const unsubGuests = subscribeGuests(currentUser.uid, (loadedGuests) => {
      if (loadedGuests.length > 0) {
        setGuests(loadedGuests);
      } else {
        INITIAL_GUESTS.forEach((g) => {
          saveGuest(currentUser.uid, g);
        });
      }
    });

    // 4. Subscribe Events
    const unsubEvents = subscribeEvents(currentUser.uid, (loadedEvents) => {
      if (loadedEvents.length > 0) {
        setEvents(loadedEvents);
      } else {
        INITIAL_EVENTS.forEach((ev) => {
          saveEvent(currentUser.uid, ev);
        });
      }
    });

    return () => {
      unsubBudget();
      unsubGuests();
      unsubEvents();
    };
  }, [currentUser]);

  // Handle active date change
  const handleSetActiveDate = (newDate: string) => {
    setActiveMuhuratDate(newDate);
    if (currentUser) {
      saveWeddingSettings(currentUser.uid, { activeMuhuratDate: newDate });
    }
  };

  // Budget Actions
  const handleAddBudgetItem = (newItem: Omit<BudgetItem, 'id'>) => {
    const itemWithId: BudgetItem = {
      ...newItem,
      id: `b-${Date.now()}`,
    };
    setBudgetItems((prev) => [itemWithId, ...prev]);

    if (currentUser) {
      saveBudgetItem(currentUser.uid, itemWithId);
    }
  };

  const handleRecordPayment = (itemId: string, additionalAmount: number) => {
    setBudgetItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newAdvance = item.advancePaid + additionalAmount;
          const isCleared = newAdvance >= item.allocatedAmount;
          const updated: BudgetItem = {
            ...item,
            advancePaid: Math.min(newAdvance, item.allocatedAmount),
            status: isCleared ? 'Fully Paid' : 'Advance Paid',
          };
          if (currentUser) {
            saveBudgetItem(currentUser.uid, updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  // Checklist Actions
  const handleToggleChecklist = (eventId: string, checklistId: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const updatedEvent: CeremonialEvent = {
            ...evt,
            checklist: evt.checklist.map((item) => {
              if (item.id === checklistId) {
                return { ...item, completed: !item.completed };
              }
              return item;
            }),
          };
          if (currentUser) {
            saveEvent(currentUser.uid, updatedEvent);
          }
          return updatedEvent;
        }
        return evt;
      })
    );
  };

  const handleAddChecklistItem = (eventId: string, task: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const updatedEvent: CeremonialEvent = {
            ...evt,
            checklist: [
              ...evt.checklist,
              { id: `c-${Date.now()}`, task, completed: false },
            ],
          };
          if (currentUser) {
            saveEvent(currentUser.uid, updatedEvent);
          }
          return updatedEvent;
        }
        return evt;
      })
    );
  };

  // Guest Actions
  const handleAddGuest = (newGuest: Omit<RoyalGuest, 'id'>) => {
    const guestWithId: RoyalGuest = {
      ...newGuest,
      id: `g-${Date.now()}`,
    };
    setGuests((prev) => [guestWithId, ...prev]);

    if (currentUser) {
      saveGuest(currentUser.uid, guestWithId);
    }
  };

  const handleToggleHamper = (guestId: string) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === guestId) {
          const updated: RoyalGuest = { ...g, welcomeHamperDelivered: !g.welcomeHamperDelivered };
          if (currentUser) {
            saveGuest(currentUser.uid, updated);
          }
          return updated;
        }
        return g;
      })
    );
  };

  const handleUpdateGuestRsvp = (guestId: string, status: RoyalGuest['rsvpStatus']) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === guestId) {
          const updated: RoyalGuest = { ...g, rsvpStatus: status };
          if (currentUser) {
            saveGuest(currentUser.uid, updated);
          }
          return updated;
        }
        return g;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0F172A]">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenConcierge={() => setIsSaveTheDateOpen(true)}
        activeMuhuratDate={activeMuhuratDate}
      />

      {/* Cloud Sync Status Banner for Unauthenticated Users */}
      {!currentUser && (
        <div className="bg-[#FFF1F2] border-b border-[#FFE4E6] px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#5b4041]">
              <Cloud className="w-4 h-4 text-[#b90538] shrink-0" />
              <span>
                <strong>Plan your wedding online:</strong> Sign in with your Google account to automatically save your budget, guest list, and checklist to Firebase Cloud.
              </span>
            </div>
            <button
              onClick={loginWithGoogle}
              className="text-xs font-bold text-[#b90538] hover:text-[#92002a] underline shrink-0 flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In with Google</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentTab === 'directory' && (
          <DirectoryView
            vendors={vendors}
            activeMuhuratDate={activeMuhuratDate}
            onSelectVendor={(v: Vendor) => setSelectedVendorForModal(v)}
            onRequestBooking={(v: Vendor, pkg?: VendorPackage) =>
              setBookingModalState({ vendor: v, selectedPackage: pkg })
            }
            onNavigateToMuhurat={() => setCurrentTab('muhurat')}
          />
        )}

        {currentTab === 'muhurat' && (
          <MuhuratCalendarView
            muhuratDates={muhuratDates}
            activeMuhuratDate={activeMuhuratDate}
            onSetActiveDate={handleSetActiveDate}
            vendors={vendors}
            onSelectVendor={(v) => setSelectedVendorForModal(v)}
            onNavigateToDirectory={() => setCurrentTab('directory')}
          />
        )}

        {currentTab === 'budget' && (
          <BudgetTrackerView
            budgetItems={budgetItems}
            totalCapBudget={1800000} // Realistic ₹18 Lakhs
            onAddItem={handleAddBudgetItem}
            onRecordPayment={handleRecordPayment}
          />
        )}

        {currentTab === 'itinerary' && (
          <CeremonialItineraryView
            events={events}
            onToggleChecklistItem={handleToggleChecklist}
            onAddChecklistItem={handleAddChecklistItem}
          />
        )}

        {currentTab === 'guests' && (
          <GuestRosterView
            guests={guests}
            onAddGuest={handleAddGuest}
            onToggleHamper={handleToggleHamper}
            onUpdateRsvp={handleUpdateGuestRsvp}
          />
        )}
      </main>

      {/* Modals */}
      <VendorDetailModal
        vendor={selectedVendorForModal}
        activeMuhuratDate={activeMuhuratDate}
        onClose={() => setSelectedVendorForModal(null)}
        onRequestBooking={(v, pkg) => {
          setSelectedVendorForModal(null);
          setBookingModalState({ vendor: v, selectedPackage: pkg });
        }}
      />

      <BookingAdvanceModal
        vendor={bookingModalState?.vendor || null}
        selectedPackage={bookingModalState?.selectedPackage}
        activeMuhuratDate={activeMuhuratDate}
        isOpen={Boolean(bookingModalState)}
        onClose={() => setBookingModalState(null)}
        onConfirmBookingAdvance={(item) => {
          handleAddBudgetItem(item);
        }}
      />

      <SaveTheDateModal
        isOpen={isSaveTheDateOpen}
        onClose={() => setIsSaveTheDateOpen(false)}
        activeMuhuratDate={activeMuhuratDate}
      />

      {/* Footer */}
      <footer className="mt-16 bg-[#131b2e] text-white border-t border-[#283044] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#b90538] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>
              <div>
                <span className="font-playfair text-xl font-bold tracking-tight block">
                  UTSAVA
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 block">
                  Indian Wedding Planning Made Simple
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-300">
              <button onClick={() => setCurrentTab('directory')} className="hover:text-white transition-colors">
                Venues &amp; Services
              </button>
              <button onClick={() => setCurrentTab('muhurat')} className="hover:text-white transition-colors">
                Wedding Dates
              </button>
              <button onClick={() => setCurrentTab('budget')} className="hover:text-white transition-colors">
                Budget Planner
              </button>
              <button onClick={() => setCurrentTab('itinerary')} className="hover:text-white transition-colors">
                Event Schedule
              </button>
              <button onClick={() => setCurrentTab('guests')} className="hover:text-white transition-colors">
                Guest List
              </button>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>
              © 2026–2027 Utsava. Connected to Firebase Cloud Firestore for real-time synchronization.
            </p>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Firebase Auth &amp; Cloud Firestore Security Enabled</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WeddingApp />
    </AuthProvider>
  );
}
