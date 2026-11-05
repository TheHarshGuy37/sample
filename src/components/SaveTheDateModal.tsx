import React, { useState } from 'react';
import { X, Copy, Check, Download, Heart, Sparkles } from 'lucide-react';

interface SaveTheDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMuhuratDate: string;
}

export const SaveTheDateModal: React.FC<SaveTheDateModalProps> = ({
  isOpen,
  onClose,
  activeMuhuratDate,
}) => {
  if (!isOpen) return null;

  const [brideName, setBrideName] = useState('Gayatri');
  const [groomName, setGroomName] = useState('Devendra');
  const [venueName, setVenueName] = useState('Sai Priya Beach Resort, Beach Road, Visakhapatnam');
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(activeMuhuratDate).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const invitationText = `🌺 WEDDING INVITATION 🌺

Together with our families, we joyfully invite you to celebrate the wedding of

${brideName}
&
${groomName}

Date: ${formattedDate}
Muhurtham: 05:42 PM (Sunset Muhurtham)
Venue: ${venueName}

We look forward to celebrating with you!
Please save the date!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#b90538] fill-[#b90538]" />
            <h3 className="font-playfair text-lg font-bold text-[#0F172A]">Save The Date Card Generator</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="p-4 border-b border-[#F1F5F9] bg-[#FFFFFF] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Bride's Name</label>
            <input
              type="text"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#b90538]"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Groom's Name</label>
            <input
              type="text"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#b90538]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Wedding Venue</label>
            <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#b90538]"
            />
          </div>
        </div>

        {/* Visual Card Preview */}
        <div className="p-6 bg-[#FAF9F6] flex items-center justify-center">
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-7 shadow-md border-2 border-[#FFE4E6] text-center space-y-3">
            
            <div className="w-10 h-10 mx-auto rounded-full bg-[#FFF1F2] border border-[#FFE4E6] flex items-center justify-center text-[#b90538]">
              <Heart className="w-5 h-5 fill-[#b90538]" />
            </div>

            <span className="text-[10px] font-bold tracking-widest uppercase text-[#904d00] block">
              ॥ श्री गणेशाय नमः ॥
            </span>

            <div className="pt-1">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
                Save The Date
              </span>
              <h2 className="font-playfair text-2xl font-bold text-[#b90538] leading-tight">
                {brideName}
              </h2>
              <div className="text-sm font-serif italic text-slate-400 my-0.5">&amp;</div>
              <h2 className="font-playfair text-2xl font-bold text-[#0F172A] leading-tight">
                {groomName}
              </h2>
            </div>

            <div className="pt-2 border-t border-[#F1F5F9] space-y-1">
              <div className="font-sans text-sm font-bold text-[#0F172A]">
                {formattedDate}
              </div>
              <div className="text-xs font-semibold text-[#b90538]">
                Muhurtham: 05:42 PM to 07:35 PM
              </div>
              <div className="text-xs text-slate-600 font-medium pt-1 max-w-xs mx-auto">
                {venueName}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {copied ? (
              <span className="text-[#047857] font-semibold flex items-center gap-1">
                <Check className="w-4 h-4 text-[#10B981]" />
                Invitation message copied! Ready to paste into WhatsApp.
              </span>
            ) : (
              <span>Share this card with friends and relatives on WhatsApp</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-[#FAF9F6] hover:bg-[#F5F3EF] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-slate-600" />
              <span>Copy for WhatsApp</span>
            </button>
            <button
              onClick={() => {
                alert('Card generated! You can copy the message text or take a screenshot to send to family.');
              }}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#b90538] hover:bg-[#92002a] text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Save Card</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
