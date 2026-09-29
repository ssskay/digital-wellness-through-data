import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToCoach, loadKey, saveKey } from '../services/geminiService';
import { simulatedReply } from '../services/simulatedCoach';
import { ChatMessage } from '../types';

type Mode = 'demo' | 'live';

const GREETING: ChatMessage = { role: 'model', text: "Hello. I'm your guide. What part of your digital life are you curious about today?" };
const STARTERS = ['My Twitter likes', 'My YouTube saves', 'My Spotify history', 'How do I export my data?'];

export const Coach: React.FC = () => {
  const initialKey = loadKey();
  const [mode, setMode] = useState<Mode>(initialKey ? 'live' : 'demo');
  const [apiKey, setApiKey] = useState<string>(initialKey);
  const [keyDraft, setKeyDraft] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll the chat pane only (not the whole page) when a message lands.
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isLoading]);

  const needsKey = mode === 'live' && !apiKey;

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    setMessages([GREETING]);
  };

  const submitKey = (e: React.FormEvent) => {
    e.preventDefault();
    const k = keyDraft.trim();
    if (!k) return;
    saveKey(k);
    setApiKey(k);
    setKeyDraft('');
  };

  const forgetKey = () => {
    saveKey('');
    setApiKey('');
    setMessages([GREETING]);
  };

  const send = async (text: string) => {
    if (!text.trim() || isLoading || needsKey) return;
    const userMsg: ChatMessage = { role: 'user', text };
    // Drop failed turns (a user message answered by an error) so the live
    // history always alternates user/model the way the API expects.
    const history = messages.filter((m, i) => !m.isError && !(m.role === 'user' && messages[i + 1]?.isError));
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const reply = mode === 'demo'
        ? await simulatedReply(text)
        : await sendMessageToCoach(text, history, apiKey);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (err) {
      console.error('Reflection Guide error:', err);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "That didn't go through. Check that your key is right (and has Gemini API access), or switch to Demo.",
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const tab = (m: Mode, label: string) => (
    <button
      type="button"
      onClick={() => switchMode(m)}
      aria-pressed={mode === m}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        mode === m ? 'bg-wellness-slate text-white' : 'text-charcoal/60 hover:text-charcoal'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[2.5rem] overflow-hidden flex flex-col h-[620px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative">

      {/* Header */}
      <div className="p-5 bg-cream border-b border-gray-50 flex flex-col items-center gap-3 relative z-10">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-gradient-to-tr from-wellness-lavender to-white rounded-full flex items-center justify-center shadow-sm mb-2">
            <span className="text-xl">✨</span>
          </div>
          <h3 className="font-serif font-semibold text-charcoal">Reflection Guide</h3>
        </div>
        <div className="flex gap-1 bg-white rounded-full p-1 border border-gray-100" role="group" aria-label="Guide mode">
          {tab('demo', 'Demo')}
          {tab('live', 'Use my Gemini key')}
        </div>
        <p className="text-[11px] text-charcoal/50 text-center max-w-sm leading-snug">
          {mode === 'demo'
            ? 'Demo mode: scripted replies, no AI call, nothing leaves your browser.'
            : apiKey
              ? <>Live with your key. It stays in this tab and goes only to Google. <button type="button" onClick={forgetKey} className="underline hover:text-charcoal">Forget key</button></>
              : 'Your key stays in this tab (cleared when you close it) and is sent only to Google’s Gemini API.'}
        </p>
      </div>

      {needsKey ? (
        /* Bring-your-own-key form */
        <form onSubmit={submitKey} className="flex-1 flex flex-col justify-center gap-4 p-8 bg-gradient-to-b from-cream to-white">
          <label htmlFor="dwtd-key" className="text-sm text-charcoal/70 text-center">
            Paste a Gemini API key to chat with the real guide.
          </label>
          <input
            id="dwtd-key"
            type="password"
            autoComplete="off"
            spellCheck={false}
            value={keyDraft}
            onChange={e => setKeyDraft(e.target.value)}
            placeholder="AIza..."
            className="w-full bg-paper border-none rounded-full py-3 px-5 text-charcoal placeholder-charcoal/40 focus:ring-2 focus:ring-wellness-lavender/50 font-mono text-sm"
          />
          <button type="submit" disabled={!keyDraft.trim()} className="self-center px-6 py-2 rounded-full bg-wellness-slate text-white text-sm font-semibold disabled:opacity-30">
            Start
          </button>
          <p className="text-xs text-charcoal/50 text-center">
            No key? Get a free one at{' '}
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="underline">aistudio.google.com/apikey</a>
            {' '}or try the <button type="button" onClick={() => switchMode('demo')} className="underline">Demo</button>.
          </p>
        </form>
      ) : (
        <>
          {/* Chat Area */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-cream to-white" aria-live="polite">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-wellness-slate text-white rounded-2xl rounded-tr-sm'
                    : 'bg-white text-charcoal border border-gray-100 rounded-2xl rounded-tl-sm'
                } ${msg.isError ? 'bg-red-50 text-red-800' : ''}`}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">{line.replace(/\*\*/g, '')}</p>
                  ))}
                </div>
              </div>
            ))}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {STARTERS.map(s => (
                  <button key={s} type="button" onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-charcoal/70 hover:border-wellness-lavender hover:text-charcoal bg-white">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-2 items-center">
                  <span className="w-1.5 h-1.5 bg-wellness-sage rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-wellness-sage rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-wellness-sage rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="p-6 bg-white z-10">
            <div className="relative shadow-sm rounded-full">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question about your data..."
                aria-label="Message the Reflection Guide"
                className="w-full bg-paper border-none rounded-full py-4 px-6 pr-14 text-charcoal placeholder-charcoal/40 focus:ring-2 focus:ring-wellness-lavender/50 focus:bg-white transition-all font-sans"
                disabled={isLoading}
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-wellness-slate hover:text-wellness-coral hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-30"
              >
                ↑
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
