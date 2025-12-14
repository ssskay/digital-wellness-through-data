import React, { useEffect, useState } from 'react';
import { SectionType } from './types';
import { Chapter } from './components/Chapter';
import { Sidebar } from './components/Sidebar';
import { TwitterViz } from './components/visualizations/TwitterViz';
import { YouTubeViz } from './components/visualizations/YouTubeViz';
import { LinkedInViz } from './components/visualizations/LinkedInViz';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.INTRO);
  const [showTechDeepDive, setShowTechDeepDive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionType);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-cream text-charcoal min-h-screen selection:bg-wellness-lavender/30">
      
      <Sidebar activeSection={activeSection} scrollTo={scrollTo} />

      {/* Intro Section (Hero) */}
      <section id={SectionType.INTRO} className="scroll-section relative py-20 px-6 md:px-20 text-center overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Soft blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wellness-lavender/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wellness-coral/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-4xl mx-auto space-y-10 relative z-10 opacity-0 animate-fade-in">
          <div className="inline-block px-5 py-2 rounded-full border border-charcoal/5 bg-white/50 backdrop-blur-sm text-charcoal/60 font-sans text-xs tracking-[0.2em] uppercase">
            Data Mining Case Study
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif text-charcoal leading-[1.1]">
            Digital Wellness<br />
            <span className="italic text-wellness-slate">Through Data</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
            Your data tells a story you've never read.
            <br/>
            <strong className="font-normal text-wellness-coral">It's time to see what your algorithm sees.</strong>
          </p>

          <div className="pt-8">
            <button
              onClick={() => scrollTo(SectionType.DATASET)}
              className="px-10 py-4 bg-charcoal text-white rounded-full font-serif italic text-lg hover:bg-wellness-slate transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Begin the Journey
            </button>
          </div>
        </div>
        
        {/* Scroll Hint */}
         <div 
          onClick={() => scrollTo(SectionType.INTRO_CONTENT)}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer hover:translate-y-1 transition-transform opacity-40 hover:opacity-100"
         >
           <div className="text-xs uppercase tracking-[0.3em] mb-2 text-charcoal">Read Context</div>
           <div className="text-2xl text-charcoal">↓</div>
        </div>
      </section>

      {/* Editorial Content Section */}
      <section id={SectionType.INTRO_CONTENT} className="scroll-section py-20 px-6 md:px-20 bg-cream/50">
          <div className="max-w-3xl mx-auto text-left space-y-24 py-12">
            
            {/* Why This Matters */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-charcoal">Why Screen Time Isn't Enough</h2>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                We're told to care about screen time. But screen time is a terrible metric.
              </p>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                Research has struggled to find consistent relationships between time spent on screens and mental health outcomes. A 2023 systematic review in <em>BMC Psychology</em> concluded that "screen time" may no longer be appropriate for these investigations because the nature of content and user interaction remains unclear.
              </p>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                The real insight from research isn't about <em>how long</em> — it's about <em>what you're doing</em>.
              </p>
              
              <blockquote className="border-l-4 border-wellness-coral pl-8 py-2 my-8">
                <p className="text-2xl font-serif italic text-charcoal/90">
                  "Social network sites are not 'good' or 'bad'. Their mental health consequences critically depend on how these sites are used."
                </p>
                <footer className="mt-2 text-sm text-charcoal/50 uppercase tracking-widest font-sans">— World Psychiatry, 2021</footer>
              </blockquote>

              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                Passive scrolling is consistently linked to worse outcomes than active participation. But even this framework has a problem: it treats reading hateful comments, watching a funny cat video, and seeing an advertisement as equally relevant to well-being.
              </p>
              
              <p className="text-xl md:text-2xl font-serif text-charcoal font-medium">
                Nobody is looking at the actual content.
              </p>
            </div>

            {/* The Gap */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-charcoal">The Gap in Digital Wellness</h2>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                Your phone can tell you that you spent 4 hours on Twitter yesterday. It cannot tell you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg text-charcoal/80 font-light marker:text-wellness-sage">
                <li>What emotional content you gravitated toward</li>
                <li>Whether your consumption patterns shifted during stressful life events</li>
                <li>What your algorithm thinks you want</li>
                <li>How your content diet differs across platforms or times of day</li>
              </ul>
              <p className="text-xl font-serif italic text-wellness-slate">
                Digital wellness tools give us calories without nutrition labels. We know how much we consumed, but not what — or how it's shaping us.
              </p>
            </div>

            {/* The Question */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-charcoal">The Question</h2>
              <p className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
                What if you could see your algorithm the way your algorithm sees you?
              </p>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                This project applies data mining techniques to my own social media data — 26,720 Twitter likes, 4,500 YouTube videos, 500+ LinkedIn connections — to answer:
              </p>
              <p className="text-xl font-serif italic text-charcoal">
                Who am I online, and does that person match who I think I am?
              </p>
            </div>

             {/* Why Personal Data */}
             <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-charcoal">Why Personal Data?</h2>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                If you want to modify your digital environment, you need to see it first.
              </p>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                Behavioral science calls this environmental modification — it's easier to not eat chocolate if you don't keep it in the house. But you can't curate an algorithm you can't observe.
              </p>
              <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
                This is a proof-of-concept: personal data mining as a tool for digital self-understanding. Not to shame yourself about screen time, but to make the invisible visible.
              </p>
            </div>
          </div>
      </section>

      {/* Meet the Dataset */}
      <section id={SectionType.DATASET} className="scroll-section py-24 px-6 md:px-20 bg-gradient-to-b from-wellness-lavender/10 via-white to-cream relative overflow-hidden min-h-screen flex items-center">
        {/* Decorative blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wellness-coral/5 rounded-full blur-[120px] -z-0" />

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">

          <div className="text-center space-y-6">
            <div className="inline-block px-6 py-2 rounded-full border border-wellness-coral/20 bg-white/80 backdrop-blur-sm text-wellness-coral font-sans text-xs tracking-[0.2em] uppercase font-semibold">
              Case Study
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-charcoal leading-tight font-bold">
              Meet the Dataset
            </h2>
            <p className="text-2xl md:text-3xl font-serif italic text-wellness-slate">
              (Hi, it's me)
            </p>
          </div>

          <div className="space-y-8 text-xl md:text-2xl text-charcoal leading-relaxed max-w-3xl mx-auto">
            <p className="font-medium">
            I'm Sara and I'm your typical Gen Z who is addicted to social media. I know this about myself.
            </p>
            <p>
              But I'm also a computer scientist and I've always been curious about the algorithm. Not from a theory perspective, but from a <strong className="font-bold text-charcoal">what is it actually doing to me</strong> perspective. How does it see me? What patterns has it learned? What does my data say that I've never bothered to read?
            </p>
            <p>
              I've been active on Twitter, YouTube, and LinkedIn for nearly a decade. That's a lot of likes, watches, and connections: a digital paper trail I've never examined.
            </p>
            <p className="text-2xl md:text-3xl font-serif font-bold text-charcoal border-l-4 border-wellness-coral pl-6">
              This project is my reflection period. Using myself as a case study.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="bg-white p-8 rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow border border-wellness-lavender/20">
              <div className="text-4xl mb-2">🐦</div>
              <div className="text-3xl font-serif text-charcoal font-bold">26,720</div>
              <div className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold mt-1">tweets liked</div>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow border border-wellness-coral/20">
              <div className="text-4xl mb-2">📺</div>
              <div className="text-3xl font-serif text-charcoal font-bold">4,571</div>
              <div className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold mt-1">videos saved</div>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow border border-wellness-sage/20">
              <div className="text-4xl mb-2">💼</div>
              <div className="text-3xl font-serif text-charcoal font-bold">500+</div>
              <div className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold mt-1">connections</div>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center shadow-lg hover:shadow-xl transition-shadow border border-wellness-sand/20">
              <div className="text-4xl mb-2">📅</div>
              <div className="text-3xl font-serif text-charcoal font-bold">~10 yrs</div>
              <div className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold mt-1">of history</div>
            </div>
          </div>

          <p className="text-center text-2xl md:text-3xl font-serif font-bold text-wellness-coral pt-8">
            What story is your data telling about you?
          </p>

        </div>
      </section>

      {/* Twitter Chapter */}
      <Chapter
        id={SectionType.TWITTER}
        title="My Content Diet"
        subtitle="Exploring 26,720 likes to understand the emotional nutrition I feed my mind daily."
        isActive={activeSection === SectionType.TWITTER}
        colorTheme="lavender"
      >
        <TwitterViz />
      </Chapter>

      {/* YouTube Chapter */}
      <Chapter 
        id={SectionType.YOUTUBE}
        title="My Attention Patterns"
        subtitle="My multitasking library, organized without me realizing it."
        isActive={activeSection === SectionType.YOUTUBE}
        colorTheme="coral"
      >
        <YouTubeViz />
      </Chapter>

      {/* LinkedIn Chapter */}
      <Chapter 
        id={SectionType.LINKEDIN}
        title="My Career Story"
        subtitle="A gentle look at how professional anxiety shapes my connection to others."
        isActive={activeSection === SectionType.LINKEDIN}
        colorTheme="sage"
      >
        <LinkedInViz />
      </Chapter>

      {/* INSIGHTS SECTION */}
      <section id={SectionType.INSIGHTS} className="scroll-section py-24 px-6 md:px-20 bg-white/50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal">What the Data Revealed</h2>
            <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
              What my digital footprint says about how I work, consume, and connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Stat Card 1 */}
             <div className="bg-paper p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-500">
                <div className="text-5xl md:text-6xl font-serif text-wellness-lavender mb-4">10 categories</div>
                <h3 className="text-xl font-bold text-charcoal mb-2">The Algorithm Knows</h3>
                <p className="text-charcoal/60 leading-relaxed">
                  Despite the platform's controversies, my feed is finely tuned: news, memes, VTubers, art. It delivers exactly what I want.
                </p>
             </div>
             {/* Stat Card 2 */}
             <div className="bg-paper p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-500 delay-100">
                <div className="text-5xl md:text-6xl font-serif text-wellness-coral mb-4">4.5k</div>
                <h3 className="text-xl font-bold text-charcoal mb-2">The Multitasking Library</h3>
                <p className="text-charcoal/60 leading-relaxed">
                  In the chaos of 4,500 unsorted videos, the multitasking patterns emerged of different content for different tasks.
                </p>
             </div>
             {/* Stat Card 3 */}
             <div className="bg-paper p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-500 delay-200">
                <div className="text-5xl md:text-6xl font-serif text-wellness-sage mb-4">10 yrs</div>
                <h3 className="text-xl font-bold text-charcoal mb-2">The Human Element</h3>
                <p className="text-charcoal/60 leading-relaxed">
                  Every spike tells a story — Stanford, internship searches, my first job, the layoff. It's fun to see my whole career journey in the data.
                </p>
             </div>
          </div>

          {/* Final Reflection */}
          <div className="max-w-3xl mx-auto text-center space-y-6 pt-12 border-t border-charcoal/10">
            <p className="text-2xl md:text-3xl font-serif text-charcoal leading-relaxed">
              This doesn't change who I am — but it shows how I engage.
            </p>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
              How I move through fandoms. How I navigate the tech industry. How my anxieties and interests leave breadcrumbs in likes, saves, and connections. The data doesn't redefine me. It just makes visible what was always there.
            </p>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <section id={SectionType.METHODOLOGY} className="scroll-section py-24 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wellness-sand/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal">How I Did It</h2>
            <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
              From messy GDPR exports to a journal of insights.
            </p>
          </div>

          <div className="space-y-16">

            {/* 1. The Pipeline Diagram */}
            <div className="relative">
               <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                  {/* Step 1 */}
                  <div className="w-full md:w-1/4 bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm text-center group hover:border-wellness-lavender transition-colors min-h-[200px] flex flex-col justify-center">
                     <div className="w-16 h-16 mx-auto bg-wellness-lavender/20 text-wellness-slate rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📦</div>
                     <h3 className="font-bold text-charcoal">Raw Export</h3>
                     <p className="text-sm text-charcoal/50 mt-2">Exports from Twitter, Google, LinkedIn</p>
                  </div>

                  <div className="hidden md:block text-charcoal/20 text-4xl">→</div>

                  {/* Step 2 */}
                  <div className="w-full md:w-1/4 bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm text-center group hover:border-wellness-coral transition-colors min-h-[200px] flex flex-col justify-center">
                     <div className="w-16 h-16 mx-auto bg-wellness-coral/20 text-wellness-coral rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🐍</div>
                     <h3 className="font-bold text-charcoal">Processing</h3>
                     <p className="text-sm text-charcoal/50 mt-2">Python & Pandas for cleaning</p>
                  </div>

                  <div className="hidden md:block text-charcoal/20 text-4xl">→</div>

                  {/* Step 3 */}
                  <div className="w-full md:w-1/4 bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm text-center group hover:border-wellness-sage transition-colors min-h-[200px] flex flex-col justify-center">
                     <div className="w-16 h-16 mx-auto bg-wellness-sage/20 text-wellness-sage rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
                     <h3 className="font-bold text-charcoal">Analysis</h3>
                     <p className="text-sm text-charcoal/50 mt-2">Claude & HuggingFace</p>
                  </div>

                  <div className="hidden md:block text-charcoal/20 text-4xl">→</div>

                   {/* Step 4 */}
                  <div className="w-full md:w-1/4 bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm text-center group hover:border-wellness-sand transition-colors min-h-[200px] flex flex-col justify-center">
                     <div className="w-16 h-16 mx-auto bg-wellness-sand/20 text-wellness-sand rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">✨</div>
                     <h3 className="font-bold text-charcoal">Journal</h3>
                     <p className="text-sm text-charcoal/50 mt-2">Gemini UI with React & Recharts</p>
                  </div>
               </div>
               {/* Connecting Line (Mobile hidden) */}
               <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-charcoal/5 -z-0"></div>
            </div>

            {/* 2. The Tech Stack */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-charcoal/5">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-8 text-center">The Tech Stack</h3>
              <div className="overflow-hidden rounded-xl border border-charcoal/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-paper text-charcoal/60 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="p-4 font-semibold">Layer</th>
                      <th className="p-4 font-semibold">Tools</th>
                      <th className="p-4 font-semibold">What It Did</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/5 text-charcoal/80">
                    <tr><td className="p-4 font-semibold">Data Extraction</td><td className="p-4">yt-dlp, Google Takeout, LinkedIn Export</td><td className="p-4 text-charcoal/60">Getting raw data from platforms</td></tr>
                    <tr><td className="p-4 font-semibold">Data Wrangling</td><td className="p-4">Python, Pandas</td><td className="p-4 text-charcoal/60">Cleaning, merging, transforming raw exports</td></tr>
                    <tr><td className="p-4 font-semibold">Classification</td><td className="p-4">HuggingFace Transformers</td><td className="p-4 text-charcoal/60">BART-large-MNLI (topics), distilroberta (emotions), twitter-roberta (sentiment)</td></tr>
                    <tr><td className="p-4 font-semibold">Clustering</td><td className="p-4">Scikit-learn</td><td className="p-4 text-charcoal/60">K-means on YouTube titles (TF-IDF)</td></tr>
                    <tr><td className="p-4 font-semibold">Statistics</td><td className="p-4">Scipy, Statsmodels</td><td className="p-4 text-charcoal/60">Chi-square, t-tests, regression, time series</td></tr>
                    <tr><td className="p-4 font-semibold">Visualization</td><td className="p-4">Matplotlib, Seaborn</td><td className="p-4 text-charcoal/60">Generated charts for analysis notebooks</td></tr>
                    <tr><td className="p-4 font-semibold">Presentation</td><td className="p-4">React, Recharts, Gemini</td><td className="p-4 text-charcoal/60">The interactive UI you're viewing</td></tr>
                    <tr><td className="p-4 font-semibold">Orchestration</td><td className="p-4">Claude</td><td className="p-4 text-charcoal/60">Data processing, running models, documentation</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Your Right to Your Data */}
            <div className="flex flex-col md:flex-row gap-12 pt-8">
               <div className="md:w-1/2 space-y-6">
                 <h3 className="text-2xl font-serif font-bold text-charcoal">Your Right to Your Data</h3>
                 <p className="text-charcoal/70 leading-relaxed">
                   This project exists because of privacy legislation. Laws like GDPR (European Union, 2018) and CCPA (California, 2020) weren't designed for self-understanding — they were designed to give users control over their data. But that same right to access creates an opportunity:
                 </p>
                 <p className="text-xl font-serif italic text-wellness-coral">
                   If you can download your data, you can analyze it yourself.
                 </p>
               </div>
               <div className="md:w-1/2 bg-paper rounded-2xl p-8">
                  <h4 className="font-bold text-charcoal mb-4 uppercase tracking-widest text-xs">Where to find it</h4>
                  <ul className="space-y-4 text-sm text-charcoal/80">
                    <li className="flex gap-3">
                      <span className="font-bold min-w-[80px]">Twitter/X</span>
                      <span>Settings → Your Account → Download an archive</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold min-w-[80px]">Google</span>
                      <span>takeout.google.com (YouTube, Search, etc.)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold min-w-[80px]">LinkedIn</span>
                      <span>Settings → Data Privacy → Get a copy of your data</span>
                    </li>
                  </ul>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id={SectionType.TEAM} className="scroll-section py-24 px-6 md:px-20 bg-cream">
         <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal">The Team</h2>
            <p className="text-charcoal/60 text-lg">
               A collaboration between a human student and artificial intelligence.
            </p>
          </div>

          <div className="flex flex-col items-center gap-16">
            {/* The Human Lead */}
            <div className="text-center max-w-lg relative group">
              <div className="absolute inset-0 bg-wellness-lavender/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <img
                 src="Headshots/Sara.png"
                 alt="Sara"
                 className="w-48 h-48 mx-auto rounded-full object-cover shadow-2xl mb-6 border-4 border-white relative z-10"
               />
               <div className="relative z-10">
                 <h3 className="text-3xl font-serif font-bold text-charcoal mb-2">Sara</h3>
                 <p className="text-charcoal/70 italic text-lg leading-relaxed">
                   The chaos coordinator who asked the questions, wrangled the data, and made sense of it all.
                 </p>
               </div>
            </div>

            {/* The AI Collaborators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 w-full">
              
              {/* Poke */}
              <div className="text-center group">
                 <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-white mb-4 transition-transform group-hover:-translate-y-1">
                   <img src="Headshots/Poke.png" alt="Poke" className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-charcoal text-lg">Poke</h4>
                 <p className="text-sm text-charcoal/60 mt-1">Personal email assistant, vibing</p>
              </div>

               {/* ChatGPT */}
              <div className="text-center group">
                 <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-white mb-4 transition-transform group-hover:-translate-y-1">
                   <img src="Headshots/ChatGPT.png" alt="ChatGPT" className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-charcoal text-lg">ChatGPT</h4>
                 <p className="text-sm text-charcoal/60 mt-1">Second-opinion proofreader and portrait artist</p>
              </div>

               {/* Gemini */}
              <div className="text-center group">
                 <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-white mb-4 transition-transform group-hover:-translate-y-1">
                   <img src="Headshots/Gemini.png" alt="Gemini" className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-charcoal text-lg">Gemini</h4>
                 <p className="text-sm text-charcoal/60 mt-1">Creative engine that turns research and results into interactive magic</p>
              </div>

               {/* Claude */}
              <div className="text-center group">
                 <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-white mb-4 transition-transform group-hover:-translate-y-1">
                   <img src="Headshots/Claude.png" alt="Claude" className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-charcoal text-lg">Claude</h4>
                 <p className="text-sm text-charcoal/60 mt-1">Reliable project manager who organizes the chaos and documents everything</p>
              </div>
            </div>
          </div>
         </div>
      </section>

      {/* YOUR TURN SECTION */}
      <section id={SectionType.FRAMEWORK} className="scroll-section relative py-24 px-6 md:px-20 bg-paper">
        <div className="max-w-4xl mx-auto space-y-20">

          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif text-charcoal">Your Turn</h2>
            <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
              Before you dive into exports and APIs, sit with these questions.
            </p>
          </div>

          {/* REFLECTION QUESTIONS */}
          <div className="space-y-12">
            <h3 className="text-2xl font-serif font-bold text-charcoal text-center">Reflection</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              {/* Step 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-wellness-coral flex items-center justify-center text-white font-bold text-sm">1</span>
                  <h3 className="text-xl font-serif font-bold text-charcoal">The Question</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed pl-11">
                  What's been nagging at you about your online habits? Not what sounds interesting — what actually keeps you up at night?
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-wellness-lavender flex items-center justify-center text-white font-bold text-sm">2</span>
                  <h3 className="text-xl font-serif font-bold text-charcoal">The Export</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed pl-11">
                  Where do you spend time you don't talk about? That's probably where the interesting data is.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-wellness-sage flex items-center justify-center text-white font-bold text-sm">3</span>
                  <h3 className="text-xl font-serif font-bold text-charcoal">The Exploration</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed pl-11">
                  What would surprise you? What would you be embarrassed to confirm?
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-wellness-sand flex items-center justify-center text-white font-bold text-sm">4</span>
                  <h3 className="text-xl font-serif font-bold text-charcoal">The Insight</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed pl-11">
                  If the data showed you something uncomfortable, would you change anything? Or just close the tab?
                </p>
              </div>

            </div>
          </div>

          {/* PROMPTS TO GET STARTED */}
          <div className="space-y-12 border-t border-charcoal/10 pt-16">

            <div className="text-center space-y-4">
              <h3 className="text-3xl font-serif font-bold text-charcoal">Prompts to Get Started</h3>
              <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
                Copy these prompts into Claude, ChatGPT, or Gemini to start exploring your own data.
              </p>
            </div>

          {/* Step 1: The Question */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-wellness-coral flex items-center justify-center text-white font-bold text-sm">1</span>
              <h3 className="text-2xl font-serif font-bold text-charcoal">The Question</h3>
            </div>
            <p className="text-charcoal/60 pl-11">Figure out what you actually want to learn.</p>
            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "Help me figure out what I actually want to learn about my digital habits. Ask me questions to help me narrow it down."
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("Help me figure out what I actually want to learn about my digital habits. Ask me questions to help me narrow it down.")}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Step 2: The Export */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-wellness-lavender flex items-center justify-center text-white font-bold text-sm">2</span>
              <h3 className="text-2xl font-serif font-bold text-charcoal">The Export</h3>
            </div>
            <p className="text-charcoal/60 pl-11">Learn how to get your data from any platform.</p>

            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "I want to analyze my data from [Twitter/YouTube/LinkedIn/Instagram/Spotify]. How do I export my data from each of these? What limitations might I run into with each export?"
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("I want to analyze my data from [Twitter/YouTube/LinkedIn/Instagram/Spotify]. How do I export my data from each of these? What limitations might I run into with each export?")}
              >
                Copy
              </button>
            </div>

            <p className="text-charcoal/50 text-sm pl-11 italic">If the export doesn't have what you need:</p>

            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "The export from [platform] doesn't include [thing I wanted]. Are there alternative ways to get this data?"
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("The export from [platform] doesn't include [thing I wanted]. Are there alternative ways to get this data?")}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Step 3: The Exploration */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-wellness-sage flex items-center justify-center text-white font-bold text-sm">3</span>
              <h3 className="text-2xl font-serif font-bold text-charcoal">The Exploration</h3>
            </div>
            <p className="text-charcoal/60 pl-11">Start finding patterns in your data.</p>

            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "I just downloaded my data from [platform]. Help me understand what I'm looking at and suggest questions I could explore."
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("I just downloaded my data from [platform]. Help me understand what I'm looking at and suggest questions I could explore.")}
              >
                Copy
              </button>
            </div>

            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "Categorize this content and show me patterns I might not notice myself."
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("Categorize this content and show me patterns I might not notice myself.")}
              >
                Copy
              </button>
            </div>

            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "Look for time-based patterns in my activity. Are there any spikes that might connect to life events?"
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("Look for time-based patterns in my activity. Are there any spikes that might connect to life events?")}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Step 4: The Insight */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-wellness-sand flex items-center justify-center text-white font-bold text-sm">4</span>
              <h3 className="text-2xl font-serif font-bold text-charcoal">The Insight</h3>
            </div>
            <p className="text-charcoal/60 pl-11">Turn patterns into understanding.</p>

            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "Based on what we found, what does this say about me? Be honest — does it match who I think I am?"
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("Based on what we found, what does this say about me? Be honest — does it match who I think I am?")}
              >
                Copy
              </button>
            </div>

            <div className="bg-white border border-charcoal/10 rounded-xl p-6 ml-11 relative group">
              <p className="text-charcoal/80 font-mono text-sm leading-relaxed">
                "What's one thing I could realistically change about my digital environment based on this?"
              </p>
              <button
                className="absolute top-4 right-4 text-xs text-charcoal/40 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => navigator.clipboard.writeText("What's one thing I could realistically change about my digital environment based on this?")}
              >
                Copy
              </button>
            </div>
          </div>

          </div>

        </div>
      </section>

      {/* REFERENCES SECTION */}
      <section id={SectionType.REFERENCES} className="scroll-section py-24 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="border-b border-charcoal/10 pb-6">
             <h2 className="text-4xl font-serif text-charcoal mb-2">References</h2>
             <p className="text-charcoal/50 text-sm uppercase tracking-widest">Academic & Technical Sources</p>
          </div>

          {/* Data Access Rights */}
          <div className="space-y-6">
             <h3 className="text-xl font-serif font-bold text-charcoal">Data Access Rights</h3>
             <div className="bg-wellness-lavender/10 p-6 rounded-2xl border border-wellness-lavender/20">
               <div className="space-y-4">
                  <div>
                    <p className="font-bold text-charcoal/80">GDPR — General Data Protection Regulation (EU, 2018)</p>
                    <p className="text-sm text-charcoal/70 mt-1">Article 20 establishes the "right to data portability" — users can request their personal data in a structured, machine-readable format.</p>
                    <a href="https://gdpr-info.eu/art-20-gdpr/" target="_blank" rel="noreferrer" className="text-xs text-wellness-sage hover:underline mt-1 inline-block">View Source</a>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal/80">CCPA — California Consumer Privacy Act (2020)</p>
                    <p className="text-sm text-charcoal/70 mt-1">Grants California residents the right to know what personal information is collected and to request a copy of that data.</p>
                    <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noreferrer" className="text-xs text-wellness-sage hover:underline mt-1 inline-block">View Source</a>
                  </div>
               </div>
             </div>
          </div>

          {/* On Screen Time */}
          <div className="space-y-6">
             <h3 className="text-xl font-serif font-bold text-charcoal">On Screen Time Limitations</h3>
             
             <div className="space-y-1">
                <p className="text-charcoal/80 font-serif">Buda, G., et al. (2023). The associations between screen time and mental health in adolescents: A systematic review. <em>BMC Psychology.</em></p>
                <a href="https://link.springer.com/article/10.1186/s40359-023-01166-7" target="_blank" rel="noreferrer" className="text-sm text-wellness-sage hover:underline">View Source</a>
             </div>

             <div className="space-y-1">
                <p className="text-charcoal/80 font-serif">Twenge, J. M., & Campbell, W. K. (2018). Associations between screen time and lower psychological well-being among children and adolescents. <em>Preventive Medicine Reports.</em></p>
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6214874/" target="_blank" rel="noreferrer" className="text-sm text-wellness-sage hover:underline">View Source</a>
             </div>
          </div>

          {/* On Active vs Passive */}
          <div className="space-y-6">
             <h3 className="text-xl font-serif font-bold text-charcoal">On Active vs. Passive Use</h3>
             
             <div className="space-y-1">
                <p className="text-charcoal/80 font-serif">Verduyn, P., Gugushvili, N., & Kross, E. (2021). The impact of social network sites on mental health: Distinguishing active from passive use. <em>World Psychiatry.</em></p>
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7801842/" target="_blank" rel="noreferrer" className="text-sm text-wellness-sage hover:underline">View Source</a>
             </div>

             <div className="space-y-1">
                <p className="text-charcoal/80 font-serif">Meier, A., & Reinecke, L. (2022). Does passive social media use harm well-being? An adversarial review. <em>Journal of Media Psychology.</em></p>
                <a href="https://econtent.hogrefe.com/doi/10.1027/1864-1105/a000358" target="_blank" rel="noreferrer" className="text-sm text-wellness-sage hover:underline">View Source</a>
             </div>
          </div>

          {/* Tech Table */}
          <div className="space-y-6 pt-8">
            <h3 className="text-xl font-serif font-bold text-charcoal">Data Mining Techniques Used</h3>
            <div className="overflow-hidden rounded-2xl border border-charcoal/5">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-paper text-charcoal/60">
                    <th className="p-4 font-normal uppercase tracking-wider border-b border-charcoal/5">Technique</th>
                    <th className="p-4 font-normal uppercase tracking-wider border-b border-charcoal/5">Application</th>
                    <th className="p-4 font-normal uppercase tracking-wider border-b border-charcoal/5">Tool</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-charcoal/80">
                  <tr className="border-b border-charcoal/5 hover:bg-cream transition-colors">
                    <td className="p-4 font-semibold">Data Exploration</td>
                    <td className="p-4">Python, Pandas, Matplotlib</td>
                    <td className="p-4 text-charcoal/60">Extracting, cleaning, and exploring raw data from platforms</td>
                  </tr>
                  <tr className="border-b border-charcoal/5 hover:bg-cream transition-colors">
                    <td className="p-4 font-semibold">Clustering</td>
                    <td className="p-4">Scikit-learn (K-means, TF-IDF)</td>
                    <td className="p-4 text-charcoal/60">Categorizing YouTube videos by content patterns</td>
                  </tr>
                  <tr className="border-b border-charcoal/5 hover:bg-cream transition-colors">
                    <td className="p-4 font-semibold">Classification & NLP</td>
                    <td className="p-4">HuggingFace Transformers</td>
                    <td className="p-4 text-charcoal/60">Sentiment, emotion, and topic classification for Twitter content</td>
                  </tr>
                  <tr className="border-b border-charcoal/5 hover:bg-cream transition-colors">
                    <td className="p-4 font-semibold">Time Series Analysis</td>
                    <td className="p-4">Pandas, Statsmodels</td>
                    <td className="p-4 text-charcoal/60">Analyzing LinkedIn connection growth and life event patterns</td>
                  </tr>
                  <tr className="hover:bg-cream transition-colors">
                    <td className="p-4 font-semibold">Presentation</td>
                    <td className="p-4">React, Recharts, Gemini</td>
                    <td className="p-4 text-charcoal/60">Interactive data visualization and UI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4 pt-4 border-t border-charcoal/5">
            <h3 className="text-lg font-serif font-bold text-charcoal">Tools & Collaborators</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-charcoal/70 text-sm">
               <li>• <strong>Claude</strong> (Anthropic) — Data processing & analysis</li>
               <li>• <strong>Gemini</strong> (Google) — Interactive website/UI design</li>
               <li>• <strong>ChatGPT</strong> (OpenAI) — Visual asset generation</li>
               <li>• <strong>HuggingFace</strong> — NLP model inference</li>
               <li>• <strong>Python</strong> — pandas, scikit-learn, matplotlib</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-charcoal/30 text-xs font-sans border-t border-charcoal/5 bg-paper">
        <p>Project completed December 2025 for CMU 45-851 Data Mining</p>
      </footer>
    </div>
  );
};

export default App;