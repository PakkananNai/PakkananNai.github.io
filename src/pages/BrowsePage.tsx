import React, { useState } from 'react';
import { Book } from '../types';
import { BookCard } from '../components/ui/BookCard';
import { Search, SlidersHorizontal, ArrowUpDown, Filter } from 'lucide-react';

interface BrowsePageProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  initialCategory?: string | null;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({
  books,
  onSelectBook,
  onAddToCart,
  initialCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');

  const categories = [
    'All',
    'Fiction',
    'Fantasy',
    'Romance',
    'Business',
    'Self-Help',
    'Science',
    'History',
    'Technology',
    'Children',
  ];

  // Filtering logic
  let filtered = books.filter((b) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Sorting logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.publishDate.localeCompare(a.publishDate);
    return 0; // featured
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-100/80 via-pink-50 to-blue-50 rounded-3xl p-8 sm:p-12 border border-purple-100 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-white/90 text-[#8B6FD8] text-xs font-bold shadow-2xs inline-block">
          Discover & Read
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Discover your next book
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Explore thousands of ebooks across fiction, fantasy, self-help, technology, and more.
        </p>

        {/* Large Search Input */}
        <div className="max-w-2xl mx-auto relative pt-2">
          <input
            type="text"
            placeholder="Search by title, author, topic, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm bg-white rounded-2xl border border-purple-200/80 shadow-md focus:outline-none focus:ring-2 focus:ring-[#8B6FD8]"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
        </div>
      </div>

      {/* Filter Bar & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-b border-slate-100 pb-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#8B6FD8] text-white shadow-md shadow-purple-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ArrowUpDown className="w-4 h-4 text-[#8B6FD8]" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B6FD8]"
          >
            <option value="featured">Featured</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Releases</option>
          </select>
        </div>

      </div>

      {/* Books Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-4">
          <span>Showing <strong className="text-slate-800">{filtered.length}</strong> ebooks</span>
          {selectedCategory !== 'All' && (
            <span className="text-[#8B6FD8] font-bold">Category: {selectedCategory}</span>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelectBook={onSelectBook}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-[#8B6FD8] mx-auto flex items-center justify-center">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No ebooks found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any books matching your criteria. Try adjusting your search query or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-50 text-[#8B6FD8] text-xs font-bold hover:bg-purple-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
