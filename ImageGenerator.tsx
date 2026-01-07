
import { useState, useEffect } from 'react';
import React from 'react';
import { generateProductVisual, editProductImage } from '../geminiService';

interface ImageGeneratorProps {
  productName: string;
  onImageGenerated?: (url: string) => void;
  initialImageUrl?: string;
  isLoadingExternally?: boolean;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ productName, onImageGenerated, initialImageUrl, isLoadingExternally }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [loading, setLoading] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState('AI Artist က ပုံဖော်နေပါသည်...');

  useEffect(() => {
    setImageUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleGenerate = async () => {
    if (!productName) return;
    setLoading(true);
    setLoadingText('AI Artist က ပုံဖော်နေပါသည်...');
    setError(null);
    try {
      const url = await generateProductVisual(productName);
      setImageUrl(url);
      if (onImageGenerated) onImageGenerated(url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!imageUrl || !editPrompt) return;
    
    setLoading(true);
    setLoadingText('ပုံကို ပြင်ဆင်နေပါသည်...');
    setError(null);
    
    try {
      const url = await editProductImage(imageUrl, editPrompt);
      setImageUrl(url);
      setEditPrompt('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isAnyLoading = loading || isLoadingExternally;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl mt-8 transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-xl flex items-center gap-2">
          <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">🎬</div>
          Cinematic Product Visual
        </h3>
        {imageUrl && !isAnyLoading && (
          <button onClick={handleGenerate} className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Regenerate New</button>
        )}
      </div>

      {!imageUrl && !isAnyLoading && (
        <div className="py-20 text-center bg-slate-50 rounded-[2rem] border-4 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Awaiting Analysis...</p>
        </div>
      )}

      {isAnyLoading && (
        <div className="py-24 text-center animate-pulse bg-slate-50/50 rounded-[2rem]">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="font-black text-slate-900 text-lg">{loadingText}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Studio Quality Rendering</p>
        </div>
      )}

      {imageUrl && !isAnyLoading && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group ring-1 ring-slate-100">
            <img 
              src={imageUrl} 
              className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" 
              alt="AI Product Visual" 
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <h4 className="text-white font-black text-xl drop-shadow-lg">{productName}</h4>
              <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                Movie Style Cinematic Render
              </p>
            </div>
            <div className="absolute bottom-4 right-6 text-[8px] text-white/30 font-bold uppercase tracking-widest pointer-events-none drop-shadow-sm">
              Visualized by ဈေးသည်
            </div>
          </div>

          <div className="flex flex-col gap-3">
             <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }} className="flex gap-2">
                <input 
                  value={editPrompt} 
                  onChange={(e) => setEditPrompt(e.target.value)} 
                  placeholder="ပုံကို စိတ်ကြိုက်ပြင်ဆင်လိုလျှင် ရေးပေးပါ..." 
                  className="flex-1 px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-sm font-bold outline-none focus:bg-white focus:border-indigo-400 transition-all shadow-inner" 
                />
                <button type="submit" className="bg-slate-900 text-white px-8 rounded-2xl font-black text-xs active:scale-95 shadow-lg hover:bg-indigo-700 transition-colors">EDIT</button>
             </form>
          </div>
          
          <p className="text-[10px] text-slate-400 font-bold text-center uppercase tracking-widest opacity-60 italic">
            * ပုံထဲတွင် မြန်မာစာ လုံးဝမပါဝင်စေရန် AI အား တင်းကြပ်စွာ ညွှန်ကြားထားပါသည်။
          </p>
        </div>
      )}

      {error && <div className="mt-4 text-xs text-red-500 font-bold text-center p-4 bg-red-50 rounded-2xl border border-red-100">⚠️ {error}</div>}
    </div>
  );
};

export default ImageGenerator;
