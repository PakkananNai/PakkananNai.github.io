import React, { useState } from 'react';
import { Book } from '../types';
import { User, BookOpen, CheckCircle, Clock, Moon, Bell, Shield, Edit3, Heart, Save } from 'lucide-react';

interface ProfilePageProps {
  books: Book[];
  onOpenReader: (book: Book) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ books, onOpenReader }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const purchasedBooks = books.slice(0, 6);
  const finishedBooks = books.filter((b) => b.isFinished || b.progress === 100);

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 shadow-md"
          />
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-1 text-sm font-bold border rounded-lg"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-1 text-xs border rounded-lg block"
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-extrabold text-slate-900">{name}</h1>
                <p className="text-xs text-slate-500">{email}</p>
                <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-[#8B6FD8] text-[10px] font-extrabold">
                  Premium Reader Member
                </span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#8B6FD8] font-bold text-xs transition-all flex items-center gap-1.5 border border-purple-200/60"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* Reading Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#8B6FD8] flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-slate-900">{purchasedBooks.length}</span>
            <span className="text-xs text-slate-400 font-medium">Purchased Ebooks</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-slate-900">{finishedBooks.length + 3}</span>
            <span className="text-xs text-slate-400 font-medium">Books Finished</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-slate-900">42 Hours</span>
            <span className="text-xs text-slate-400 font-medium">Reading Time</span>
          </div>
        </div>
      </div>

      {/* Purchased Books Preview Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Recently Purchased Books</h3>
          <span className="text-xs font-semibold text-[#8B6FD8]">View All ({purchasedBooks.length})</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          {purchasedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onOpenReader(book)}
              className="cursor-pointer group space-y-2"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 shadow-2xs group-hover:scale-105 transition-transform">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <span className="block text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-[#8B6FD8]">
                {book.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Preferences & Toggles */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Account Settings & Preferences</h3>

        <div className="space-y-3 divide-y divide-slate-100 text-xs">
          
          <div className="pt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-purple-500" />
              <div>
                <span className="font-bold text-slate-800 block">Dark Mode</span>
                <span className="text-slate-400">Switch application visual theme</span>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                darkMode ? 'bg-[#8B6FD8] justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-blue-500" />
              <div>
                <span className="font-bold text-slate-800 block">Email & Push Notifications</span>
                <span className="text-slate-400">Receive new release alerts and reading milestones</span>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                notifications ? 'bg-[#8B6FD8] justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="font-bold text-slate-800 block">Security & Privacy</span>
                <span className="text-slate-400">Manage password and device sessions</span>
              </div>
            </div>
            <span className="text-[#8B6FD8] font-bold cursor-pointer hover:underline">Manage</span>
          </div>

        </div>
      </div>

    </div>
  );
};
