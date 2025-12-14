import React, { useState } from 'react';
import { SectionType } from '../types';

interface SidebarProps {
  activeSection: SectionType;
  scrollTo: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, scrollTo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { 
      label: 'Overview',
      isGroup: true,
      children: [
        { id: SectionType.INTRO, label: 'Intro' },
        { id: SectionType.INTRO_CONTENT, label: 'Why This Matters' }
      ]
    },
    {
      label: 'My Digital Life',
      isGroup: true,
      children: [
        { id: SectionType.DATASET, label: 'Meet the Dataset' },
        { id: SectionType.TWITTER, label: 'Twitter Content' },
        { id: SectionType.YOUTUBE, label: 'YouTube Focus' },
        { id: SectionType.LINKEDIN, label: 'LinkedIn Career' },
        { id: SectionType.INSIGHTS, label: 'What I Found' },
      ]
    },
    {
      label: 'Behind the Scenes',
      isGroup: true,
      children: [
        { id: SectionType.METHODOLOGY, label: 'How I Did It' },
        { id: SectionType.TEAM, label: 'The Team' },
      ]
    },
    { id: SectionType.FRAMEWORK, label: 'Your Turn' },
    { id: SectionType.REFERENCES, label: 'References' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-500 ease-in-out font-sans ${isHovered ? 'w-72 bg-paper/95 backdrop-blur-md shadow-[10px_0_30px_-5px_rgba(0,0,0,0.05)] border-r border-charcoal/5' : 'w-6 bg-transparent'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed State Indicator */}
      <div className={`absolute top-0 left-0 h-full w-5 bg-gradient-to-b from-wellness-lavender via-wellness-coral to-wellness-sage transition-opacity duration-300 rounded-r-md ${isHovered ? 'opacity-0' : 'opacity-80'}`} />

      {/* Hover Target Area (Invisible buffer) */}
      <div className={`absolute top-0 left-0 h-full w-12 ${isHovered ? 'hidden' : 'block'}`} />

      {/* Content */}
      <div className={`p-8 h-full flex flex-col justify-center transition-all duration-300 delay-100 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        <h3 className="font-serif text-charcoal/40 text-xs tracking-[0.2em] uppercase mb-10 border-b border-charcoal/5 pb-4">
          Journal Index
        </h3>
        
        <nav className="flex flex-col gap-6">
          {navItems.map((item, idx) => {
            if (item.isGroup && item.children) {
              return (
                <div key={idx} className="space-y-3">
                  <span className="text-sm font-serif text-charcoal/40 italic block">{item.label}</span>
                  <div className="pl-4 flex flex-col gap-3 border-l border-charcoal/5">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => scrollTo(child.id)}
                        className={`text-left text-sm transition-all duration-300 hover:translate-x-1 ${activeSection === child.id ? 'text-wellness-coral font-bold' : 'text-charcoal/60 hover:text-charcoal'}`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return (
               <button
                  key={item.id}
                  onClick={() => scrollTo(item.id!)}
                  className={`text-left text-lg font-serif transition-all duration-300 hover:translate-x-1 ${activeSection === item.id ? 'text-wellness-coral italic' : 'text-charcoal/80 hover:text-charcoal'}`}
                >
                  {item.label}
                </button>
            )
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-charcoal/5">
           <p className="text-xs text-charcoal/30 leading-relaxed">
             "To know yourself is the beginning of wisdom."
           </p>
        </div>
      </div>
    </div>
  );
};