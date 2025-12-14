import React, { ReactNode } from 'react';
import { SectionType } from '../types';

interface ChapterProps {
  id: SectionType;
  title: string;
  subtitle: string;
  children: ReactNode;
  isActive: boolean;
  colorTheme: string; // matches tailwind colors
}

export const Chapter: React.FC<ChapterProps> = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  isActive,
  colorTheme 
}) => {
  // Map legacy color themes to our new wellness palette for background accents
  const bgColors: Record<string, string> = {
    'lavender': 'bg-wellness-lavender/10',
    'coral': 'bg-wellness-coral/10',
    'sage': 'bg-wellness-sage/10',
    'sand': 'bg-wellness-sand/10',
  };

  const accentColor = bgColors[colorTheme] || 'bg-gray-100';

  return (
    <section 
      id={id} 
      className={`scroll-section relative py-24 px-6 md:px-20 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-10 blur-sm'}`}
    >
      {/* Organic Background Shape */}
      <div className={`absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] -z-10 ${accentColor} opacity-60 mix-blend-multiply animate-float`} />
      
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row gap-16 items-center">
        {/* Narrative Side */}
        <div className="md:w-1/3 flex flex-col space-y-8">
          <div className="flex items-center gap-3">
             <span className="h-px w-10 bg-charcoal/30"></span>
             <span className="text-sm font-semibold tracking-widest text-charcoal/60 uppercase">
               Chapter: {id}
             </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-charcoal leading-tight">
            {title}
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed font-light">
            {subtitle}
          </p>
          
          {/* Mobile indicator */}
          <div className="md:hidden text-charcoal/40 mt-10 text-center text-sm">
            Scroll gently ↓
          </div>
        </div>

        {/* Content/Viz Side */}
        <div className="md:w-2/3 w-full">
          <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-2 md:p-8 shadow-sm border border-white/50">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};