'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('availability');
  const [customMsg, setCustomMsg] = useState('');

  const QUICK_PROMPTS = [
    {
      id: 'availability',
      title: 'Check Date Availability',
      desc: 'Verify if your target 2026/2027 date is open on our master calendar',
      icon: <Calendar className="w-4 h-4 text-emerald-400" />,
      text: 'Hello Silver Sky Events! I would like to check date availability on your production calendar for my upcoming event in 2026/2027.',
    },
    {
      id: 'site_visit',
      title: 'Book a Free Site Inspection',
      desc: 'Our lead rigger & decor stylist will inspect your venue grounds',
      icon: <MapPin className="w-4 h-4 text-amber-400" />,
      text: 'Hello Silver Sky Events! I would like to schedule an on-site technical inspection for our proposed venue grounds.',
    },
    {
      id: 'catalog',
      title: 'Receive Luxury Catalog & Rate Card',
      desc: 'Get our German clear dome & styling catalog PDF via WhatsApp',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      text: 'Hello Silver Sky Events! Please send me your complete 2026 Luxury Event Decor & Marquee Infrastructure Catalog PDF.',
    },
    {
      id: 'lead_director',
      title: 'Direct Chat with Senior Planner',
      desc: 'Consult directly with our executive event director',
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      text: 'Hello Silver Sky Events! I have a high-value event inquiry and would like to speak directly with a Senior Event Director.',
    },
  ];

  const handleLaunchChat = (promptText?: string) => {
    const message = customMsg || promptText || QUICK_PROMPTS[0].text;
    const url = `https://wa.me/254700123456?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Pop-up Quick Concierge Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl glass-sapphire border border-emerald-500/40 shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#060e28] to-[#0f276c] border-b border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-bold text-white">
                  Silver Sky VIP Concierge
                </h4>
                <div className="text-[10px] text-emerald-300 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online Now • Replies in &lt; 3 mins</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts List */}
          <div className="p-4 space-y-2 bg-[#030712]/95">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
              Select Fast WhatsApp Routing:
            </p>

            {QUICK_PROMPTS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLaunchChat(item.text)}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-left transition-all flex items-start gap-2.5 group cursor-pointer"
              >
                <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-emerald-900/50 shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-300 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</div>
                </div>
              </button>
            ))}

            {/* Custom Input */}
            <div className="pt-2">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Or type a custom question..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLaunchChat()}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  onClick={() => handleLaunchChat()}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-[#060e28] border-t border-slate-800 text-center text-[10px] text-slate-400">
            Official WhatsApp Business API • Kenya (+254 700 123 456)
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-emerald-900/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/40"
        aria-label="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline font-semibold">Chat with Concierge</span>
        <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 text-[10px] text-emerald-200">
          Fast
        </span>
      </button>
    </div>
  );
}
