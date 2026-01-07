import { GoogleGenAI, Type } from "@google/genai";
import { MarketingPlan } from './types';

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const handleAIError = (error: any, context: string): string => {
  console.error(`${context} Error:`, error);
  const message = error?.message || "";
  if (message.includes("429")) return "ခဏစောင့်ပေးပါ။ AI အလုပ်များနေပါသည်။";
  if (message.includes("403")) return "Access Denied ဖြစ်နေပါသည်။";
  if (message.includes("safety")) return "မသင့်တော်သော အကြောင်းအရာပါဝင်နေသဖြင့် AI မှ ငြင်းဆိုလိုက်ပါသည်။";
  return `Error: ${message || "မမျှော်လင့်ထားသော အမှားတစ်ခု ဖြစ်သွားပါသည်။"}`;
};

export const generateMarketingContent = async (input: { 
  link?: string; 
  image?: { data: string; mimeType: string };
  price?: string;
  phone?: string;
}): Promise<MarketingPlan> => {
  const ai = getAI();
  
  const productIdentifier = input.link ? `this link: "${input.link}"` : `this image`;
  const prompt = `
    Analyze ${productIdentifier} and create a HIGH-ENERGY, VIRAL Facebook sales post for the Myanmar market.
    Price: ${input.price || 'Contact for Price'}
    Phone: ${input.phone || 'Check bio to order'}

    CRITICAL RULES:
    1. Language: Use dynamic, trendy, and natural Burmese. No robotic translation.
    2. Vibe: Extremely exciting and persuasive.
    3. Output: Follow the schema strictly.
  `;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: { 
        parts: [
          { text: prompt },
          ...(input.image ? [{ inlineData: { data: input.image.data, mimeType: input.image.mimeType } }] : [])
        ] 
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            postCaption: { type: Type.STRING, description: "Write an incredibly exciting, urgent, and high-converting Burmese caption! Use 'Limited Stock', 'Hurry Up', 'Shocking Deal' vibes. Use trendy emojis. Focus on selling emotions." },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            postingTimeSuggestion: { type: Type.STRING },
            strategyAdvice: { type: Type.STRING },
            videoScript: { type: Type.STRING }
          }
        }
      }
    });

    const text = result.text;
    if (!text) throw new Error("AI က စာသားများ ဖန်တီး၍ မရဖြစ်နေပါသည်။");
    
    return JSON.parse(text) as MarketingPlan;
  } catch (error: any) {
    throw new Error(handleAIError(error, "Marketing Generation"));
  }
};

export const generateProductVisual = async (productName: string): Promise<string> => {
  const ai = getAI();
  try {
    // Default to Cinematic Studio style
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `A ultra-high-end professional cinematic studio product shot of: '${productName}'. 
        STYLING: Cinematic color grading, moody shadows, teal and orange highlights, 8k resolution, photorealistic. 
        BACKGROUND: Clean professional minimalist studio background with soft rim lighting.
        CRITICAL: DO NOT INCLUDE ANY TEXT, NUMBERS, LETTERS, OR CHARACTERS. NO BURMESE TEXT. NO GRAPHICS. 
        Focus purely on the visual aesthetic and product details with movie-quality textures.` }] 
      }
    });
    
    const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imgPart?.inlineData) return `data:image/png;base64,${imgPart.inlineData.data}`;
    throw new Error("ဓာတ်ပုံဖန်တီးမှု မအောင်မြင်ပါ။");
  } catch (error: any) {
    throw new Error(handleAIError(error, "Visual Creation"));
  }
};

export const generateLogo = async (brandName: string, style: string = 'modern'): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `A professional, ${style} logo design for a brand named '${brandName}'. 
        Minimalist, vector style, flat design, clean lines. 
        High resolution, premium branding, solid background. 
        The logo should be centered. Focus on a strong visual icon. 
        STRICTLY NO BURMESE TEXT OR ROBOTIC BURMESE LETTERS.` }] 
      }
    });
    
    const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imgPart?.inlineData) return `data:image/png;base64,${imgPart.inlineData.data}`;
    throw new Error("Logo ဖန်တီးမှု မအောင်မြင်ပါ။");
  } catch (error: any) {
    throw new Error(handleAIError(error, "Logo Creation"));
  }
};

export const editProductImage = async (base64Image: string, editPrompt: string): Promise<string> => {
  const ai = getAI();
  const data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data, mimeType: 'image/png' } }, 
          { text: `TASK: Edit this image: "${editPrompt}". 
          Preserve cinematic lighting and colors. 
          STRICTLY NO TEXT OR CHARACTERS.` }
        ]
      }
    });
    const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imgPart?.inlineData) return `data:image/png;base64,${imgPart.inlineData.data}`;
    throw new Error("ပုံပြင်ဆင်မှု မအောင်မြင်ပါ။");
  } catch (error: any) {
    throw new Error(handleAIError(error, "Image Editing"));
  }
};