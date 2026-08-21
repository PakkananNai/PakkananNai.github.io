import React, { useState } from 'react';
import { Book } from '../types';
import { ArrowLeft, Bookmark, Settings, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface ReadingPageProps {
  book: Book;
  onBackToLibrary: () => void;
}

export const ReadingPage: React.FC<ReadingPageProps> = ({
  book,
  onBackToLibrary,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState<'sepia' | 'light' | 'dark'>('sepia');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const totalPages = book.pages || 240;

  const themeStyles = {
    light: 'bg-[#FFFFFF] text-slate-900 border-slate-200',
    sepia: 'bg-[#FAF6EE] text-[#4A3E3D] border-[#E8DFC9]',
    dark: 'bg-[#18181B] text-[#E4E4E7] border-zinc-800',
  };

  const fontClasses = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  };

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-loose',
    lg: 'text-lg leading-loose',
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between ${themeStyles[theme].split(' ')[0]} ${themeStyles[theme].split(' ')[1]} transition-colors duration-300`}>
      
      {/* Top Bar */}
      <header className={`px-6 py-4 border-b flex items-center justify-between ${themeStyles[theme].split(' ')[2]}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLibrary}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </button>

          <div className="hidden sm:block border-l border-slate-300/40 pl-4">
            <h4 className="font-bold text-sm truncate max-w-xs">{book.title}</h4>
            <p className="text-[11px] opacity-70">Chapter 1 • {book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2.5 rounded-xl transition-all ${
              bookmarked ? 'bg-amber-100 text-amber-600' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Bookmark page"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-600' : ''}`} />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Reading Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Settings Popup Panel */}
      {showSettings && (
        <div className="absolute top-16 right-6 z-30 w-80 p-5 rounded-3xl bg-white text-slate-800 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Reading Preferences</h4>

          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">Theme Canvas</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold ${
                  theme === 'light' ? 'border-[#8B6FD8] bg-purple-50 text-[#8B6FD8]' : 'bg-white text-slate-700'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold ${
                  theme === 'sepia' ? 'border-[#8B6FD8] bg-[#FAF6EE] text-[#4A3E3D]' : 'bg-[#FAF6EE] text-[#4A3E3D]'
                }`}
              >
                Sepia
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold ${
                  theme === 'dark' ? 'border-[#8B6FD8] bg-zinc-900 text-white' : 'bg-zinc-900 text-white'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">Font Size</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSize('sm')}
                className={`py-1.5 px-3 rounded-xl border text-xs ${fontSize === 'sm' ? 'bg-[#8B6FD8] text-white' : 'bg-slate-50'}`}
              >
                Small
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`py-1.5 px-3 rounded-xl border text-sm ${fontSize === 'base' ? 'bg-[#8B6FD8] text-white' : 'bg-slate-50'}`}
              >
                Medium
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`py-1.5 px-3 rounded-xl border text-base ${fontSize === 'lg' ? 'bg-[#8B6FD8] text-white' : 'bg-slate-50'}`}
              >
                Large
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">Font Typography</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontFamily('serif')}
                className={`py-1.5 px-2 rounded-xl border text-xs font-serif ${fontFamily === 'serif' ? 'bg-[#8B6FD8] text-white' : 'bg-slate-50'}`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`py-1.5 px-2 rounded-xl border text-xs font-sans ${fontFamily === 'sans' ? 'bg-[#8B6FD8] text-white' : 'bg-slate-50'}`}
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily('mono')}
                className={`py-1.5 px-2 rounded-xl border text-xs font-mono ${fontFamily === 'mono' ? 'bg-[#8B6FD8] text-white' : 'bg-slate-50'}`}
              >
                Mono
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Reading Canvas */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 flex flex-col justify-center">
        <div className={`space-y-6 ${fontClasses[fontFamily]} ${fontSizeClasses[fontSize]}`}>
          <div className="text-center pb-6 border-b border-current/10 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Chapter 1</span>
            <h1 className="text-2xl sm:text-4xl font-bold">{book.title}</h1>
            <p className="text-xs opacity-70 font-sans">{book.author}</p>
          </div>

          <p>
            {book.description}
          </p>

          <p>
            The quiet morning brought with it a soft lavender light that filtered gently through the high arched windows of the old reading room. Outside, rain tapped rhythmically against the stone sill, creating a calm cocoon of focus.
          </p>

          <p>
            To learn deeply is not simply to consume information, but to step into a slow, deliberate dialog with thoughts crafted by minds across generations. When you open a book in peace, time slows its restless hurry.
          </p>

          <p className="opacity-80 italic text-sm pt-4 border-t border-current/10">
            Page {currentPage} of {totalPages} • Cloud Reader Sync Enabled
          </p>
        </div>
      </main>

      {/* Bottom Controls & Progress */}
      <footer className={`px-6 py-4 border-t ${themeStyles[theme].split(' ')[2]} flex flex-col gap-3 max-w-3xl mx-auto w-full`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold disabled:opacity-30 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Page
          </button>

          <span className="text-xs font-bold opacity-70">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold disabled:opacity-30 flex items-center gap-1"
          >
            Next Page
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#8B6FD8] h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </footer>

    </div>
  );
};
