import React from 'react';
import { X, User, BookOpen, CheckCircle, Clock, Moon, Bell, Shield, LogOut } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 space-y-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900">User Profile</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className="flex-1">
            <h4 className="font-extrabold text-slate-900 text-base">Alex Morgan</h4>
            <p className="text-xs text-slate-500">alex.morgan@example.com</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-[#8B6FD8] text-[10px] font-bold">
              Premium Reader
            </span>
          </div>
        </div>

        {/* Reading Statistics */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Reading Statistics
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <BookOpen className="w-4 h-4 text-[#8B6FD8] mx-auto mb-1" />
              <span className="block text-base font-extrabold text-slate-900">12</span>
              <span className="text-[10px] text-slate-400 font-medium">Purchased</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="block text-base font-extrabold text-slate-900">8</span>
              <span className="text-[10px] text-slate-400 font-medium">Finished</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <span className="block text-base font-extrabold text-slate-900">42h</span>
              <span className="text-[10px] text-slate-400 font-medium">Read Time</span>
            </div>
          </div>
        </div>

        {/* Settings & Options */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Preferences & Settings
          </h4>

          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <Moon className="w-4 h-4 text-purple-400" />
              <span>Dark Mode Toggle</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Off</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <Bell className="w-4 h-4 text-blue-400" />
              <span>New Release Notifications</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600">Enabled</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Account & Security</span>
            </div>
          </div>
        </div>

        {/* Footer Logout */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>

      </div>
    </div>
  );
};
