import React from 'react';
import { ScreenTab } from '../types';
import { Heart, Sparkles, LogIn, LogOut, Cloud, Check } from 'lucide-react';
import { useAuth } from '../firebase/authContext';

interface NavbarProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  onOpenConcierge: () => void;
  activeMuhuratDate: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenConcierge,
  activeMuhuratDate,
}) => {
  const { currentUser, loginWithGoogle, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onTabChange('directory')}
              className="text-left flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#b90538] flex items-center justify-center text-white shadow-xs">
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <span className="font-playfair text-2xl font-bold tracking-tight text-[#0F172A] block leading-none">
                  UTSAVA
                </span>
                <span className="text-[11px] font-medium tracking-wider text-[#b90538] uppercase block mt-1">
                  Indian Wedding Planner
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569]">
            <button
              onClick={() => onTabChange('directory')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                currentTab === 'directory'
                  ? 'border-[#b90538] text-[#b90538] font-bold'
                  : 'border-transparent hover:text-[#0F172A]'
              }`}
            >
              Venues &amp; Services
            </button>
            <button
              onClick={() => onTabChange('muhurat')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                currentTab === 'muhurat'
                  ? 'border-[#b90538] text-[#b90538] font-bold'
                  : 'border-transparent hover:text-[#0F172A]'
              }`}
            >
              Wedding Dates
            </button>
            <button
              onClick={() => onTabChange('budget')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                currentTab === 'budget'
                  ? 'border-[#b90538] text-[#b90538] font-bold'
                  : 'border-transparent hover:text-[#0F172A]'
              }`}
            >
              Budget Planner
            </button>
            <button
              onClick={() => onTabChange('itinerary')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                currentTab === 'itinerary'
                  ? 'border-[#b90538] text-[#b90538] font-bold'
                  : 'border-transparent hover:text-[#0F172A]'
              }`}
            >
              Event Schedule
            </button>
            <button
              onClick={() => onTabChange('guests')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                currentTab === 'guests'
                  ? 'border-[#b90538] text-[#b90538] font-bold'
                  : 'border-transparent hover:text-[#0F172A]'
              }`}
            >
              Guest List
            </button>
          </nav>

          {/* Zone 3: Actions & Firebase Auth */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Save The Date Action */}
            <button
              onClick={onOpenConcierge}
              className="hidden sm:flex px-3.5 py-2 text-xs font-bold tracking-wide text-[#b90538] bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FFE4E6] rounded-xl transition-all whitespace-nowrap shrink-0 items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b90538]" />
              <span>Save The Date</span>
            </button>

            {/* Firebase Auth Button / User Profile */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#FAF9F6] border border-[#E2E8F0] p-1.5 rounded-xl">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-[#b90538] text-white text-xs font-bold flex items-center justify-center">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div className="hidden lg:block text-left pr-1">
                  <span className="text-xs font-bold text-[#0F172A] block leading-tight truncate max-w-[100px]">
                    {currentUser.displayName || 'My Wedding'}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <Cloud className="w-2.5 h-2.5 text-[#10B981]" />
                    <span>Cloud Synced</span>
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-3.5 py-2 text-xs font-bold tracking-wide text-white bg-[#b90538] hover:bg-[#92002a] rounded-xl transition-all shadow-xs hover:shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-white" />
                <span>Sign In to Save</span>
              </button>
            )}
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-[#F1F5F9] text-xs font-medium overflow-x-auto gap-2">
          <button
            onClick={() => onTabChange('directory')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              currentTab === 'directory' ? 'bg-[#FFF1F2] text-[#b90538] font-bold' : 'text-[#475569]'
            }`}
          >
            Venues
          </button>
          <button
            onClick={() => onTabChange('muhurat')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              currentTab === 'muhurat' ? 'bg-[#FFF1F2] text-[#b90538] font-bold' : 'text-[#475569]'
            }`}
          >
            Dates
          </button>
          <button
            onClick={() => onTabChange('budget')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              currentTab === 'budget' ? 'bg-[#FFF1F2] text-[#b90538] font-bold' : 'text-[#475569]'
            }`}
          >
            Budget
          </button>
          <button
            onClick={() => onTabChange('itinerary')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              currentTab === 'itinerary' ? 'bg-[#FFF1F2] text-[#b90538] font-bold' : 'text-[#475569]'
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => onTabChange('guests')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              currentTab === 'guests' ? 'bg-[#FFF1F2] text-[#b90538] font-bold' : 'text-[#475569]'
            }`}
          >
            Guests
          </button>
        </div>

      </div>
    </header>
  );
};
