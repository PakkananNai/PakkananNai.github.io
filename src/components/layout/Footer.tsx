import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-purple-100/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#8B6FD8] to-purple-400 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                Booklet<span className="text-[#8B6FD8]">.</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Read more. Learn more. Discover, buy, and enjoy thousands of ebooks anywhere, anytime with our soft pastel reading platform.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-[#8B6FD8] font-medium">
                Soft Pastel Aesthetic
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                Instant Access
              </span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><a href="#bestsellers-section" className="hover:text-[#8B6FD8] transition-colors">Browse Books</a></li>
              <li><a href="#bestsellers-section" className="hover:text-[#8B6FD8] transition-colors">Best Sellers</a></li>
              <li><a href="#bestsellers-section" className="hover:text-[#8B6FD8] transition-colors">New Releases</a></li>
              <li><a href="#bestsellers-section" className="hover:text-[#8B6FD8] transition-colors">Free Books</a></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">About Booklet</a></li>
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">Press & Kit</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#8B6FD8] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Booklet. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" /> for book lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
