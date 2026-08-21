import React, { useState } from 'react';
import { Book } from '../types';
import { BookCard } from '../components/ui/BookCard';
import {
  Star,
  Heart,
  ShoppingBag,
  BookOpen,
  Globe,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Play,
} from 'lucide-react';

interface BookDetailsPageProps {
  book: Book;
  allBooks: Book[];
  onBack: () => void;
  onAddToCart: (book: Book) => void;
  onBuyNow: (book: Book) => void;
  onSelectBook: (book: Book) => void;
  onReadNow: (book: Book) => void;
}

export const BookDetailsPage: React.FC<BookDetailsPageProps> = ({
  book,
  allBooks,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectBook,
  onReadNow,
}) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'chapters' | 'reviews'>('about');

  // Recommendation logic
  const relatedBooks = allBooks
    .filter((b) => b.id !== book.id && (b.category === book.category || b.isBestSeller))
    .slice(0, 4);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
      >
        <ArrowLeft className="w-4 h-4 text-[#8B6FD8]" />
        Back to Books
      </button>

      {/* Main Details Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/80 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Cover Image Container Left */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative aspect-[3/4] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 px-3.5 py-1.5 text-xs font-extrabold rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-sm">
              {book.category}
            </span>
          </div>

          <button
            onClick={() => onReadNow(book)}
            className="w-full max-w-sm mt-4 py-3 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100 text-[#8B6FD8] text-xs font-bold transition-all flex items-center justify-center gap-2 border border-purple-200/60"
          >
            <Play className="w-4 h-4 fill-current" />
            Preview / Read Online Now
          </button>
        </div>

        {/* Info Right */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#8B6FD8] uppercase tracking-wider">
              {book.category} Ebook
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 leading-tight">
              {book.title}
            </h1>
            <p className="text-base font-semibold text-slate-500 mt-1">
              By <span className="text-slate-900">{book.author}</span>
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center text-amber-400 bg-amber-50 px-3 py-1 rounded-xl">
              <Star className="w-4 h-4 fill-amber-400 mr-1.5" />
              <span className="font-extrabold text-slate-900">{book.rating}</span>
            </div>
            <span className="text-slate-500 font-medium text-xs">
              Based on {book.reviews} verified reader reviews
            </span>
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-slate-100 flex items-baseline gap-4">
            {book.price === 0 ? (
              <span className="text-4xl font-extrabold text-emerald-600">FREE</span>
            ) : (
              <span className="text-4xl font-extrabold text-slate-900">฿{book.price}</span>
            )}
            <span className="text-xs text-slate-400 font-medium">Instant PDF & EPUB download</span>
          </div>

          {/* Meta Specifications */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#8B6FD8]" />
              <div>
                <span className="block font-bold text-slate-900">{book.pages}</span>
                <span className="text-slate-400">Total Pages</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#8B6FD8]" />
              <div>
                <span className="block font-bold text-slate-900">{book.language}</span>
                <span className="text-slate-400">Language</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#8B6FD8]" />
              <div>
                <span className="block font-bold text-slate-900">{book.publishDate}</span>
                <span className="text-slate-400">Published</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onBuyNow(book)}
              className="flex-1 min-w-[160px] py-4 px-6 rounded-2xl bg-[#8B6FD8] text-white font-bold text-sm hover:bg-[#795BC7] transition-all shadow-lg shadow-purple-500/20"
            >
              Buy Now
            </button>
            <button
              onClick={() => onAddToCart(book)}
              className="py-4 px-6 rounded-2xl bg-purple-50 text-[#8B6FD8] hover:bg-purple-100 font-bold text-sm transition-all flex items-center gap-2 border border-purple-200/50"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`p-4 rounded-2xl border transition-all ${
                wishlisted
                  ? 'bg-rose-50 text-rose-500 border-rose-200'
                  : 'bg-slate-50 text-slate-400 hover:text-rose-500 border-slate-200'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Tabs: Description, Chapters, Reviews */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-2xs space-y-6">
        <div className="flex items-center gap-8 border-b border-slate-100 pb-4">
          <button
            onClick={() => setActiveTab('about')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === 'about'
                ? 'border-[#8B6FD8] text-[#8B6FD8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            About this book
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === 'chapters'
                ? 'border-[#8B6FD8] text-[#8B6FD8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            What's inside
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-[#8B6FD8] text-[#8B6FD8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Verified Reviews ({book.reviewsList?.length || 2})
          </button>
        </div>

        <div>
          {activeTab === 'about' && (
            <div className="space-y-6">
              <p className="text-slate-700 leading-relaxed text-sm">{book.description}</p>
              <div className="p-6 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Book Features & Guarantee
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                    Instant sync across iOS, Android, & Web Reader
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                    Offline reading mode support
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                    DRM-free EPUB & PDF format options
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                    Lifetime access & automatic updates
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="space-y-3">
              {(book.chapters || [
                { id: 1, title: 'Uncluttering the Mental Space', page: 1 },
                { id: 2, title: 'The Art of Deep Listening', page: 34 },
                { id: 3, title: 'Finding Calm in Chaos', page: 88 },
                { id: 4, title: 'Sustaining Inner Peace', page: 160 },
              ]).map((ch) => (
                <div
                  key={ch.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-100 text-[#8B6FD8] font-bold text-xs flex items-center justify-center">
                      {ch.id}
                    </span>
                    <span>{ch.title}</span>
                  </div>
                  <span className="text-slate-400">Page {ch.page}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {(book.reviewsList || [
                {
                  id: 'r1',
                  userName: 'Elena Rostova',
                  userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                  rating: 5,
                  date: '2 days ago',
                  comment: 'This book completely shifted my daily routine. The chapter on mental uncluttering is pure wisdom.',
                },
                {
                  id: 'r2',
                  userName: 'Marcus Chen',
                  userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                  rating: 5,
                  date: '1 week ago',
                  comment: 'Beautiful formatting and deeply soothing writing style. Highly recommended!',
                },
              ]).map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-9 h-9 rounded-full object-cover border border-purple-200"
                      />
                      <div>
                        <span className="block text-xs font-bold text-slate-900">{rev.userName}</span>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {rev.rating}.0
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">You may also like</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {relatedBooks.map((relBook) => (
            <BookCard
              key={relBook.id}
              book={relBook}
              onSelectBook={onSelectBook}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
