import React, { useState } from 'react';
import { CeremonialEvent } from '../types';
import { Clock, MapPin, Shirt, CheckSquare, Square, Plus, CheckCircle2 } from 'lucide-react';

interface CeremonialItineraryViewProps {
  events: CeremonialEvent[];
  onToggleChecklistItem: (eventId: string, checklistId: string) => void;
  onAddChecklistItem: (eventId: string, task: string) => void;
}

export const CeremonialItineraryView: React.FC<CeremonialItineraryViewProps> = ({
  events,
  onToggleChecklistItem,
  onAddChecklistItem,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');
  const [newTaskInput, setNewTaskInput] = useState('');
  const [filterTag, setFilterTag] = useState<string>('All');

  const filteredEvents = events.filter((e) => {
    if (filterTag === 'All') return true;
    return e.tag === filterTag;
  });

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim() || !selectedEvent) return;
    onAddChecklistItem(selectedEvent.id, newTaskInput.trim());
    setNewTaskInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Wedding Schedule &amp; Checklist
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Keep track of timings, hall locations, dress codes, and puja tasks for Mehendi, Haldi, Wedding ceremony, and Reception.
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs">
          {['All', 'Mehendi', 'Haldi', 'Wedding', 'Reception'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterTag === tag
                  ? 'bg-[#b90538] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#FAF9F6]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left events list (7 cols) + Right tasks & dress code (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-lg font-bold text-[#0F172A]">
              Wedding Functions ({filteredEvents.length})
            </h2>
            <span className="text-xs text-slate-500">Select any event to view tasks</span>
          </div>

          <div className="space-y-4">
            {filteredEvents.map((evt) => {
              const isSelected = evt.id === selectedEvent?.id;
              const completedCount = evt.checklist.filter((c) => c.completed).length;
              const totalCount = evt.checklist.length;
              const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-[#b90538] bg-white ring-2 ring-[#FFE4E6] shadow-sm'
                      : 'border-[#E2E8F0] bg-white hover:border-[#b90538]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF1F2] text-[#b90538] border border-[#FFE4E6]">
                        {evt.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">{evt.day} · {evt.date}</span>
                    </div>

                    {evt.muhuratTiming && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{evt.muhuratTiming}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-playfair text-xl font-bold text-[#0F172A] mb-1.5">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {evt.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-3 border-t border-[#F1F5F9]">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-[#b90538]" />
                      <span className="font-medium">{evt.timeRange}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                      <span className="font-medium truncate">{evt.venuePavilion}</span>
                    </div>
                  </div>

                  {/* Checklist progress */}
                  <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Checklist Tasks: <strong className="text-[#0F172A] tabular-nums font-bold">{completedCount}/{totalCount}</strong> done
                    </span>
                    <span className="font-semibold text-[#006947] tabular-nums">{progressPct}% Ready</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Event Checklist & Dress Code */}
        {selectedEvent && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-5 sticky top-28">
            
            <div className="pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b90538]">
                  Event Checklist
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFF1F2] text-[#b90538]">
                  {selectedEvent.tag}
                </span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0F172A]">
                {selectedEvent.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedEvent.day} · {selectedEvent.timeRange}</p>
            </div>

            {/* Dress code & color advice */}
            <div className="p-3.5 bg-[#FAF9F6] rounded-2xl border border-[#E2E8F0] space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
                <Shirt className="w-4 h-4 text-[#b90538]" />
                <span>Suggested Dress Code</span>
              </div>
              <p className="font-semibold text-[#b90538]">
                {selectedEvent.dressCode}
              </p>
              <p className="text-slate-500 text-[11px]">
                Matching colors: {selectedEvent.dressCodeColors}
              </p>
            </div>

            {/* Assigned Vendors */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 block">
                Booked Services for this function:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedEvent.assignedVendors.map((v, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#F5F3EF] border border-[#E2E8F0] rounded-lg font-medium text-[#0F172A]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-[#10B981]" />
                  <span>Tasks to do:</span>
                </h4>
                <span className="text-[11px] text-slate-500">Click box to check off</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedEvent.checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onToggleChecklistItem(selectedEvent.id, item.id)}
                    className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      item.completed
                        ? 'bg-[#ECFDF5]/50 border-emerald-200 text-slate-500 line-through'
                        : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#b90538]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span className="text-xs font-medium leading-snug">{item.task}</span>
                  </div>
                ))}
              </div>

              {/* Add custom task */}
              <form onSubmit={handleAddTask} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a new reminder task..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#b90538]"
                />
                <button
                  type="submit"
                  disabled={!newTaskInput.trim()}
                  className="px-3 py-2 bg-[#b90538] hover:bg-[#92002a] text-white rounded-xl text-xs font-bold disabled:opacity-50 transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
