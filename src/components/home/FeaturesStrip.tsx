import React from 'react';
import { Smartphone, Download, Bookmark, Headset } from 'lucide-react';

export const FeaturesStrip: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Read Anywhere',
      subtitle: 'On any device, mobile or desktop',
      bgColor: 'bg-purple-50',
      iconColor: 'text-[#8B6FD8]',
    },
    {
      icon: Download,
      title: 'Offline Reading',
      subtitle: 'Download and read anywhere offline',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Bookmark,
      title: 'Bookmarks & Notes',
      subtitle: 'Save your thoughts & highlights',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
    {
      icon: Headset,
      title: '24/7 Support',
      subtitle: "We're here to help anytime",
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-2">
              <div className={`w-12 h-12 rounded-2xl ${f.bgColor} ${f.iconColor} flex items-center justify-center shrink-0`}>
                <f.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{f.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
