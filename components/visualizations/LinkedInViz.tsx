import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, 
  LabelList, Cell, PieChart, Pie, Legend, ComposedChart, Line, CartesianGrid,
  Label
} from 'recharts';
import { InsightCard } from '../InsightCard';

// --- DATA SETS ---

const MONTHLY_DATA = [
  { month: "2015-06", connections: 16 },
  { month: "2015-07", connections: 2 },
  { month: "2015-08", connections: 0 },
  { month: "2015-09", connections: 4 },
  { month: "2015-10", connections: 0 },
  { month: "2015-11", connections: 0 },
  { month: "2015-12", connections: 1 },
  { month: "2016-01", connections: 0 },
  { month: "2016-02", connections: 0 },
  { month: "2016-03", connections: 0 },
  { month: "2016-04", connections: 0 },
  { month: "2016-05", connections: 0 },
  { month: "2016-06", connections: 0 },
  { month: "2016-07", connections: 13 },
  { month: "2016-08", connections: 97 },
  { month: "2016-09", connections: 271 },
  { month: "2016-10", connections: 65 },
  { month: "2016-11", connections: 12 },
  { month: "2016-12", connections: 9 },
  { month: "2017-01", connections: 4 },
  { month: "2017-02", connections: 2 },
  { month: "2017-03", connections: 0 },
  { month: "2017-04", connections: 1 },
  { month: "2017-05", connections: 0 },
  { month: "2017-06", connections: 0 },
  { month: "2017-07", connections: 2 },
  { month: "2017-08", connections: 0 },
  { month: "2017-09", connections: 5 },
  { month: "2017-10", connections: 1 },
  { month: "2017-11", connections: 0 },
  { month: "2017-12", connections: 0 },
  { month: "2018-01", connections: 0 },
  { month: "2018-02", connections: 0 },
  { month: "2018-03", connections: 0 },
  { month: "2018-04", connections: 0 },
  { month: "2018-05", connections: 0 },
  { month: "2018-06", connections: 0 },
  { month: "2018-07", connections: 0 },
  { month: "2018-08", connections: 0 },
  { month: "2018-09", connections: 0 },
  { month: "2018-10", connections: 0 },
  { month: "2018-11", connections: 0 },
  { month: "2018-12", connections: 0 },
  { month: "2019-01", connections: 0 },
  { month: "2019-02", connections: 0 },
  { month: "2019-03", connections: 22 },
  { month: "2019-04", connections: 101 },
  { month: "2019-05", connections: 23 },
  { month: "2019-06", connections: 7 },
  { month: "2019-07", connections: 2 },
  { month: "2019-08", connections: 35 },
  { month: "2019-09", connections: 21 },
  { month: "2019-10", connections: 29 },
  { month: "2019-11", connections: 3 },
  { month: "2019-12", connections: 1 },
  { month: "2020-01", connections: 1 },
  { month: "2020-02", connections: 5 },
  { month: "2020-03", connections: 135 },
  { month: "2020-04", connections: 42 },
  { month: "2020-05", connections: 16 },
  { month: "2020-06", connections: 15 },
  { month: "2020-07", connections: 25 },
  { month: "2020-08", connections: 6 },
  { month: "2020-09", connections: 48 },
  { month: "2020-10", connections: 22 },
  { month: "2020-11", connections: 18 },
  { month: "2020-12", connections: 5 },
  { month: "2021-01", connections: 0 },
  { month: "2021-02", connections: 0 },
  { month: "2021-03", connections: 0 },
  { month: "2021-04", connections: 17 },
  { month: "2021-05", connections: 63 },
  { month: "2021-06", connections: 11 },
  { month: "2021-07", connections: 8 },
  { month: "2021-08", connections: 4 },
  { month: "2021-09", connections: 39 },
  { month: "2021-10", connections: 12 },
  { month: "2021-11", connections: 22 },
  { month: "2021-12", connections: 101 },
  { month: "2022-01", connections: 8 },
  { month: "2022-02", connections: 0 },
  { month: "2022-03", connections: 0 },
  { month: "2022-04", connections: 1 },
  { month: "2022-05", connections: 2 },
  { month: "2022-06", connections: 40 },
  { month: "2022-07", connections: 21 },
  { month: "2022-08", connections: 31 },
  { month: "2022-09", connections: 160 },
  { month: "2022-10", connections: 24 },
  { month: "2022-11", connections: 6 },
  { month: "2022-12", connections: 1 },
  { month: "2023-01", connections: 3 },
  { month: "2023-02", connections: 63 },
  { month: "2023-03", connections: 322 },
  { month: "2023-04", connections: 70 },
  { month: "2023-05", connections: 24 },
  { month: "2023-06", connections: 25 },
  { month: "2023-07", connections: 20 },
  { month: "2023-08", connections: 70 },
  { month: "2023-09", connections: 36 },
  { month: "2023-10", connections: 6 },
  { month: "2023-11", connections: 1 },
  { month: "2023-12", connections: 4 },
  { month: "2024-01", connections: 8 },
  { month: "2024-02", connections: 5 },
  { month: "2024-03", connections: 5 },
  { month: "2024-04", connections: 24 },
  { month: "2024-05", connections: 5 },
  { month: "2024-06", connections: 14 },
  { month: "2024-07", connections: 29 },
  { month: "2024-08", connections: 4 },
  { month: "2024-09", connections: 2 },
  { month: "2024-10", connections: 0 },
  { month: "2024-11", connections: 0 },
  { month: "2024-12", connections: 2 },
  { month: "2025-01", connections: 2 },
  { month: "2025-02", connections: 10 },
  { month: "2025-03", connections: 5 },
  { month: "2025-04", connections: 9 },
  { month: "2025-05", connections: 22 },
  { month: "2025-06", connections: 3 },
];

const CAREER_EVENTS = [
  { date: "2016-08", label: "Stanford Summer College Program" },
  { date: "2019-02", label: "Fr." },
  { date: "2019-07", label: "So." },
  { date: "2020-07", label: "Jr." },
  { date: "2021-08", label: "Sr." },
  { date: "2022-08", label: "Started at Moody's" }
];

const YEAR_TICKS = MONTHLY_DATA.filter(d => d.month.endsWith('-01')).map(d => d.month);

// Finding 2: Big Tech %
const BIG_TECH_PERCENT_DATA = [
  { year: '2015', percent: 0 },
  { year: '2016', percent: 4 },
  { year: '2017', percent: 0 },
  { year: '2019', percent: 13 },
  { year: '2020', percent: 11 },
  { year: '2021', percent: 6 },
  { year: '2022', percent: 5 },
  { year: '2023', percent: 8 },
  { year: '2024', percent: 4 },
  { year: '2025', percent: 4 },
];

// Finding 3: Top Companies (No Employers)
const TOP_COMPANIES_DATA = [
  { name: 'Google', count: 43, type: 'tech' },
  { name: 'Meta', count: 38, type: 'tech' },
  { name: 'Microsoft', count: 35, type: 'tech' },
  { name: 'Dartmouth', count: 33, type: 'school' },
  { name: 'Amazon', count: 30, type: 'tech' },
  { name: 'PNC', count: 24, type: 'finance' },
  { name: 'Palantir', count: 14, type: 'tech' },
  { name: 'AWS', count: 14, type: 'tech' },
  { name: 'Servco', count: 13, type: 'other' },
  { name: 'Goldman', count: 11, type: 'finance' },
];

// Finding 4: Big Tech Stacked
const BIG_TECH_STACKED_DATA = [
  { year: '2016', Meta: 10, Google: 2, Microsoft: 1, Amazon: 0, Apple: 1 },
  { year: '2019', Meta: 3, Google: 13, Microsoft: 4, Amazon: 2, Apple: 2 },
  { year: '2020', Meta: 5, Google: 8, Microsoft: 6, Amazon: 12, Apple: 3 },
  { year: '2022', Meta: 4, Google: 5, Microsoft: 5, Amazon: 8, Apple: 2 },
  { year: '2023', Meta: 8, Google: 10, Microsoft: 16, Amazon: 6, Apple: 4 },
];

// Finding 5: Composition
const COMPOSITION_DATA = [
  { name: 'Other', value: 73.2, fill: '#e5e7eb' },
  { name: 'Education', value: 8.5, fill: '#dcd6f7' }, // Lavender
  { name: 'Big Tech', value: 7.9, fill: '#f4a261' }, // Coral
  { name: 'Finance', value: 3.8, fill: '#81b29a' }, // Sage
  { name: 'Consulting', value: 2.5, fill: '#4a4e69' }, // Slate
  { name: 'Other Tech', value: 1.6, fill: '#2d2d2d' }, // Charcoal
];

export const LinkedInViz: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slides = [
    {
      title: "Every Job Search Shows Up in the Data",
      subtitle: "Career Anxiety Has a Signature",
      content: (
        <div className="space-y-8">
           <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_DATA} margin={{ top: 40, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  ticks={YEAR_TICKS}
                  tickFormatter={(val) => val.split('-')[0]}
                  tick={{fontSize: 11, fill: '#999'}} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.03)'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                  labelFormatter={(label) => {
                    const [y, m] = label.split('-');
                    const date = new Date(parseInt(y), parseInt(m)-1);
                    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
                  }}
                />
                <Bar dataKey="connections" fill="#10b981" radius={[2, 2, 0, 0]} barSize={4} />
                
                {CAREER_EVENTS.map((event, idx) => (
                  <ReferenceLine 
                    key={idx} 
                    x={event.date} 
                    stroke="#ef4444" 
                    strokeDasharray="3 3"
                  >
                    <Label 
                      value={event.label} 
                      position="top" 
                      angle={0} 
                      offset={10}
                      style={{ 
                        fill: '#ef4444', 
                        fontSize: '10px', 
                        fontWeight: 600,
                        textAnchor: 'middle',
                        backgroundColor: 'white'
                      }} 
                    />
                  </ReferenceLine>
                ))}
              </ComposedChart>
            </ResponsiveContainer>
           </div>
           
           <InsightCard 
              colorTheme="sage"
              title="10 Years on LinkedIn at a Glance"
              technique="Time Series Analysis"
              finding={`I started actively using Linkedin during a summer entrepreneurship class at Stanford in 2016, giving me my first real networking experience. Then silence until college, when every spike maps to an internship search. 
              
              But the biggest spikes? Orientation and six months into Moody's, when my whole division met in NYC. That's when I felt like I belonged.`}
              barrier="Missing connection timestamps in basic export."
              aiHelp="Used AI to infer connection dates from shared work history data points."
              hideMeta={true}
            />
        </div>
      )
    },
    {
      title: "When Was I Chasing FAANG?",
      subtitle: "The Rise and Fall of the Big Tech Dream",
      content: (
        <div className="space-y-8">
           <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BIG_TECH_PERCENT_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{fontSize: 12, fill: '#666'}} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(val) => `${val}%`} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                  formatter={(val: number) => [`${val}%`, 'Big Tech Connections']}
                />
                <ReferenceLine y={10} stroke="#f4a261" strokeDasharray="3 3">
                  <Label value="The 10% Dream Line" position="insideTopRight" fill="#f4a261" fontSize={12} />
                </ReferenceLine>
                <Bar dataKey="percent" radius={[4, 4, 0, 0]}>
                  {BIG_TECH_PERCENT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.percent > 10 ? '#f4a261' : '#d1d5db'} />
                  ))}
                  <LabelList dataKey="percent" position="top" formatter={(val: number) => val > 0 ? `${val}%` : ''} fill="#666" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
           </div>
           
           <InsightCard 
              colorTheme="coral"
              title="Insight: Fading Dreams"
              technique="Company Classification"
              finding="Freshman year, 1 in 8 connections was Big Tech. By the time I got laid off? 1 in 25. The Big Tech dream didn't die — it just quietly faded as I found my actual path. I prioritized remote work and stability over the Silicon Valley chase."
              hideMeta={true}
            />
        </div>
      )
    },
    {
      title: "Who's In My Network?",
      subtitle: "My Network Beyond the Employers",
      content: (
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[350px]">
             {/* Top Companies */}
             <div className="h-full">
               <h4 className="text-xs uppercase tracking-widest text-charcoal/50 mb-4 text-center">Top 10 Organizations (No Employers)</h4>
               <ResponsiveContainer width="100%" height="90%">
                 <BarChart data={TOP_COMPANIES_DATA} layout="vertical" margin={{ left: 20 }}>
                   <XAxis type="number" hide />
                   <YAxis type="category" dataKey="name" width={80} tick={{fontSize: 11}} interval={0} axisLine={false} tickLine={false} />
                   <Tooltip cursor={{fill: 'transparent'}} />
                   <Bar dataKey="count" barSize={16} radius={[0, 4, 4, 0]}>
                      {TOP_COMPANIES_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.type === 'school' ? '#dcd6f7' : '#81b29a'} />
                      ))}
                      <LabelList dataKey="count" position="right" fontSize={10} fill="#666" />
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>

             {/* Composition */}
             <div className="h-full flex flex-col items-center justify-center">
                <h4 className="text-xs uppercase tracking-widest text-charcoal/50 mb-4 text-center">Network Composition</h4>
                <div className="w-full h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={COMPOSITION_DATA}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {COMPOSITION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend iconSize={8} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize: '11px'}} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-bold text-charcoal">36% Technical Roles</div>
                  <div className="text-xs text-charcoal/50">Engineering + Data Analytics</div>
                </div>
             </div>
           </div>
           
           <InsightCard 
              colorTheme="lavender"
              title="Insight: The Aspirations"
              technique="Frequency Analysis"
              finding="Strip away my employers and the top 4 companies are all Big Tech: Google, Meta, Microsoft, Amazon. I built a FAANG network, then went into financial services. Your network shows where you *thought* you'd end up, not where you actually land."
              hideMeta={true}
            />
        </div>
      )
    },
    {
      title: "Which Companies, When?",
      subtitle: "Big Tech Breakdown by Year",
      content: (
        <div className="space-y-8">
           <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BIG_TECH_STACKED_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                
                <Bar dataKey="Google" stackId="a" fill="#4285F4" />
                <Bar dataKey="Meta" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="Microsoft" stackId="a" fill="#F25022" />
                <Bar dataKey="Amazon" stackId="a" fill="#FF9900" />
                <Bar dataKey="Apple" stackId="a" fill="#555555" />
              </BarChart>
            </ResponsiveContainer>
           </div>
           
           <InsightCard 
              colorTheme="sage"
              title="Insight: Shifting Targets"
              technique="Stacked Time Series"
              finding="2019 was my Google year — 13 connections in one year. By 2023, Microsoft had taken over thanks to conference networking. The companies you target shift as your career focus evolves."
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
            <div className="text-2xl font-serif text-charcoal">2,451</div>
            <div className="text-xs uppercase tracking-widest text-charcoal/40 mt-1">Total Connections</div>
        </div>
        <div className="bg-white/50 p-4 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-serif text-charcoal">10 Years</div>
            <div className="text-xs uppercase tracking-widest text-charcoal/40 mt-1">Networking History</div>
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