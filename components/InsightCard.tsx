import React, { useState } from 'react';
import { InsightCardProps } from '../types';

export const InsightCard: React.FC<InsightCardProps & { colorTheme: string }> = ({ 
  title, 
  technique, 
  finding, 
  barrier, 
  aiHelp,
  colorTheme,
  hideMeta = false
}) => {
  const [showMeta, setShowMeta] = useState(false);

  // Map theme to text color classes
  const textColors: Record<string, string> = {
    'lavender': 'text-wellness-slate',
    'coral': 'text-wellness-coral',
    'sage': 'text-wellness-sage',
    'sand': 'text-wellness-sand',
  };
  const themeTextColor = textColors[colorTheme] || 'text-charcoal';

  return (
    <div className="bg-paper rounded-3xl p-8 transition-all duration-500 hover:shadow-lg hover:bg-white relative overflow-hidden group">
      
      {/* Decorative corner shape */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-${colorTheme === 'lavender' ? 'wellness-lavender' : colorTheme === 'coral' ? 'wellness-coral' : 'wellness-sage'}/20 transition-transform duration-500 group-hover:scale-150`} />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-serif font-semibold text-charcoal">{title}</h3>
          <p className={`text-xs tracking-wider font-bold uppercase ${themeTextColor} mt-2 opacity-80`}>
            Method: {technique}
          </p>
        </div>
        {!hideMeta && (
          <button 
            onClick={() => setShowMeta(!showMeta)}
            className="text-xs px-4 py-2 rounded-full bg-white border border-gray-100 text-charcoal/60 hover:text-charcoal hover:shadow-sm transition-all"
          >
            {showMeta ? 'Show Reflection' : 'Behind the Scenes'}
          </button>
        )}
      </div>

      <div className="relative min-h-[140px] z-10">
        {/* Finding View */}
        <div className={`transition-all duration-500 absolute inset-0 ${showMeta ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <p className="text-charcoal/80 text-lg leading-relaxed font-serif italic border-l-2 border-gray-200 pl-4 whitespace-pre-line">
            "{finding}"
          </p>
        </div>

        {/* Meta View (Barriers & AI) */}
        <div className={`transition-all duration-500 absolute inset-0 ${!showMeta ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="space-y-4 text-sm bg-white/50 p-4 rounded-xl">
            {barrier && (
              <div className="flex gap-3 items-start">
                <span className="text-wellness-coral font-bold text-lg">✦</span>
                <div>
                  <span className="font-bold text-charcoal/70 block mb-1">The Challenge</span>
                  <span className="text-charcoal/60 leading-relaxed">{barrier}</span>
                </div>
              </div>
            )}
            {aiHelp && (
              <div className="flex gap-3 items-start">
                <span className="text-wellness-sage font-bold text-lg">Testing</span>
                <div>
                  <span className="font-bold text-charcoal/70 block mb-1">Guidance</span>
                  <span className="text-charcoal/60 leading-relaxed">{aiHelp}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};