import React from 'react';
import { Book } from '../../types';
import { Play, Plus, BookOpen, Clock } from 'lucide-react';

interface ContinueReadingSectionProps {
  books: Book[];
  onContinueReading: (book: Book) => void;
  onDiscoverMore: () => void;
}

export const ContinueReadingSection: React.FC<ContinueReadingSectionProps> = ({
  books,
  onContinueReading,
  onDiscoverMore,
}) => {
  const inProgressBooks = books.filter((b) => b.progress && b.progress > 0);

  return (
    <section id="continue-reading-section" className="py-10 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#8B6FD8]" />
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Continue Reading
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pick up right where you left off across all your devices
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inProgressBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-3xl p-5 border border-purple-100/80 shadow-sm hover:shadow-md hover-lift transition-all duration-200 flex gap-4 items-center"
            >
              {/* Cover Thumbnail */}
              <div className="relative w-20 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-xs">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  {book.progress}%
                </span>
              </div>

              {/* Info & Progress */}
              <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-1">
                <div>
                  <span className="text-[10px] font-bold text-[#8B6FD8] uppercase tracking-wider">
                    {book.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mt-0.5">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{book.author}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 my-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Progress</span>
                    <span className="text-[#8B6FD8]">{book.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#8B6FD8] to-purple-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onContinueReading(book)}
                  className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-[#8B6FD8] text-[#8B6FD8] hover:text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Continue Reading
                </button>
              </div>
            </div>
          ))}

          {/* Dashed "+ Discover More Books" Card */}
          <button
            onClick={onDiscoverMore}
            className="group rounded-3xl p-6 border-2 border-dashed border-purple-200 hover:border-[#8B6FD8] bg-white/50 hover:bg-purple-50/40 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer min-h-[145px]"
          >
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#8B6FD8] group-hover:bg-[#8B6FD8] group-hover:text-white transition-all duration-200 flex items-center justify-center shadow-xs">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-slate-800 text-sm group-hover:text-[#8B6FD8] transition-colors block">
                Discover More Books
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Explore thousands of new titles
              </span>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
