import React, { useState } from 'react';
import { MarketingPlan } from '../types';

const ContentDisplay: React.FC<{ plan: MarketingPlan }> = ({ plan }) => {
  const [copied, setCopied] = useState(false);

  // Safety checks to prevent "Black Screen" crash if API misses a field
  const safeCaption = plan?.postCaption || "Caption generating...";
  const safeHashtags = Array.isArray(plan?.hashtags) ? plan.hashtags : [];
  const safeProductName = plan?.productName || "Product";
  const safeStrategy = plan?.strategyAdvice || "Analyzing strategy...";
  const safeTime = plan?.postingTimeSuggestion || "Anytime";
  const safeScript = plan?.videoScript || "Generating script...";

  const fullPost = `${safeCaption}\n\n${safeHashtags.join(' ')}`;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="mb-8 px-2 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
            <span className="text-indigo-600">★</span> {safeProductName}
          </h2>
          <p className="text-indigo-600 font-black text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            VIRAL CONTENT GENERATED
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border-t-8 border-slate-900 overflow-hidden relative">
        <div className="bg-slate-900 p-6 flex justify-between items-center">
          <h3 className="text-white font-black flex items-center gap-2 text-sm tracking-widest">
            <div className="bg-indigo-500 w-2 h-2 rounded-full"></div>
            HIGH-ENERGY FB POST
          </h3>
          <button 
            onClick={() => copy(fullPost)} 
            className={`text-[10px] font-black ${copied ? 'bg-green-600 border-green-800' : 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-900'} text-white px-6 py-3 rounded-2xl transition-all shadow-lg active:scale-95 border-b-4 flex items-center gap-2`}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                COPIED!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                COPY FB POST
              </>
            )}
          </button>
        </div>
        <div className="p-8 bg-gradient-to-br from-white via-white to-indigo-50/20">
          <div className="relative group bg-slate-50 border-l-4 border-indigo-600 p-6 rounded-2xl mb-8">
            <button 
              onClick={() => copy(safeCaption)}
              className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
              title="Copy caption only"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
            <p className="whitespace-pre-line text-slate-800 font-bold leading-relaxed text-lg pr-8">
              {safeCaption}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {safeHashtags.map((h, i) => (
              <span key={i} className="text-[10px] font-black text-white bg-slate-900 px-4 py-2 rounded-xl">
                {h}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">🔥</div>
                <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest block mb-3">Target Psychology</span>
                <p className="text-base font-black leading-snug">{safeStrategy}</p>
             </div>
             <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">⏰</div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Best Time to Post</span>
                <p className="text-base font-black leading-snug">{safeTime}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full -mr-24 -mt-24"></div>
        <div className="flex justify-between items-center mb-8">
          <h4 className="font-black text-slate-900 flex items-center gap-4 text-xl">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            Viral Video Hook & Script
          </h4>
          <button 
            onClick={() => copy(safeScript)}
            className="p-2 bg-slate-100 hover:bg-indigo-100 rounded-xl transition-all text-slate-600"
            title="Copy video script"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-inner">
          <p className="whitespace-pre-line text-indigo-100 text-sm font-mono leading-relaxed font-bold italic">
            {safeScript}
          </p>
        </div>
        <p className="mt-4 text-[10px] text-slate-400 font-bold text-center uppercase tracking-widest">Great for TikTok/Reels/FB Stories</p>
      </div>
    </div>
  );
};

export default ContentDisplay;