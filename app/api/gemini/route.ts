// app/api/gemini/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { fullHistory } = await req.json();

   //  BURAYA EKLEDİK: İstemciden gelen fullHistory'yi konsola yazdır
   // console.log('APIye gelen fullHistory (SERVER):', JSON.stringify(fullHistory, null, 2));

    if (!fullHistory || !Array.isArray(fullHistory) || fullHistory.length === 0) {
      return NextResponse.json({ message: "Sohbet geçmişi boş veya geçersiz.", details: "Geçersiz fullHistory" }, { status: 400 });
    }

    const historyForChat = fullHistory;


    if (historyForChat[0].role !== 'user') {
      return NextResponse.json({ message: "Sohbet geçmişi 'user' rolüyle başlamalıdır.", details: "İlk mesaj rolü 'model'" }, { status: 400 });
    }

  
    const chat = model.startChat({
      history: historyForChat, 
      generationConfig: {
        maxOutputTokens: 200,
      },
    });
    const predictionPrompt =
      `Yukarıdaki sohbet geçmişine ve senin sorduğun 'evet/hayır' cevaplı yanıtlara dayanarak, aklımdaki şeyi tek bir kelime veya en fazla üç kelimeyle net ve kısa olarak TAHMİN ET. Asla özelliklerini sıralama, sadece tahminini söyle. Lütfen tahminini başka hiçbir açıklama veya ön ek olmadan, doğrudan metin olarak ver. Örneğin: "Elma" veya "Büyük Kırmızı Araba".`
;
    console.log('sendMessage\'a gönderilen predictionPrompt:', predictionPrompt);

    const result = await chat.sendMessage(predictionPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ prediction: text });

  } catch (error: any) {
    console.error(`[API/Gemini] İstek İşlenirken Hata:`, error);
    return NextResponse.json(
      {
        message: `Gemini API Hatası: ${error.message || 'Bilinmeyen Hata'}`,
        details: error.toString()
      },
      { status: 500 }
    );
  }
}