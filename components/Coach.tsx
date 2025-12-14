import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToCoach } from '../services/geminiService';
import { ChatMessage } from '../types';

export const Coach: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I'm your guide. What part of your digital life are you curious about today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  useEffect(() => {
    if (!process.env.API_KEY) {
      setHasApiKey(false);
      setMessages([{ role: 'model', text: "I need a key to unlock my thoughts. Please configure your API_KEY."}]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !hasApiKey) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToCoach(userMsg.text, messages);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[2.5rem] overflow-hidden flex flex-col h-[600px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative">
      
      {/* Header */}
      <div className="p-6 bg-cream border-b border-gray-50 flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-gradient-to-tr from-wellness-lavender to-white rounded-full flex items-center justify-center shadow-sm mb-2">
            <span className="text-xl">✨</span>
          </div>
          <h3 className="font-serif font-semibold text-charcoal">Reflection Guide</h3>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-cream to-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-6 py-4 text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-wellness-slate text-white rounded-2xl rounded-tr-sm' 
                : 'bg-white text-charcoal border border-gray-100 rounded-2xl rounded-tl-sm'
            } ${msg.isError ? 'bg-red-50 text-red-800' : ''}`}>
               {/* Clean rendering of text */}
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className="mb-2 last:mb-0">
                  {line.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-2 items-center">
              <span className="w-1.5 h-1.5 bg-wellness-sage rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-wellness-sage rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-wellness-sage rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 bg-white z-10">
        <div className="relative shadow-sm rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            className="w-full bg-paper border-none rounded-full py-4 px-6 pr-14 text-charcoal placeholder-charcoal/40 focus:ring-2 focus:ring-wellness-lavender/50 focus:bg-white transition-all font-sans"
            disabled={!hasApiKey || isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading || !hasApiKey}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-wellness-slate hover:text-wellness-coral hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-30"
          >
            ↑
          </button>
        </div>
      </form>
    </div>
  );
};