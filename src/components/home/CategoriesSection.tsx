import React from 'react';
import { MOCK_CATEGORIES } from '../../data/mockBooks';
import {
  BookOpen,
  Sparkles,
  Heart,
  TrendingUp,
  Smile,
  Atom,
  Compass,
  Cpu,
  Sun,
  LucideIcon,
} from 'lucide-react';

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Sparkles,
  Heart,
  TrendingUp,
  Smile,
  Atom,
  Compass,
  Cpu,
  Sun,
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories-section" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Explore Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover curated ebooks tailored to your favorite topics
            </p>
          </div>
          
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory('All')}
              className="text-xs font-semibold text-[#8B6FD8] hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Categories Grid / Horizontal Scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {MOCK_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || BookOpen;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-[#8B6FD8] bg-purple-100/90 border-[#8B6FD8] shadow-md scale-[1.03]'
                    : `${cat.bgColor} ${cat.borderColor} border-slate-100 shadow-2xs hover:scale-[1.02]`
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#8B6FD8] text-white' : cat.textColor}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="mt-2.5 text-xs font-bold text-slate-800 text-center line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                  {cat.bookCount} books
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
