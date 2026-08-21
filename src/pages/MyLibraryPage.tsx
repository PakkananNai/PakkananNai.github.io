import React, { useState } from 'react';
import { Book } from '../types';
import { BookOpen, CheckCircle2, Play, Heart, Clock, Sparkles } from 'lucide-react';

interface MyLibraryPageProps {
  books: Book[];
  onOpenReader: (book: Book) => void;
  onBrowseMore: () => void;
}

export const MyLibraryPage: React.FC<MyLibraryPageProps> = ({
  books,
  onOpenReader,
  onBrowseMore,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'finished' | 'favorites'>('all');

  // Filter user's library items
  const libraryBooks = books.filter((b) => {
    if (activeTab === 'reading') return b.progress && b.progress > 0 && b.progress < 100;
    if (activeTab === 'finished') return b.progress === 100 || b.isFinished;
    if (activeTab === 'favorites') return b.isFavorite;
    return b.progress !== undefined || b.isFinished || b.isFavorite; // 'all'
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#8B6FD8]" />
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Personal Library
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your purchased ebooks, sync bookmarks, and continue reading across all devices.
          </p>
        </div>

        <button
          onClick={onBrowseMore}
          className="px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-[#8B6FD8] text-[#8B6FD8] hover:text-white font-bold text-xs transition-all shadow-2xs self-start sm:self-auto flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          Explore Marketplace
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'all'
              ? 'bg-[#8B6FD8] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Ebooks ({books.length})
        </button>

        <button
          onClick={() => setActiveTab('reading')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'reading'
              ? 'bg-[#8B6FD8] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          In Progress
        </button>

        <button
          onClick={() => setActiveTab('finished')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'finished'
              ? 'bg-[#8B6FD8] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Finished
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'bg-[#8B6FD8] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          Favorites
        </button>
      </div>

      {/* Library Grid */}
      {libraryBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryBooks.map((book) => {
            const isCompleted = book.progress === 100 || book.isFinished;
            const progressVal = book.progress || 0;

            return (
              <div
                key={book.id}
                className="bg-white rounded-3xl p-5 border border-purple-100/80 shadow-2xs hover:shadow-md hover-lift transition-all flex gap-4 items-center"
              >
                {/* Cover image */}
                <div className="relative w-24 h-32 shrink-0 rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {isCompleted && (
                    <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-xs flex items-center justify-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold shadow-md">
                        Completed
                      </span>
                    </div>
                  )}
                </div>

                {/* Details & Action */}
                <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-1 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#8B6FD8] uppercase tracking-wider">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mt-0.5">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{book.author}</p>
                  </div>

                  {/* Progress info */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>{isCompleted ? 'Finished' : 'Reading Progress'}</span>
                      <span className={isCompleted ? 'text-emerald-600 font-bold' : 'text-[#8B6FD8]'}>
                        {isCompleted ? '100%' : `${progressVal}%`}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-[#8B6FD8] to-purple-400'
                        }`}
                        style={{ width: `${isCompleted ? 100 : progressVal}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onOpenReader(book)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#8B6FD8] text-white text-xs font-semibold hover:bg-[#795BC7] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {isCompleted ? 'Re-read Ebook' : 'Continue Reading'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 space-y-3">
          <BookOpen className="w-12 h-12 text-[#8B6FD8] mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No ebooks in this tab</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse our ebook marketplace to discover and add new titles to your library.
          </p>
          <button
            onClick={onBrowseMore}
            className="px-5 py-2 rounded-xl bg-[#8B6FD8] text-white text-xs font-bold shadow-md hover:bg-[#795BC7] transition-colors"
          >
            Browse Marketplace
          </button>
        </div>
      )}

    </div>
  );
};
