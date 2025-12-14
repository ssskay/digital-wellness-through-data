import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, LabelList, CartesianGrid } from 'recharts';
import { InsightCard } from '../InsightCard';

// Extended wellness palette for 10 categories
const COLORS = [
  '#4a4e69', // Slate (News)
  '#f4a261', // Coral (Memes)
  '#dcd6f7', // Lavender (VTubers)
  '#81b29a', // Sage (Career)
  '#e29578', // Sand (Art)
  '#f2cc8f', // Blush (Music)
  '#9d8189', // Mauve (JP Culture)
  '#b5838d', // Dusty Rose (Gaming)
  '#ffb4a2', // Light Salmon (Anime)
  '#6d6875'  // Muted Purple (Tech)
];

const TOPIC_DATA = [
  { name: 'News', value: 24.3 },
  { name: 'Memes', value: 18.7 },
  { name: 'VTubers', value: 15.6 },
  { name: 'Career', value: 11.9 },
  { name: 'Art', value: 6.3 },
  { name: 'Music', value: 6.0 },
  { name: 'Japan', value: 5.5 },
  { name: 'Gaming', value: 4.8 },
  { name: 'Anime', value: 3.6 },
  { name: 'Tech', value: 3.2 },
];

const FORMAT_DATA = [
  { name: 'Images', value: 45, fill: '#81b29a' }, // Sage
  { name: 'Text', value: 29, fill: '#4a4e69' },   // Slate
  { name: 'Video', value: 26, fill: '#f4a261' },  // Coral
];

const EMOTION_DATA = [
  { name: 'Neutral', value: 47.5, fill: '#9ca3af' },
  { name: 'Joy', value: 14.2, fill: '#f4a261' },
  { name: 'Surprise', value: 12.3, fill: '#f2cc8f' },
  { name: 'Fear', value: 8.8, fill: '#4a4e69' },
  { name: 'Anger', value: 8.0, fill: '#e76f51' },
  { name: 'Sadness', value: 5.7, fill: '#81b29a' },
  { name: 'Disgust', value: 3.5, fill: '#6d6875' },
];

const HEATMAP_COLS = ['News', 'Memes', 'VTubers', 'Career', 'Art'];
const HEATMAP_ROWS = [
  { emotion: 'Neutral', values: [56.1, 42.7, 44.2, 48.8, 39.4] },
  { emotion: 'Joy', values: [9.3, 15.5, 12.2, 13.1, 22.7] },
  { emotion: 'Surprise', values: [12.8, 10.7, 14.3, 11.2, 13.9] },
  { emotion: 'Fear', values: [6.5, 15.2, 6.7, 5.2, 8.8] },
  { emotion: 'Anger', values: [7.2, 9.5, 9.3, 7.7, 7.6] },
  { emotion: 'Sadness', values: [4.9, 4.1, 7.6, 8.4, 6.0] },
  { emotion: 'Disgust', values: [3.0, 2.4, 5.8, 5.5, 1.6] },
];

// Helper to get color intensity for heatmap
const getIntensityColor = (val: number, max: number = 60) => {
  const intensity = Math.min(val / max, 1);
  return `rgba(244, 162, 97, ${intensity * 0.8 + 0.1})`; // Coral base
};

export const TwitterViz: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slides = [
    {
      title: "Content Classification",
      subtitle: "What am I actually consuming?",
      content: (
        <div className="space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[450px] lg:h-[400px]">
              {/* Content Categories */}
              <div className="relative flex flex-col items-center justify-center">
                <h4 className="text-sm tracking-widest uppercase text-charcoal/50 mb-4 text-center">Topic Classification</h4>
                <div className="w-full h-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={TOPIC_DATA}
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        cornerRadius={4}
                        stroke="none"
                      >
                        {TOPIC_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                         wrapperStyle={{ fontSize: '11px', fontFamily: 'Nunito', color: '#2d2d2d' }}
                         iconSize={8}
                         iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Content Format */}
              <div className="flex flex-col justify-center">
                <h4 className="text-sm tracking-widest uppercase text-charcoal/50 mb-6 text-center">Media Format</h4>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FORMAT_DATA} layout="vertical" margin={{ left: 10, right: 30 }}>
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={60} 
                        tick={{ fill: '#4a4e69', fontSize: 13, fontFamily: 'Nunito' }} 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        cursor={{fill: 'rgba(0,0,0,0.02)'}} 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', color: '#2d2d2d' }}
                        formatter={(value: number) => `${value}%`}
                      />
                      <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                        <LabelList dataKey="value" position="right" fill="#4a4e69" fontSize={12} formatter={(val: number) => `${val}%`} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 text-center">
                   <div className="inline-block bg-white border border-charcoal/5 px-6 py-3 rounded-full shadow-sm">
                     <span className="text-xs text-charcoal/70 font-bold tracking-wider">DOMINANT LANGUAGE: ENGLISH (81%)</span>
                   </div>
                </div>
              </div>
           </div>

           <InsightCard 
              colorTheme="lavender"
              title="Q: What am I feeding my mind?"
              technique="Zero-shot classification (BART-Large-MNLI)"
              finding="The data reveals three distinct modes: Information (39%), Entertainment (39%), and Aesthetic (21%). It's a nearly perfect split between my professional ambition and my personal need for escapism."
              barrier="Twitter API access was revoked. Scraped personal archive."
              aiHelp="The Coach guided me to write a Python script to structure my messy JSON archive."
              hideMeta={true}
            />
        </div>
      )
    },
    {
      title: "Emotional Nutrition Label",
      subtitle: "What emotions am I feeding on?",
      content: (
        <div className="space-y-12">
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EMOTION_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {EMOTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <LabelList dataKey="value" position="top" fill="#6B7280" fontSize={12} formatter={(val: number) => `${val}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <InsightCard 
              colorTheme="coral"
              title="Insight: Balanced Diet"
              technique="Emotion Classification (DistilRoBERTa)"
              finding="Despite the 'doomscroll' narrative, my content diet is surprisingly balanced. Joy (14%) beats anger (8%). Surprise (12%) beats fear (9%). I'm not rage-scrolling — I'm curiosity-scrolling. The emotional nutrition label isn't as bad as I expected."
              hideMeta={true}
            />
        </div>
      )
    },
    {
      title: "Emotions by Content Type",
      subtitle: "Where do I find joy? Where do I find sadness?",
      content: (
        <div className="space-y-12">
          {/* Custom Heatmap Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px] bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5">
              {/* Header Row */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                <div className="font-bold text-xs text-charcoal/40 uppercase tracking-wider self-end pb-2">Emotion</div>
                {HEATMAP_COLS.map(col => (
                  <div key={col} className="font-bold text-xs text-charcoal/60 uppercase tracking-wider text-center pb-2 border-b border-charcoal/5">{col}</div>
                ))}
              </div>

              {/* Data Rows */}
              {HEATMAP_ROWS.map((row, rowIdx) => (
                <div key={row.emotion} className="grid grid-cols-6 gap-2 py-2 items-center hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="text-sm font-serif font-medium text-charcoal/80 pl-2">{row.emotion}</div>
                  {row.values.map((val, colIdx) => {
                    const isHigh = val > 15;
                    const isHighest = val > 20;
                    return (
                      <div key={colIdx} className="relative h-10 rounded-md flex items-center justify-center group">
                        <div 
                          className="absolute inset-0 rounded-md transition-opacity"
                          style={{ backgroundColor: getIntensityColor(val) }} 
                        />
                        <span className={`relative z-10 text-xs ${isHigh ? 'font-bold text-charcoal' : 'text-charcoal/70'}`}>
                          {val}%
                        </span>
                        {isHighest && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-wellness-coral rounded-full animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-charcoal/70">
             <div className="bg-white/50 p-4 rounded-xl border border-charcoal/5">
               <span className="text-xl mr-2">🎨</span> 
               <strong>Art = Joy (22.7%)</strong>
               <p className="mt-1 text-xs opacity-80">My happy place.</p>
             </div>
             <div className="bg-white/50 p-4 rounded-xl border border-charcoal/5">
               <span className="text-xl mr-2">💼</span> 
               <strong>Career = Sadness (8.4%)</strong>
               <p className="mt-1 text-xs opacity-80">Job search anxiety is visible.</p>
             </div>
             <div className="bg-white/50 p-4 rounded-xl border border-charcoal/5">
               <span className="text-xl mr-2">😬</span> 
               <strong>Memes = Fear (15.2%)</strong>
               <p className="mt-1 text-xs opacity-80">"Relatable" often means shared anxiety.</p>
             </div>
          </div>

          <InsightCard 
            colorTheme="sage"
            title="Insight: The Context of Feelings"
            technique="Cross-Tabulation"
            finding="Art content brings the most joy. Career content carries the most sadness. And memes? Surprisingly fear-heavy — turns out 'relatable content' often means 'shared anxiety.' My emotional nutrition varies wildly by content type."
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
            <div className="text-2xl font-serif text-charcoal">26,720</div>
            <div className="text-xs uppercase tracking-widest text-charcoal/40 mt-1">Total Tweets</div>
        </div>
        <div className="bg-white/50 p-4 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-serif text-charcoal">14,412</div>
            <div className="text-xs uppercase tracking-widest text-charcoal/40 mt-1">Unique Accounts</div>
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