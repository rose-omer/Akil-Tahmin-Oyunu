// app/GameUI.tsx
'use client';

import React from 'react';

// Ortak tipler
interface QuestionNode {
  id: string;
  question: string;
  answers: {
    evet: QuestionNode | null;
    hayır: QuestionNode | null;
  };
}

interface GeminiChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GameUIProps {
  currentQuestionNode: QuestionNode | null;
  questionsAskedCount: number;
  loading: boolean;
  prediction: string | null;
  showPredictionFeedback: boolean;
  isPredictionCorrectState: boolean | null;
  userFinalAnswerInput: string;
  MAX_QUESTIONS_LIMIT: number;
  getRemainingQuestionCount: () => number;
  handleAnswer: (answer: string) => Promise<void>;
  handleUserFeedback: (isCorrect: boolean) => Promise<void>;
  handleSaveFeedback: () => Promise<void>;
  setUserFinalAnswerInput: (value: string) => void;
  resetGame: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  currentQuestionNode,
  questionsAskedCount,
  loading,
  prediction,
  showPredictionFeedback,
  isPredictionCorrectState,
  userFinalAnswerInput,
  MAX_QUESTIONS_LIMIT,
  getRemainingQuestionCount,
  handleAnswer,
  handleUserFeedback,
  handleSaveFeedback,
  setUserFinalAnswerInput,
  resetGame,
}) => {
  return (
    <div
      className="min-h-screen text-gray-200 flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/asdasd.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Resmin üzerindeki hafif karartma ve mor degrade katmanı */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 z-0 opacity-20" style={{ background: 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.15), transparent 50%), radial-gradient(circle at bottom right, rgba(99, 102, 241, 0.15), transparent 50%)' }}></div>

      {/* Ana Oyun Kartı */}
      <div className="bg-gray-900 bg-opacity-85 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-purple-600 relative z-10 transform transition-all duration-500 ease-out scale-95 hover:scale-100 animate-fade-in animate-glowing-border">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-purple-400 drop-shadow-lg transition-colors duration-300">Tahmin Oyunu</h1>
        <p className="text-xl text-center mb-8 font-light text-gray-300 transition-opacity duration-300">
          Aklında bir nesne, kişi veya kavram tut ve evet/hayır diyerek bana yardımcı ol.
        </p>

        {prediction ? (
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-emerald-400 transition-colors duration-300">Tahminim:</h2>
            <p className="text-3xl mb-8 p-6 bg-gray-800 rounded-xl italic font-semibold transform transition-transform duration-300 ease-out hover:scale-105 border border-purple-500 text-gray-100">{prediction}</p>

            {showPredictionFeedback && isPredictionCorrectState === null && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Tahminim doğru muydu?</h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleUserFeedback(true)}
                    disabled={loading}
                    className="py-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xl"
                  >
                    Evet, doğru!
                  </button>
                  <button
                    onClick={() => handleUserFeedback(false)}
                    disabled={loading}
                    className="py-4 px-8 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xl"
                  >
                    Hayır, yanlış!
                  </button>
                </div>
              </div>
            )}

            {isPredictionCorrectState === false && (
              <div className="mt-6 animate-fade-in-up">
                <h3 className="text-xl font-bold mb-4 text-red-300">Aklındaki neydi?</h3>
                <input
                  type="text"
                  value={userFinalAnswerInput}
                  onChange={(e) => setUserFinalAnswerInput(e.target.value)}
                  placeholder="Doğru cevabı buraya yazın..."
                  className="w-full p-4 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4 shadow-inner"
                  disabled={loading}
                />
                <button
                  onClick={handleSaveFeedback}
                  disabled={loading || !userFinalAnswerInput.trim()}
                  className="py-4 px-8 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xl"
                >
                  Cevabı Kaydet
                </button>
              </div>
            )}

            {isPredictionCorrectState !== null && !loading && (
              <button
                onClick={resetGame}
                className="mt-8 py-4 px-8 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-xl"
              >
                Tekrar Oyna
              </button>
            )}
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {/* Kalan Soru bilgisi ve Soru Metni için dış kutu */}
            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-xl shadow-lg mb-6 border border-gray-700">
                <div className="text-xl font-medium mb-4 text-center text-purple-200 transition-opacity duration-300">
                    {getRemainingQuestionCount() > 0 && currentQuestionNode ? (
                        <>
                            Kalan Soru: <span className="font-bold text-2xl">{getRemainingQuestionCount()}</span>
                        </>
                    ) : (
                        <span className="font-bold text-2xl">Sonuç Bekleniyor...</span>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-inner min-h-[120px] flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-xl border border-gray-300">
                    <p className="text-3xl text-center font-semibold text-gray-900">
                        {loading ? (
                            <span className="flex items-center text-purple-600">
                                <svg className="animate-spin h-6 w-6 mr-3 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Düşünüyorum...
                            </span>
                        ) : (
                            currentQuestionNode?.question || 'Oyun Bitti! Tahmin bekleniyor...'
                        )}
                    </p>
                </div>
            </div> 
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('evet')}
                disabled={loading || !currentQuestionNode || questionsAskedCount >= MAX_QUESTIONS_LIMIT}
                className="py-4 px-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xl"
              >
                Evet
              </button>
              <button
                onClick={() => handleAnswer('hayır')}
                disabled={loading || !currentQuestionNode || questionsAskedCount >= MAX_QUESTIONS_LIMIT}
                className="py-4 px-8 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xl"
              >
                Hayır
              </button>
            </div>
          </div>
        )}

        {/* Bu stil bloğunu app/globals.css dosyasına taşımanız şiddetle tavsiye edilir. */}
        <style jsx global>{`
          /* Custom Kaydırma Çubuğu */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #4a5568;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #a78bfa;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #8b5cf6;
          }

          /* Fade-In Animasyonu */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }

          /* Fade-In Up Animasyonu */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          /* Yavaş Nabız/Parlama Animasyonu (Arka plan görseli için) */
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.15; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s infinite ease-in-out;
          }

          /* Yeni: Glowing Border Animasyonu (Ana kart için) */
          @keyframes glowing-border {
            0% { box-shadow: 0 0 5px rgba(167, 139, 250, 0.7), 0 0 15px rgba(99, 102, 241, 0.5); }
            50% { box-shadow: 0 0 15px rgba(167, 139, 250, 0.9), 0 0 40px rgba(99, 102, 241, 0.7); }
            100% { box-shadow: 0 0 5px rgba(167, 139, 250, 0.7), 0 0 15px rgba(99, 102, 241, 0.5); }
          }
          .animate-glowing-border {
            animation: glowing-border 3s infinite alternate ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default GameUI;