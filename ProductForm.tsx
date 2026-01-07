
import React, { useState, useRef } from 'react';

interface ProductFormProps {
  onSubmit: (data: { link?: string; image?: { data: string; mimeType: string }; price?: string; phone?: string; }) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading }) => {
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!link && !selectedImage) return;
    onSubmit({ link, image: selectedImage ? { data: selectedImage.data, mimeType: selectedImage.mimeType } : undefined, price, phone });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({ data: (reader.result as string).split(',')[1], mimeType: file.type, name: file.name });
        setLink('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white p-2.5 rounded-2xl text-[#1877F2] border-2 border-orange-500 shadow-lg">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h2 className="text-2xl font-black text-white drop-shadow-md">Sales Lab</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-black text-orange-100 uppercase tracking-[0.2em] ml-1 mb-2 block">
            Product Link or Photo
          </label>
          {selectedImage ? (
            <div className="p-4 bg-white rounded-2xl flex items-center gap-4 border-2 border-orange-400 shadow-xl animate-in zoom-in-95">
              <img src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} className="w-12 h-12 rounded-xl object-cover border border-slate-200" alt="Preview" />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-900 font-black truncate block">{selectedImage.name}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Image Ready</span>
              </div>
              <button type="button" onClick={() => setSelectedImage(null)} className="bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center transition-all">✕</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                placeholder="အရောင်းလင့်ခ် (Amazon/Web/FB) ထည့်ပါ..." 
                className="flex-1 px-5 py-4 rounded-2xl border-2 border-orange-500 bg-white text-sm font-black text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all shadow-xl" 
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()} 
                className="w-16 bg-white border-2 border-orange-500 rounded-2xl text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-all shadow-xl text-2xl active:scale-95"
              >
                📷
              </button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept="image/*" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-orange-100 uppercase tracking-widest ml-1 block">Pricing</label>
            <input 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="ဥပမာ- ၅၅၀၀ ကျပ်" 
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-orange-500 bg-white text-sm font-black text-slate-900 placeholder:text-slate-400 outline-none shadow-lg focus:ring-4 focus:ring-orange-500/20 transition-all" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-orange-100 uppercase tracking-widest ml-1 block">Phone</label>
            <input 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="၀၉-........" 
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-orange-500 bg-white text-sm font-black text-slate-900 placeholder:text-slate-400 outline-none shadow-lg focus:ring-4 focus:ring-orange-500/20 transition-all" 
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading} 
        className="group relative w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-[1.5rem] shadow-2xl transition-all border-b-8 border-orange-800 uppercase text-sm tracking-widest active:scale-[0.97] active:border-b-0 disabled:bg-slate-400 disabled:border-slate-500 overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ဖန်တီးနေသည်...
            </>
          ) : 'Generate Sales Content'}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
      
      <p className="text-[10px] text-center text-orange-200 font-bold uppercase tracking-tighter opacity-80">
        AI will craft a high-converting post and visuals.
      </p>
    </form>
  );
};

export default ProductForm;
