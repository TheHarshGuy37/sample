import React, { useState } from 'react';
import { Vendor, VendorPackage, BudgetItem } from '../types';
import { X, ShieldCheck, Calendar, Sparkles, CheckCircle2, Lock } from 'lucide-react';

interface BookingAdvanceModalProps {
  vendor: Vendor | null;
  selectedPackage?: VendorPackage;
  activeMuhuratDate: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBookingAdvance: (item: Omit<BudgetItem, 'id'>) => void;
}

export const BookingAdvanceModal: React.FC<BookingAdvanceModalProps> = ({
  vendor,
  selectedPackage,
  activeMuhuratDate,
  isOpen,
  onClose,
  onConfirmBookingAdvance,
}) => {
  if (!isOpen || !vendor) return null;

  const totalValue = selectedPackage ? selectedPackage.price : vendor.basePrice;
  const [advancePercent, setAdvancePercent] = useState<number>(20);
  const advanceAmount = Math.round((totalValue * advancePercent) / 100);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBookingAdvance({
      title: `${vendor.name} — ${selectedPackage ? selectedPackage.name : 'Booking'}`,
      category: vendor.category,
      vendorName: vendor.name,
      allocatedAmount: totalValue,
      advancePaid: advanceAmount,
      dueDate: activeMuhuratDate,
      status: 'Advance Paid',
      notes: specialInstructions || `Booked for wedding date ${activeMuhuratDate}`,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-[#F1F5F9]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#b90538]">
              <Lock className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Book Service / Pay Advance</span>
            </div>
            <h3 className="font-playfair text-xl font-bold text-[#0F172A] mt-0.5">
              Confirm Booking &amp; Pay Token Advance
            </h3>
            <p className="text-xs text-slate-500">{vendor.name}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#ECFDF5] text-[#006947] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-[#10B981]" />
            </div>
            <h4 className="font-playfair text-xl font-bold text-[#0F172A]">
              Booking Confirmed!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Advance payment of <strong className="text-[#0F172A]">{formatINR(advanceAmount)}</strong> has been recorded in your Budget Planner.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Summary */}
            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Selected Option:</span>
                <strong className="text-[#0F172A] font-bold">
                  {selectedPackage ? selectedPackage.name : 'Standard Service'}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Total Price:</span>
                <strong className="text-base text-[#0F172A] font-bold tabular-nums">
                  {formatINR(totalValue)}
                </strong>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-[#E2E8F0]">
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#b90538]" />
                  <span>Wedding Date:</span>
                </span>
                <strong className="text-[#b90538] font-bold">{activeMuhuratDate}</strong>
              </div>
            </div>

            {/* Advance selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A] block">
                Choose Token Advance to Pay
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 20, 30].map((pct) => (
                  <button
                    type="button"
                    key={pct}
                    onClick={() => setAdvancePercent(pct)}
                    className={`py-1.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                      advancePercent === pct
                        ? 'border-[#b90538] bg-[#FFF1F2] text-[#b90538] ring-1 ring-[#FFE4E6]'
                        : 'border-[#E2E8F0] bg-white text-slate-600 hover:bg-[#FAF9F6]'
                    }`}
                  >
                    {pct}% Advance
                  </button>
                ))}
              </div>
              <div className="pt-1 flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Advance Amount:</span>
                <span className="text-base font-bold text-[#D97706] tabular-nums">
                  {formatINR(advanceAmount)}
                </span>
              </div>
            </div>

            {/* Note */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0F172A] block">
                Notes / Special Requests for Vendor
              </label>
              <textarea
                rows={2}
                placeholder="E.g., Require pure vegetarian food; please arrange extra chairs..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#b90538]"
              />
            </div>

            {/* Safe booking note */}
            <div className="p-2.5 bg-[#ECFDF5] border border-emerald-200 rounded-xl flex items-center gap-2 text-[11px] text-[#006947]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Full receipt and vendor confirmation sent via SMS/WhatsApp.</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl hover:bg-[#FAF9F6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#b90538] hover:bg-[#92002a] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ffdcc3]" />
                <span>Pay {formatINR(advanceAmount)} Advance</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
