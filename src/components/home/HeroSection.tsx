import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Zap, Library, Coffee, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  onBrowseClick: () => void;
  onHowItWorksClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowseClick,
  onHowItWorksClick,
}) => {
  return (
    <section id="hero" className="pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Pastel Hero Card Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#F4EFFC] via-[#FAF6FE] to-[#EEF2FF] border border-purple-100 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm">
          
          {/* Subtle Background Decorative Pastel Orbs */}
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Top Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200/60 shadow-xs text-xs font-semibold text-[#8B6FD8]">
                <Sparkles className="w-3.5 h-3.5 text-[#8B6FD8]" />
                <span>Next-Gen Ebook Marketplace</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Read more. <br />
                  <span className="text-[#8B6FD8]">Learn more.</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Discover, buy, and enjoy thousands of ebooks anywhere, anytime with a serene, distraction-free reading experience.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onBrowseClick}
                  className="px-7 py-3.5 rounded-2xl bg-[#8B6FD8] text-white font-semibold text-sm hover:bg-[#795BC7] transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center gap-2 group hover-lift"
                >
                  Browse Books
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={onHowItWorksClick}
                  className="px-7 py-3.5 rounded-2xl bg-white text-slate-700 font-semibold text-sm border border-slate-200/80 hover:bg-slate-50 transition-all duration-200 shadow-xs hover-lift"
                >
                  How it Works
                </button>
              </div>

              {/* Three Small Benefits Below Buttons */}
              <div className="pt-6 border-t border-purple-200/40 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100/80 text-[#8B6FD8] flex items-center justify-center shrink-0">
                    <Library className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-900">Thousands</span>
                    <span className="block text-[11px] text-slate-500">of Books</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-900">Instant</span>
                    <span className="block text-[11px] text-slate-500">Access</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-900">Secure</span>
                    <span className="block text-[11px] text-slate-500">Payment</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Illustration: Cozy E-Reader & Pastel Books Graphics */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-md aspect-[4/3] bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-xl shadow-purple-500/10 p-6 flex flex-col justify-between overflow-hidden group">
                
                {/* Tablet Header / Top Bar */}
                <div className="flex items-center justify-between border-b border-purple-50 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 tracking-wider">
                    BOOKLET READER
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700">4.9</span>
                  </div>
                </div>

                {/* Tablet Content Screen */}
                <div className="my-4 bg-[#FAF9FC] p-4 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Chapter 1 • The Quiet Mind</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-[#8B6FD8] font-bold">60%</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "Stillness is not the absence of movement, but the presence of focus..."
                  </p>
                  
                  {/* Animated Reading Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#8B6FD8] to-purple-400 h-full w-[60%] rounded-full" />
                  </div>
                </div>

                {/* Floating Elements: Cozy Plant & Coffee Badge */}
                <div className="flex items-center justify-between pt-2 border-t border-purple-50">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 text-xs font-semibold text-[#8B6FD8]">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Cozy Reading Mode</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>Synced Offline</span>
                  </div>
                </div>

                {/* Decorative Pastel Stacked Books Graphic */}
                <div className="absolute -bottom-3 -right-3 w-28 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl transform rotate-6 border border-white/80 shadow-md opacity-80 pointer-events-none -z-10" />
                <div className="absolute -top-3 -left-3 w-24 h-16 bg-gradient-to-br from-blue-200 to-emerald-200 rounded-2xl transform -rotate-6 border border-white/80 shadow-md opacity-80 pointer-events-none -z-10" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
