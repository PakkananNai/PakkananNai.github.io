import React, { useState } from 'react';
import { BookCard } from '../ui/BookCard';
import { Book } from '../../types';
import { Sparkles, Flame, Clock, Gift } from 'lucide-react';

interface BestSellersSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  selectedCategory: string | null;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  books,
  onSelectBook,
  onAddToCart,
  selectedCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new' | 'free' | 'all'>('bestseller');

  // Filter books based on active tab and category selection
  const filteredBooks = books.filter((b) => {
    if (selectedCategory && selectedCategory !== 'All' && b.category !== selectedCategory) {
      return false;
    }
    if (activeTab === 'bestseller') return b.isBestSeller;
    if (activeTab === 'new') return b.isNewRelease;
    if (activeTab === 'free') return b.isFree || b.price === 0;
    return true;
  });

  return (
    <section id="bestsellers-section" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {selectedCategory && selectedCategory !== 'All'
                  ? `${selectedCategory} Books`
                  : 'Popular Ebooks'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top rated titles loved by thousands of readers
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl self-start sm:self-auto border border-slate-200/60 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'bestseller'
                  ? 'bg-white text-[#8B6FD8] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              Best Sellers
            </button>

            <button
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'new'
                  ? 'bg-white text-[#8B6FD8] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              New Releases
            </button>

            <button
              onClick={() => setActiveTab('free')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'free'
                  ? 'bg-white text-[#8B6FD8] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-emerald-500" />
              Free Books
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-white text-[#8B6FD8] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Books
            </button>
          </div>
        </div>

        {/* Books Responsive Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelectBook={onSelectBook}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-2xs space-y-3">
            <p className="text-base font-semibold text-slate-700">No books found in this category.</p>
            <p className="text-xs text-slate-400">Try selecting another filter or category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
