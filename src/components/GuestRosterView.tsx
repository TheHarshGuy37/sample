import React, { useState, useMemo } from 'react';
import { RoyalGuest } from '../types';
import { Users, Plus, Gift, Search, Car } from 'lucide-react';

interface GuestRosterViewProps {
  guests: RoyalGuest[];
  onAddGuest: (guest: Omit<RoyalGuest, 'id'>) => void;
  onToggleHamper: (guestId: string) => void;
  onUpdateRsvp: (guestId: string, status: RoyalGuest['rsvpStatus']) => void;
}

export const GuestRosterView: React.FC<GuestRosterViewProps> = ({
  guests,
  onAddGuest,
  onToggleHamper,
  onUpdateRsvp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('All');
  const [filterRsvp, setFilterRsvp] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newFamilySide, setNewFamilySide] = useState<RoyalGuest['familySide']>("Bride's Side");
  const [newPartySize, setNewPartySize] = useState('2');
  const [newSuite, setNewSuite] = useState('');
  const [newDiet, setNewDiet] = useState<RoyalGuest['dietaryPreference']>('Vegetarian');
  const [newConcierge, setNewConcierge] = useState<RoyalGuest['airportConcierge']>('Coming on Own');
  const [newContact, setNewContact] = useState('');

  // Stats
  const totalHeadcount = useMemo(() => {
    return guests.reduce((sum, g) => sum + g.partySize, 0);
  }, [guests]);

  const confirmedCount = useMemo(() => {
    return guests.filter((g) => g.rsvpStatus === 'Confirmed').reduce((sum, g) => sum + g.partySize, 0);
  }, [guests]);

  const awaitingCount = useMemo(() => {
    return guests.filter((g) => g.rsvpStatus === 'Pending').reduce((sum, g) => sum + g.partySize, 0);
  }, [guests]);

  const hampersDeliveredCount = useMemo(() => {
    return guests.filter((g) => g.welcomeHamperDelivered).length;
  }, [guests]);

  const filteredGuests = guests.filter((g) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = g.name.toLowerCase().includes(q) || g.suiteAssigned.toLowerCase().includes(q) || g.contact.includes(q);
      if (!match) return false;
    }
    if (filterTier !== 'All' && g.familySide !== filterTier) return false;
    if (filterRsvp !== 'All' && g.rsvpStatus !== filterRsvp) return false;
    return true;
  });

  const handleCreateGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddGuest({
      name: newName.trim(),
      familySide: newFamilySide,
      partySize: parseInt(newPartySize) || 1,
      suiteAssigned: newSuite.trim() || 'Room to be assigned',
      rsvpStatus: 'Confirmed',
      dietaryPreference: newDiet,
      airportConcierge: newConcierge,
      welcomeHamperDelivered: false,
      contact: newContact.trim() || '+91 98000 00000',
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewSuite('');
    setNewContact('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Wedding Guest List &amp; Room Allocations
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Manage your guest count, confirmed attendance, room stays, food choices, and welcome gift boxes.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#b90538] hover:bg-[#92002a] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Guest / Family</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total People</span>
          <div className="font-sans text-xl sm:text-2xl font-bold text-[#0F172A] tabular-nums mt-0.5">
            {totalHeadcount} Guests
          </div>
          <span className="text-xs text-slate-500">{guests.length} invitation cards sent</span>
        </div>

        <div className="p-4 bg-[#ECFDF5] rounded-2xl border border-emerald-200">
          <span className="text-[11px] font-semibold text-[#006947] uppercase block">Confirmed Coming</span>
          <div className="font-sans text-xl sm:text-2xl font-bold text-[#006947] tabular-nums mt-0.5">
            {confirmedCount} Guests
          </div>
          <span className="text-xs text-emerald-700">Food &amp; rooms planned</span>
        </div>

        <div className="p-4 bg-[#FFF1F2] rounded-2xl border border-[#FFE4E6]">
          <span className="text-[11px] font-semibold text-[#b90538] uppercase block">Pending RSVP</span>
          <div className="font-sans text-xl sm:text-2xl font-bold text-[#b90538] tabular-nums mt-0.5">
            {awaitingCount} Guests
          </div>
          <span className="text-xs text-[#5b4041]">To call and confirm</span>
        </div>

        <div className="p-4 bg-[#FEF3C7] rounded-2xl border border-[#FDE68A]">
          <span className="text-[11px] font-semibold text-[#904d00] uppercase block">Sweet Hampers Given</span>
          <div className="font-sans text-xl sm:text-2xl font-bold text-[#904d00] tabular-nums mt-0.5">
            {hampersDeliveredCount} / {guests.length}
          </div>
          <span className="text-xs text-amber-800">Welcome boxes handed</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        
        {/* Search & Filter Header */}
        <div className="p-4 border-b border-[#F1F5F9] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, room, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#b90538]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none"
            >
              <option value="All">All Groups</option>
              <option value="Bride's Side">Bride's Side</option>
              <option value="Groom's Side">Groom's Side</option>
              <option value="Close Family">Close Family</option>
              <option value="Friends & Colleagues">Friends &amp; Colleagues</option>
              <option value="Outstation Guests">Outstation Guests</option>
            </select>

            <select
              value={filterRsvp}
              onChange={(e) => setFilterRsvp(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none"
            >
              <option value="All">All Attendance</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cannot Attend">Cannot Attend</option>
            </select>
          </div>
        </div>

        {/* Guest Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] text-[#475569] border-b border-[#E2E8F0]">
                <th className="py-3 px-4 font-semibold">Guest / Family Name</th>
                <th className="py-3 px-3 font-semibold">Side / Group</th>
                <th className="py-3 px-3 font-semibold">Count</th>
                <th className="py-3 px-3 font-semibold">Stay / Room</th>
                <th className="py-3 px-3 font-semibold">Food Preference</th>
                <th className="py-3 px-3 font-semibold">Travel Pickup</th>
                <th className="py-3 px-3 font-semibold">Attendance</th>
                <th className="py-3 px-4 font-semibold text-center">Sweet Hamper</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="text-xs font-semibold text-[#0F172A] block">{guest.name}</strong>
                    <span className="text-[11px] text-slate-500 block">{guest.contact}</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-700">
                    {guest.familySide}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#0F172A] tabular-nums">
                    {guest.partySize} {guest.partySize === 1 ? 'person' : 'people'}
                  </td>
                  <td className="py-3.5 px-3 text-[#b90538] font-medium">
                    {guest.suiteAssigned}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <span className="px-2 py-0.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-md text-[11px] font-medium">
                      {guest.dietaryPreference}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <div className="flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-slate-400" />
                      <span>{guest.airportConcierge}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <select
                      value={guest.rsvpStatus}
                      onChange={(e) => onUpdateRsvp(guest.id, e.target.value as any)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border-0 cursor-pointer ${
                        guest.rsvpStatus === 'Confirmed'
                          ? 'bg-[#ECFDF5] text-[#047857]'
                          : guest.rsvpStatus === 'Pending'
                          ? 'bg-[#FEF3C7] text-[#B45309]'
                          : 'bg-[#FFF1F2] text-[#b90538]'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cannot Attend">Cannot Attend</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onToggleHamper(guest.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        guest.welcomeHamperDelivered
                          ? 'bg-[#ECFDF5] border-[#10B981]/40 text-[#047857]'
                          : 'bg-[#FAF9F6] border-[#E2E8F0] text-slate-400 hover:text-slate-600'
                      }`}
                      title="Click to toggle sweet hamper delivery"
                    >
                      <Gift className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 max-w-lg w-full shadow-2xl space-y-4 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b90538]">Guest Entry</span>
              <h3 className="font-playfair text-xl font-bold text-[#0F172A] mt-0.5">Add Family / Guest</h3>
            </div>

            <form onSubmit={handleCreateGuest} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#0F172A] block">Full Name</label>
                <input
                  type="text"
                  placeholder="E.g., Ramesh &amp; Kavita Gupta (Uncle)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#b90538]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Relation / Group</label>
                  <select
                    value={newFamilySide}
                    onChange={(e) => setNewFamilySide(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                  >
                    <option value="Bride's Side">Bride's Side</option>
                    <option value="Groom's Side">Groom's Side</option>
                    <option value="Close Family">Close Family</option>
                    <option value="Friends & Colleagues">Friends &amp; Colleagues</option>
                    <option value="Outstation Guests">Outstation Guests</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Total Persons</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newPartySize}
                    onChange={(e) => setNewPartySize(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#0F172A] block">Assigned Room / Stay</label>
                <input
                  type="text"
                  placeholder="E.g., Hall Room 104 or Staying at Hotel"
                  value={newSuite}
                  onChange={(e) => setNewSuite(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Food Choice</label>
                  <select
                    value={newDiet}
                    onChange={(e) => setNewDiet(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Jain Food">Jain Food</option>
                    <option value="Any Food">Any Food</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Travel Pickup</label>
                  <select
                    value={newConcierge}
                    onChange={(e) => setNewConcierge(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                  >
                    <option value="Coming on Own">Coming on Own</option>
                    <option value="Need Car Pickup">Need Car Pickup</option>
                    <option value="Bus Arranged">Bus Arranged</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#0F172A] block">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  placeholder="+91 98480 12345"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl hover:bg-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#b90538] hover:bg-[#92002a] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
