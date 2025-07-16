// components/GameUI.tsx
import React from 'react';

// Props'ların tipini tanımlıyoruz
interface GameUIProps {
  currentQuestionIndex: number;
  loading: boolean;
  prediction: string | null;
  STATIC_QUESTIONS: string[];
  MAX_QUESTIONS: number;
  handleAnswer: (answer: string) => Promise<void>;
  resetGame: () => void;
}

// GameUI fonksiyonel bileşeni
const GameUI: React.FC<GameUIProps> = ({
  currentQuestionIndex,
  loading,
  prediction,
  STATIC_QUESTIONS,
  MAX_QUESTIONS,
  handleAnswer,
  resetGame,
}) => {
  return (
    // Ana kapsayıcıya hafif bir giriş animasyonu ekledik
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-lg w-full border border-purple-700 transform transition-all duration-500 ease-out scale-95 hover:scale-100">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-purple-300 transition-colors duration-300">30 Soru Tahmin Oyunu</h1>
        <p className="text-lg text-center mb-8 font-light text-gray-300 transition-opacity duration-300">
          Aklında bir nesne, kişi veya kavram tut ve evet/hayır/biraz diyerek bana yardımcı ol.
        </p>

        {prediction ? (
          // Tahmin yapıldığında gösterilecek kısım
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-green-400 transition-colors duration-300">Tahminim:</h2>
            <p className="text-2xl mb-8 p-4 bg-gray-700 rounded-lg italic transform transition-transform duration-300 ease-out hover:scale-105">{prediction}</p>
            <button
              onClick={resetGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Tekrar Oyna
            </button>
          </div>
        ) : (
          // Oyun devam ederken gösterilecek kısım
          <div className="animate-fade-in-up">
            <div className="text-xl font-medium mb-4 text-center text-purple-200 transition-opacity duration-300">
              {/* Kalan soru sayısı gösterimi. currentQuestionIndex, MAX_QUESTIONS'a eşitse "Sonuç Bekleniyor..." gösterilir. */}
              {currentQuestionIndex < MAX_QUESTIONS ? (
                <>
                  Kalan Soru: <span className="font-bold text-2xl">{MAX_QUESTIONS - currentQuestionIndex}</span>
                </>
              ) : (
                <span className="font-bold text-2xl">Sonuç Bekleniyor...</span> // Tüm sorular bittiğinde gösterilecek mesaj
              )}
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-inner mb-6 min-h-[100px] flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg">
              <p className="text-2xl text-center font-semibold text-gray-100">
                {loading ? (
                  // Yükleme durumunda animasyonlu metin
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Düşünüyorum...
                  </span>
                ) : (
                  // Aktif soru metni
                  STATIC_QUESTIONS[currentQuestionIndex]
                )}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Cevap butonları */}
              <button
                onClick={() => handleAnswer('evet')}
                disabled={loading || currentQuestionIndex >= MAX_QUESTIONS} // Yükleme sırasında veya tüm sorular sorulduysa devre dışı bırak
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Evet
              </button>
              <button
                onClick={() => handleAnswer('hayır')}
                disabled={loading || currentQuestionIndex >= MAX_QUESTIONS} // Yükleme sırasında veya tüm sorular sorulduysa devre dışı bırak
                className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Hayır
              </button>
              <button
                onClick={() => handleAnswer('biraz')}
                disabled={loading || currentQuestionIndex >= MAX_QUESTIONS} // Yükleme sırasında veya tüm sorular sorulduysa devre dışı bırak
                className="py-3 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Biraz
              </button>
            </div>
          </div>
        )}

        {/* Özel kaydırma çubuğu stilleri */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #4a5568; /* Tailwind gray-700 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #a78bfa; /* Tailwind purple-400 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #8b5cf6; /* Tailwind purple-500 */
          }

          /* Yeni animasyonlar */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default GameUI;
