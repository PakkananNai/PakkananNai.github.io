import React, { useState } from 'react';
import { BookOpen, Search, ShoppingBag, User, Menu, X, Sparkles, LogIn, Library, Bell } from 'lucide-react';
import { Book, PageType } from '../../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigatePage: (page: PageType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  allBooks: Book[];
  onSelectBook: (book: Book) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  cartCount,
  onOpenCart,
  onSelectCategory,
  onSearch,
  searchQuery,
  allBooks,
  onSelectBook,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? allBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100/60 transition-all duration-300 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Logo with hover bounce */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigatePage('home')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8B6FD8] to-purple-400 flex items-center justify-center shadow-md shadow-purple-500/20 text-white group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#8B6FD8] transition-colors">
                Booklet<span className="text-[#8B6FD8]">.</span>
              </span>
              <span className="text-[10px] tracking-wider font-medium text-slate-400 uppercase -mt-1">
                Ebook Platform
              </span>
            </div>
          </div>

          {/* CENTER: Page Navigation Links with Smooth Moving Indicator */}
          <nav className="hidden md:flex items-center relative bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-2xs transition-all duration-300">
            
            {/* Animated Tab Buttons */}
            <button
              onClick={() => onNavigatePage('home')}
              className={`relative z-10 px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                currentPage === 'home'
                  ? 'bg-white text-[#8B6FD8] shadow-md shadow-purple-500/10 scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:scale-105'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigatePage('browse')}
              className={`relative z-10 px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                currentPage === 'browse'
                  ? 'bg-white text-[#8B6FD8] shadow-md shadow-purple-500/10 scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:scale-105'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Discover
            </button>

            <button
              onClick={() => onNavigatePage('library')}
              className={`relative z-10 px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                currentPage === 'library'
                  ? 'bg-white text-[#8B6FD8] shadow-md shadow-purple-500/10 scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:scale-105'
              }`}
            >
              <Library className="w-3.5 h-3.5 text-[#8B6FD8]" />
              My Library
            </button>
          </nav>

          {/* RIGHT: Search & Actions */}
          <div className="flex items-center gap-3">
            
            {/* Search Bar Container */}
            <div className="relative hidden sm:block w-44 md:w-52 lg:w-60">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ebooks..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B6FD8]/30 focus:border-[#8B6FD8] transition-all duration-300 hover:bg-white"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* Instant Search Dropdown */}
              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {searchResults.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => {
                            onSelectBook(b);
                            setSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-purple-50/60 rounded-xl cursor-pointer transition-colors"
                        >
                          <img src={b.cover} alt={b.title} className="w-8 h-11 object-cover rounded-md" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-slate-800 truncate">{b.title}</span>
                            <span className="text-[10px] text-slate-400 truncate">{b.author}</span>
                          </div>
                          <span className="ml-auto text-xs font-bold text-[#8B6FD8]">
                            {b.price === 0 ? 'FREE' : `฿${b.price}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400">
                      No ebooks found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Button with Animated Bounce Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-purple-50 text-[#8B6FD8] hover:bg-[#8B6FD8] hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button
              onClick={() => onNavigatePage('profile')}
              className={`p-2.5 rounded-full transition-all duration-300 hover:scale-110 hidden sm:flex ${
                currentPage === 'profile'
                  ? 'bg-[#8B6FD8] text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Sign In Button */}
            <button
              onClick={() => onNavigatePage('login')}
              className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#8B6FD8] font-bold text-xs transition-all duration-300 hidden lg:flex items-center gap-1.5 hover:scale-105"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 md:hidden"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('home');
              }}
              className={`p-3 text-left rounded-xl transition-all ${currentPage === 'home' ? 'bg-purple-100 text-[#8B6FD8]' : 'bg-slate-50 text-slate-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('browse');
              }}
              className={`p-3 text-left rounded-xl transition-all ${currentPage === 'browse' ? 'bg-purple-100 text-[#8B6FD8]' : 'bg-slate-50 text-slate-700'}`}
            >
              Discover Books
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('library');
              }}
              className={`p-3 text-left rounded-xl transition-all ${currentPage === 'library' ? 'bg-purple-100 text-[#8B6FD8]' : 'bg-slate-50 text-slate-700'}`}
            >
              My Library
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('profile');
              }}
              className={`p-3 text-left rounded-xl transition-all ${currentPage === 'profile' ? 'bg-purple-100 text-[#8B6FD8]' : 'bg-slate-50 text-slate-700'}`}
            >
              My Profile
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigatePage('login');
            }}
            className="w-full p-3 rounded-xl bg-purple-50 text-[#8B6FD8] font-bold text-xs text-center block"
          >
            Sign In / Register
          </button>
        </div>
      )}
    </header>
  );
};
