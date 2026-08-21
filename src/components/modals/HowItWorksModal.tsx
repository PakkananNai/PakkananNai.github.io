import React from 'react';
import { X, Search, Zap, BookOpen, Check } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrowseBooks: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onBrowseBooks,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      number: '01',
      title: 'Discover & Search',
      description: 'Explore thousands of curated titles across fiction, fantasy, self-help, technology, and more using easy pastel category filters.',
      icon: Search,
      bgColor: 'bg-purple-50',
      iconColor: 'text-[#8B6FD8]',
    },
    {
      number: '02',
      title: 'Instant Purchase & Sync',
      description: 'Secure payment via PromptPay, Credit Card, or QR. Books sync immediately to your personal digital library.',
      icon: Zap,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      number: '03',
      title: 'Serene Online Reader',
      description: 'Enjoy a warm, distraction-free reading experience with customizable fonts, themes (Light, Sepia, Dark), and cloud bookmarks.',
      icon: BookOpen,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8B6FD8] uppercase tracking-wider">
              Simple & Seamless
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              How Booklet Works
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/80 items-start"
            >
              <div className={`w-12 h-12 rounded-2xl ${s.bgColor} ${s.iconColor} flex items-center justify-center shrink-0`}>
                <s.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-base">{s.title}</h4>
                  <span className="text-xs font-black text-slate-300">{s.number}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">No app installation required</span>
          <button
            onClick={() => {
              onClose();
              onBrowseBooks();
            }}
            className="py-3 px-6 rounded-2xl bg-[#8B6FD8] text-white font-semibold text-xs hover:bg-[#795BC7] transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Start Browsing Now
          </button>
        </div>

      </div>
    </div>
  );
};
