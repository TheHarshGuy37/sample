import React, { useState } from 'react';
import { MuhuratDate, Vendor } from '../types';
import { Calendar, Sparkles, Check, Sun, ArrowRight, Star } from 'lucide-react';

interface MuhuratCalendarViewProps {
  muhuratDates: MuhuratDate[];
  activeMuhuratDate: string;
  onSetActiveDate: (date: string) => void;
  vendors: Vendor[];
  onSelectVendor: (vendor: Vendor) => void;
  onNavigateToDirectory: () => void;
}

export const MuhuratCalendarView: React.FC<MuhuratCalendarViewProps> = ({
  muhuratDates,
  activeMuhuratDate,
  onSetActiveDate,
  vendors,
  onSelectVendor,
  onNavigateToDirectory,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<'All' | 'Winter Wedding Season' | 'Spring Wedding Season'>('All');
  const [inspectDate, setInspectDate] = useState<MuhuratDate>(
    muhuratDates.find((m) => m.date === activeMuhuratDate) || muhuratDates[0]
  );

  const filteredDates = muhuratDates.filter((m) => {
    if (selectedSeason === 'All') return true;
    return m.season === selectedSeason;
  });

  const availableVendorsForDate = vendors.filter((v) =>
    v.availableDates.includes(inspectDate.date)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Simple Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Auspicious Wedding Dates (Shubh Muhurats)
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Popular and auspicious Hindu wedding dates for 2026–2027. Pick your preferred date to see which halls and photographers are free.
          </p>
        </div>

        {/* Season Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E2E8F0] rounded-xl self-start md:self-auto shadow-2xs">
          {(['All', 'Winter Wedding Season', 'Spring Wedding Season'] as const).map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedSeason === season
                  ? 'bg-[#b90538] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#FAF9F6]'
              }`}
            >
              {season === 'All' ? 'All Seasons' : season.replace('Wedding Season', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Date Cards (7 cols) + Selected Date Details (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): List of Auspicious Dates */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-lg font-bold text-[#0F172A]">
              Recommended Dates ({filteredDates.length})
            </h2>
            <span className="text-xs text-slate-500">Click any date to see details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDates.map((item) => {
              const isCurrentActive = item.date === activeMuhuratDate;
              const isInspecting = item.date === inspectDate.date;

              return (
                <div
                  key={item.date}
                  onClick={() => setInspectDate(item)}
                  className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isInspecting
                      ? 'border-[#b90538] bg-white ring-2 ring-[#FFE4E6] shadow-md'
                      : 'border-[#E2E8F0] bg-white hover:border-[#b90538]/40 hover:shadow-xs'
                  }`}
                >
                  {/* Selected Badge */}
                  {isCurrentActive && (
                    <div className="absolute top-3 right-3 bg-[#b90538] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>My Wedding Date</span>
                    </div>
                  )}

                  {/* Peak Tag */}
                  {item.isPeak && !isCurrentActive && (
                    <div className="absolute top-3 right-3 bg-[#FEF3C7] border border-[#FDE68A] text-[#904d00] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      High Demand Date
                    </div>
                  )}

                  {/* Date & Day */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#b90538] uppercase tracking-wider block">
                      {item.month}
                    </span>
                    <div className="font-playfair text-2xl font-bold text-[#0F172A]">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <span className="text-xs text-slate-500">{item.dayOfWeek}</span>
                  </div>

                  {/* Simple Timing Breakdown */}
                  <div className="space-y-1.5 pt-3 border-t border-[#F1F5F9] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Good Time:</span>
                      <strong className="text-[#0F172A] font-semibold">{item.muhuratName}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Nakshatra:</span>
                      <span className="text-slate-700 font-medium">{item.nakshatra}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold">
                    <span className={isInspecting ? 'text-[#b90538]' : 'text-slate-500'}>
                      {isInspecting ? 'Selected for View' : 'Click to Inspect'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isInspecting ? 'text-[#b90538]' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Simple Details Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-5 sticky top-28">
          
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b90538]">
                Date Details
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#0F172A] mt-0.5">
                {inspectDate.dayOfWeek}, {inspectDate.date}
              </h3>
              <p className="text-xs text-slate-500">{inspectDate.season}</p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-emerald-200 flex flex-col items-center justify-center text-[#047857]">
              <span className="font-sans text-base font-bold tabular-nums">
                {inspectDate.suitabilityScore}%
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider">Score</span>
            </div>
          </div>

          {/* Timings */}
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Sun className="w-4 h-4 text-[#D97706]" />
              <span>Auspicious Ceremony Hours:</span>
            </div>
            <p className="font-bold text-[#0F172A] text-sm pl-5">
              {inspectDate.muhuratWindow}
            </p>
          </div>

          {/* Simple Explanation in Everyday English */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Why this date is recommended:
            </h4>
            <div className="p-3.5 bg-[#FFF1F2]/60 border border-[#FFE4E6] rounded-xl text-xs text-slate-700 leading-relaxed">
              {inspectDate.simpleExplanation}
            </div>
          </div>

          {/* Set as Active Wedding Date Action */}
          <div>
            {inspectDate.date === activeMuhuratDate ? (
              <div className="w-full py-2.5 px-4 bg-[#ECFDF5] border border-[#10B981]/40 rounded-xl text-center text-xs font-bold text-[#006947] flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>This is set as your current wedding date</span>
              </div>
            ) : (
              <button
                onClick={() => onSetActiveDate(inspectDate.date)}
                className="w-full py-2.5 px-4 bg-[#b90538] hover:bg-[#92002a] text-white rounded-xl text-xs font-bold tracking-wide shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Select {inspectDate.date} as My Wedding Date</span>
              </button>
            )}
          </div>

          {/* Available Vendors on this Date */}
          <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Available on This Date ({availableVendorsForDate.length})
              </h4>
              <button
                onClick={onNavigateToDirectory}
                className="text-xs text-[#b90538] hover:underline font-semibold"
              >
                View all in Directory
              </button>
            </div>

            <div className="space-y-2">
              {availableVendorsForDate.slice(0, 4).map((v) => (
                <div
                  key={v.id}
                  onClick={() => onSelectVendor(v)}
                  className="p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#b90538] bg-white flex items-center justify-between gap-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={v.image}
                      alt={v.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FFF1F2"/><text x="50%" y="50%" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23b90538" text-anchor="middle" dominant-baseline="middle">Utsava</text></svg>';
                      }}
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#0F172A] truncate">{v.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{v.city} · {v.category}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#006947] bg-[#ECFDF5] px-2 py-0.5 rounded-full shrink-0">
                    Free
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
