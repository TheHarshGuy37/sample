import React, { useState } from 'react';
import { Vendor, VendorPackage } from '../types';
import { X, ShieldCheck, Star, MapPin, CheckCircle2, Calendar, Sparkles } from 'lucide-react';

interface VendorDetailModalProps {
  vendor: Vendor | null;
  activeMuhuratDate: string;
  onClose: () => void;
  onRequestBooking: (vendor: Vendor, selectedPackage?: VendorPackage) => void;
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendor,
  activeMuhuratDate,
  onClose,
  onRequestBooking,
}) => {
  if (!vendor) return null;

  const [selectedPkg, setSelectedPkg] = useState<VendorPackage | null>(
    vendor.packages && vendor.packages.length > 0 ? vendor.packages[0] : null
  );

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const isAvailableOnActiveDate = vendor.availableDates.includes(activeMuhuratDate);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          
          {/* Main Photo Showcase */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-900">
            <img
              src={vendor.image}
              alt={vendor.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340"><rect width="600" height="340" fill="%23FFF1F2"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23b90538" text-anchor="middle" dominant-baseline="middle">Utsava Wedding Service</text></svg>';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#b90538] text-white text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {vendor.budgetTier}
                </span>
                <span className="bg-white/20 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded-full">
                  {vendor.category}
                </span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {vendor.name}
              </h2>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 mt-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#ffb2b7]" />
                  <span>{vendor.city} {vendor.cityTagline ? `(${vendor.cityTagline})` : ''}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-[#EAB308]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white tabular-nums">{vendor.rating.toFixed(2)}</span>
                  <span className="text-slate-300">({vendor.reviewsCount} verified reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Date Availability Indicator */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              isAvailableOnActiveDate 
                ? 'bg-[#ECFDF5] border-[#10B981]/30 text-[#006947]' 
                : 'bg-[#FFF1F2] border-[#FFE4E6] text-[#b90538]'
            }`}>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {isAvailableOnActiveDate ? 'Available on Your Wedding Date' : 'Slot Currently On Hold'}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    {isAvailableOnActiveDate 
                      ? `Good news! Confirmed available on your selected date: ${activeMuhuratDate}.`
                      : `This date (${activeMuhuratDate}) has pending inquiries. You can still message to check.`}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-white rounded-lg shadow-2xs whitespace-nowrap">
                {isAvailableOnActiveDate ? 'Available' : 'Check Alternate'}
              </span>
            </div>

            {/* About / Description */}
            <div className="space-y-2">
              <h3 className="font-playfair text-lg font-bold text-[#0F172A]">About This Service</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {vendor.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-playfair text-lg font-bold text-[#0F172A]">Key Highlights &amp; Facilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vendor.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#0F172A] font-medium leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages */}
            {vendor.packages && vendor.packages.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-lg font-bold text-[#0F172A]">Available Packages</h3>
                  <span className="text-xs text-slate-500">Click a package to select it</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vendor.packages.map((pkg) => {
                    const isSelected = selectedPkg?.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#b90538] bg-[#FFF1F2]/40 ring-2 ring-[#FFE4E6] shadow-xs'
                            : 'border-[#E2E8F0] bg-white hover:border-[#b90538]/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="font-playfair text-base font-bold text-[#0F172A]">{pkg.name}</h4>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-[#b90538] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-[#FFE4E6]">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="font-sans text-lg font-bold text-[#0F172A] tabular-nums mb-1.5">
                          {formatINR(pkg.price)}
                        </div>
                        <p className="text-xs text-slate-600 mb-2.5">{pkg.description}</p>

                        <div className="space-y-1 pt-2 border-t border-[#F1F5F9]">
                          <span className="text-[11px] font-semibold text-slate-700 block">Package Includes:</span>
                          <ul className="space-y-1">
                            {pkg.inclusions.map((inc, i) => (
                              <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#b90538]" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Simple Buyer Protection */}
            <div className="p-4 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl flex items-center gap-3 text-xs text-slate-600">
              <ShieldCheck className="w-6 h-6 text-[#10B981] shrink-0" />
              <div>
                <strong className="text-[#0F172A] block">Utsava 100% Verified Booking Guarantee</strong>
                <span>Direct prices with no hidden charges. Your advance deposit is protected and refunded if the vendor cancels.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Booking Action Tray */}
        <div className="p-4 sm:p-5 border-t border-[#E2E8F0] bg-[#FFFFFF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Total Price</span>
            <div className="font-sans text-2xl font-bold text-[#0F172A] tabular-nums">
              {formatINR(selectedPkg ? selectedPkg.price : vendor.basePrice)}
            </div>
            <span className="text-xs text-slate-500">{selectedPkg ? selectedPkg.name : vendor.priceUnit}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl hover:bg-[#FAF9F6] transition-colors"
            >
              Back to List
            </button>
            <button
              onClick={() => {
                onRequestBooking(vendor, selectedPkg || undefined);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#b90538] hover:bg-[#92002a] text-white text-xs font-bold tracking-wide rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#ffdcc3]" />
              <span>Book / Pay Advance</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
