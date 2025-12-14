import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  PieChart, Pie, Legend, LabelList, CartesianGrid 
} from 'recharts';
import { InsightCard } from '../InsightCard';

// Color Palette
const COLORS = {
  background: '#f4a261', // Coral
  cleaning: '#81b29a',    // Sage
  entertainment: '#e29578', // Sand
  focus: '#4a4e69',       // Slate
  music: '#f4a261',
  shorts: '#f2cc8f',
  essay: '#81b29a',
  anime: '#dcd6f7',
  other: '#9ca3af'
};

// THREE MODES (like Twitter) - for a summary view
const THREE_MODES_DATA = [
  { name: 'Entertainment', value: 48.2, fill: '#e29578' },
  { name: 'Audio/Music', value: 32.2, fill: '#f4a261' },
  { name: 'Information', value: 19.5, fill: '#81b29a' },
];

// MUSIC BREAKDOWN (32% of total)
const MUSIC_DATA = [
  { name: 'Anime Music', value: 57.5, fill: '#f4a261' },
  { name: 'Original Music', value: 23.0, fill: '#e29578' },
  { name: 'K-pop', value: 11.7, fill: '#dcd6f7' },
  { name: 'Musical Theater', value: 3.2, fill: '#81b29a' },
  { name: 'Covers (General)', value: 2.3, fill: '#f2cc8f' },
  { name: 'Vocaloid', value: 1.2, fill: '#b5838d' },
  { name: 'Game Soundtracks', value: 1.0, fill: '#4a4e69' },
];

// NON-MUSIC BREAKDOWN (68% of total)
const NON_MUSIC_DATA = [
  { name: 'Entertainment', value: 33.9, fill: '#e29578' },
  { name: 'Animation & Fan Content', value: 33.5, fill: '#f4a261' },
  { name: 'Information', value: 28.8, fill: '#81b29a' },
  { name: 'Anime/Japanese', value: 3.7, fill: '#dcd6f7' },
];

// ENTERTAINMENT SUB-BREAKDOWN
const ENTERTAINMENT_SUB_DATA = [
  { name: 'Comedy/Memes', value: 45.8, fill: '#e29578' },
  { name: 'Gaming', value: 34.0, fill: '#f2cc8f' },
  { name: 'VTuber', value: 20.2, fill: '#dcd6f7' },
];

// INFORMATION SUB-BREAKDOWN
const INFORMATION_SUB_DATA = [
  { name: 'News/Commentary', value: 65.9, fill: '#81b29a' },
  { name: 'Tutorials', value: 21.5, fill: '#f2cc8f' },
  { name: 'Video Essays', value: 12.6, fill: '#4a4e69' },
];

// ANIMATION & FAN CONTENT SUB-BREAKDOWN
const ANIMATION_SUB_DATA = [
  { name: 'Japanese Content', value: 58.6, fill: '#f4a261' },
  { name: 'Fan Animation', value: 41.4, fill: '#dcd6f7' },
];

// TOP CHANNELS - Updated
const TOP_CHANNELS = [
  { name: 'Miura Jam', count: 98, desc: 'Anime Covers' },
  { name: 'Johnny', count: 51, desc: 'Music/Comedy' },
  { name: 'DALNODO', count: 36, desc: 'K-pop/Anime Covers' },
  { name: "Mother's Basement", count: 20, desc: 'Anime Essays' },
  { name: 'MementoMori', count: 19, desc: 'Original Music' },
  { name: 'LilyPichu', count: 21, desc: 'Music/Entertainment' },
];

// DURATION DATA
const DURATION_DATA = [
  { range: '0-2m', count: 25 },
  { range: '2-5m', count: 42 },
  { range: '5-10m', count: 15 },
  { range: '10-20m', count: 10 },
  { range: '20-60m', count: 6 },
  { range: '60m+', count: 2 },
];

export const YouTubeViz: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slides = [
    {
      title: "How I Use YouTube",
      subtitle: "4,500 videos sorted into three modes",
      content: (
        <div className="space-y-8">
           <div className="h-[350px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={THREE_MODES_DATA}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={5}
                  >
                    {THREE_MODES_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', color: '#2d2d2d' }}
                     itemStyle={{ color: '#2d2d2d', fontFamily: 'Nunito' }}
                     formatter={(value: number) => `${value}%`}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: '12px', fontFamily: 'Nunito', color: '#2d2d2d' }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-x-12">
                <div className="text-center">
                  <span className="block text-4xl font-serif text-charcoal">48%</span>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50">Entertainment</span>
                </div>
              </div>
           </div>

           <InsightCard
              colorTheme="coral"
              title="Insight: Three Modes"
              technique="Content Classification"
              finding={`Like Twitter, my YouTube breaks into three modes: entertainment for breaks, music for background, information when I'm ready to learn.`}
              hideMeta={true}
            />
        </div>
      )
    },
    {
      title: "What I Listen To",
      subtitle: "1,450 videos, avg 5 min each",
      content: (
        <div className="space-y-8">
           <div className="h-[350px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MUSIC_DATA}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={5}
                  >
                    {MUSIC_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', color: '#2d2d2d' }}
                     itemStyle={{ color: '#2d2d2d', fontFamily: 'Nunito' }}
                     formatter={(value: number) => `${value}%`}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: '12px', fontFamily: 'Nunito', color: '#2d2d2d' }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-x-12">
                <div className="text-center">
                  <span className="block text-4xl font-serif text-charcoal">58%</span>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50">Anime</span>
                </div>
              </div>
           </div>

           <InsightCard
              colorTheme="coral"
              title="Insight: The Music (32%)"
              technique="Music Breakdown"
              finding={`More than half my music is anime — openings, endings, covers. The rest splits between original tracks, K-pop, and musical theater. This is my background noise library.`}
              hideMeta={true}
            />
        </div>
      )
    },
    {
      title: "The 5-Minute Spike",
      subtitle: "Duration Distribution",
      content: (
        <div className="space-y-8">
           <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DURATION_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{fontSize: 12, fill: '#666'}} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {DURATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.range === '2-5m' ? '#f4a261' : '#d1d5db'} />
                  ))}
                  <LabelList dataKey="count" position="top" fill="#666" fontSize={12} formatter={(val: number) => `${val}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
           </div>
           
           <InsightCard 
              colorTheme="coral"
              title="Insight: The Short Tail"
              technique="Histogram Analysis"
              finding="The massive spike at 2-5 minutes confirms the 'Background' theory. This isn't just short attention span — it's a specific utility function. I use YouTube as a radio for visual noise."
              hideMeta={true}
            />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Persistent Stats Header */}
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-xl mx-auto">
        <div className="bg-white/50 p-4 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-serif text-charcoal">4,571</div>
            <div className="text-xs uppercase tracking-widest text-charcoal/40 mt-1">Total Videos</div>
        </div>
        <div className="bg-white/50 p-4 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-serif text-charcoal">4.2m</div>
            <div className="text-xs uppercase tracking-widest text-charcoal/40 mt-1">Median Duration</div>
        </div>
      </div>

      {/* Slide Navigation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-charcoal/5 pb-6">
        <div>
           <h3 className="text-2xl font-serif text-charcoal mb-1 transition-all duration-300">{slides[currentSlide].title}</h3>
           <p className="text-charcoal/50 text-sm">{slides[currentSlide].subtitle}</p>
        </div>

        <div className="flex items-center gap-4 bg-white rounded-full px-2 py-1 border border-charcoal/5 shadow-sm self-end">
           <button 
             onClick={prevSlide} 
             className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream text-charcoal/70 hover:text-charcoal transition-colors focus:outline-none"
             aria-label="Previous visualization"
           >
             ←
           </button>
           <div className="text-xs font-mono text-charcoal/40 w-12 text-center font-bold">
             {currentSlide + 1} / {slides.length}
           </div>
           <button 
             onClick={nextSlide} 
             className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream text-charcoal/70 hover:text-charcoal transition-colors focus:outline-none"
             aria-label="Next visualization"
           >
             →
           </button>
        </div>
      </div>

      {/* Slide Content */}
      <div key={currentSlide} className="animate-fade-in min-h-[500px]">
         {slides[currentSlide].content}
      </div>

    </div>
  );
};