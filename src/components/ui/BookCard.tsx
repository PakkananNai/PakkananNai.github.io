import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (bookId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelectBook,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [liked, setLiked] = useState(isWishlisted);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    if (onToggleWishlist) {
      onToggleWishlist(book.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book);
  };

  return (
    <div
      onClick={() => onSelectBook(book)}
      className="group relative bg-white rounded-2xl p-4 border border-slate-100/80 shadow-xs hover:shadow-xl hover:shadow-purple-500/5 hover-lift cursor-pointer flex flex-col justify-between transition-all duration-300"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 mb-4 group-hover:scale-[1.02] transition-transform duration-300">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-xs">
            {book.category}
          </span>
          <button
            onClick={handleHeartClick}
            aria-label="Add to Wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              liked
                ? 'bg-rose-50 text-rose-500 shadow-xs'
                : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectBook(book);
            }}
            className="px-3.5 py-2 text-xs font-semibold bg-white text-slate-800 rounded-xl shadow-md hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#8B6FD8]" />
            Quick View
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-[#8B6FD8] transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="font-semibold text-slate-800">{book.rating}</span>
          <span className="text-slate-400">({book.reviews})</span>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            {book.price === 0 ? (
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600">
                FREE
              </span>
            ) : (
              <span className="text-base font-bold text-slate-900">
                ฿{book.price}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2 rounded-xl bg-purple-50 text-[#8B6FD8] hover:bg-[#8B6FD8] hover:text-white transition-all duration-200 flex items-center justify-center"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
