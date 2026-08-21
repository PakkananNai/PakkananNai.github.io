import React, { useState } from 'react';
import { Sparkles, X, Gift, ArrowRight } from 'lucide-react';

interface NoticeBannerProps {
  onDiscoverClick: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ onDiscoverClick }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#8B6FD8] via-purple-500 to-indigo-500 text-white text-xs py-2.5 px-4 relative overflow-hidden shadow-xs animate-in slide-in-from-top duration-300">
      
      {/* Background Animated Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
        
        {/* Center Notice Message */}
        <div className="flex items-center justify-center gap-2 flex-1 text-center sm:text-left">
          <div className="px-2 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Gift className="w-3 h-3 text-amber-300 animate-bounce" />
            Special Launch
          </div>
          
          <p className="font-semibold truncate">
            Get <span className="underline decoration-amber-300 font-extrabold">฿50 OFF</span> your first order over ฿400! Code: <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">PASTEL2026</span>
          </p>

          <button
            onClick={onDiscoverClick}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-200 hover:text-white hover:underline transition-all shrink-0 ml-2"
          >
            Claim Offer <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dismiss Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors shrink-0"
          aria-label="Close Notice"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
