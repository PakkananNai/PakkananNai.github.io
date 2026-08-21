import React, { useState } from 'react';
import { Book } from '../../types';
import { X, Star, Heart, ShoppingBag, BookOpen, Clock, Globe, Calendar, CheckCircle2 } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  onBuyNow: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!book) return null;

  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'chapters' | 'reviews'>('about');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Grid: Cover Left + Main Info Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Cover Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative aspect-[3/4] w-full max-w-xs rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                  {book.category}
                </span>
              </div>
            </div>

            {/* Main Info Column */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#8B6FD8] uppercase tracking-wider">
                  {book.category} Ebook
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {book.title}
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  By <span className="text-slate-800">{book.author}</span>
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center text-amber-400 bg-amber-50 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span className="font-bold text-slate-800">{book.rating}</span>
                </div>
                <span className="text-slate-500 font-medium">
                  {book.reviews} verified reader reviews
                </span>
              </div>

              {/* Price Display */}
              <div className="pt-2 border-t border-slate-100 flex items-baseline gap-3">
                {book.price === 0 ? (
                  <span className="text-3xl font-extrabold text-emerald-600">FREE</span>
                ) : (
                  <span className="text-3xl font-extrabold text-slate-900">฿{book.price}</span>
                )}
                <span className="text-xs text-slate-400 font-medium">Includes instant digital access</span>
              </div>

              {/* Quick Meta Grid */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100/60 text-xs">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#8B6FD8]" />
                  <div>
                    <span className="block font-bold text-slate-800">{book.pages}</span>
                    <span className="text-slate-400">Pages</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#8B6FD8]" />
                  <div>
                    <span className="block font-bold text-slate-800">{book.language}</span>
                    <span className="text-slate-400">Language</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8B6FD8]" />
                  <div>
                    <span className="block font-bold text-slate-800">{book.publishDate}</span>
                    <span className="text-slate-400">Published</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onBuyNow(book)}
                  className="flex-1 min-w-[140px] py-3 px-5 rounded-2xl bg-[#8B6FD8] text-white font-semibold text-sm hover:bg-[#795BC7] transition-all shadow-md shadow-purple-500/20"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => onAddToCart(book)}
                  className="py-3 px-5 rounded-2xl bg-purple-50 text-[#8B6FD8] hover:bg-purple-100 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`p-3 rounded-2xl border transition-all ${
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

          {/* Lower Tabs: About, Chapters, Reviews */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-6 border-b border-slate-100 pb-3">
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
                Reviews ({book.reviewsList?.length || 2})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-5">
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {book.description}
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                      Key Highlights
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                        Compatible with all devices (iOS, Android, Web)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                        Offline download enabled
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                        High-quality EPUB & PDF formats
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8B6FD8]" />
                        Lifetime access & cloud bookmarks
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'chapters' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Chapter Title</span>
                    <span>Start Page</span>
                  </div>
                  {(book.chapters || [
                    { id: 1, title: 'Introduction & Foundations', page: 1 },
                    { id: 2, title: 'Core Principles', page: 28 },
                    { id: 3, title: 'Practical Application', page: 74 },
                    { id: 4, title: 'Conclusion & Next Steps', page: 150 },
                  ]).map((ch) => (
                    <div
                      key={ch.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-[#8B6FD8] font-bold text-[10px] flex items-center justify-center">
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
                      userName: 'Sophia Martinez',
                      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                      rating: 5,
                      date: '3 days ago',
                      comment: 'An absolute masterpiece! Clear, inspiring, and very easy to read on the mobile app.',
                    },
                    {
                      id: 'r2',
                      userName: 'David Kim',
                      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                      rating: 5,
                      date: '1 week ago',
                      comment: 'The soft UI layout of Booklet combined with this book content made my reading experience so relaxing.',
                    },
                  ]).map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            className="w-8 h-8 rounded-full object-cover border border-purple-200"
                          />
                          <div>
                            <span className="block text-xs font-bold text-slate-800">{rev.userName}</span>
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

        </div>

      </div>
    </div>
  );
};
