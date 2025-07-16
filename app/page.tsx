// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { QUESTION_TREE, QuestionNode } from './data/questionTree'; // QUESTION_TREE ve QuestionNode'u doğru yoldan import edin
import GameUI from './GameUI'; // Veya '../components/GameUI' eğer o klasöre taşıdıysanız

// Ortak arayüzleri burada tutmak veya ayrı bir 'types.ts' dosyasına taşımak iyi bir pratiktir
// QuestionNode arayüzünü de buraya veya types.ts'ye eklemeyi unutmayın
interface GeminiChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function Game() {
  const [currentQuestionNode, setCurrentQuestionNode] = useState<QuestionNode | null>(null);
  const [questionsAskedCount, setQuestionsAskedCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [gameHistoryForGemini, setGameHistoryForGemini] = useState<GeminiChatMessage[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [allAskedQuestions, setAllAskedQuestions] = useState<string[]>([]);

  const [showPredictionFeedback, setShowPredictionFeedback] = useState<boolean>(false);
  const [userFinalAnswerInput, setUserFinalAnswerInput] = useState<string>('');
  const [isPredictionCorrectState, setIsPredictionCorrectState] = useState<boolean | null>(null);

  const MAX_QUESTIONS_LIMIT = 30; // Sabit değer page.tsx'te kalır ve prop olarak gönderilir

  useEffect(() => {
    setCurrentQuestionNode(QUESTION_TREE);
    setGameHistoryForGemini([
      { role: 'user', parts: [{ text: 'Merhaba! Aklımda bir nesne tuttum. Bana sorular sorarak tahmin etmeye çalışabilirsin.' }] }
    ]);
  }, []);

  const getRemainingQuestionCount = () => {
    return MAX_QUESTIONS_LIMIT - questionsAskedCount;
  };

  const handleAnswer = async (answer: string) => {
    if (prediction || questionsAskedCount >= MAX_QUESTIONS_LIMIT) {
      return;
    }

    setLoading(true);

    const currentQuestionText = currentQuestionNode?.question;
    if (!currentQuestionText) {
      setLoading(false);
      return;
    }

    setAllAskedQuestions(prev => [...prev, currentQuestionText]);
    setQuestionsAskedCount(prev => prev + 1);

    let newHistory: GeminiChatMessage[] = [...gameHistoryForGemini];
    newHistory.push({ role: 'model', parts: [{ text: currentQuestionText }] });
    newHistory.push({ role: 'user', parts: [{ text: answer }] });

    setGameHistoryForGemini(newHistory);

    let nextNode: QuestionNode | null = null;
    if (answer === 'evet') {
      nextNode = currentQuestionNode.answers.evet;
    } else if (answer === 'hayır') {
      nextNode = currentQuestionNode.answers.hayır;
    }

    setCurrentQuestionNode(nextNode);
    const shouldMakePrediction = !nextNode || (questionsAskedCount + 1 >= MAX_QUESTIONS_LIMIT);
    if (shouldMakePrediction) {
      await makePrediction(newHistory);
    }

    setLoading(false);
  };

  const makePrediction = async (finalHistory: GeminiChatMessage[]) => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullHistory: finalHistory }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Tahmin API Hatası: ${data.details || 'Bilinmeyen Hata'}`);
      }

      setPrediction(data.prediction);
      setShowPredictionFeedback(true);
    } catch (error: any) {
      console.error('[Game/Client] Tahmin yapılırken hata oluştu:', error);
      setPrediction(`Tahmin yapılırken bir hata oluştu: ${error.message || 'Lütfen tekrar deneyin.'}`);
      setShowPredictionFeedback(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUserFeedback = async (isCorrect: boolean) => {
    setIsPredictionCorrectState(isCorrect);
    if (isCorrect) {
      await saveGame(gameHistoryForGemini, prediction!, allAskedQuestions, true, null);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleSaveFeedback = async () => {
    if (!userFinalAnswerInput.trim()) {
      alert('Lütfen aklınızdaki doğru cevabı girin.');
      return;
    }
    setLoading(true);
    await saveGame(gameHistoryForGemini, prediction!, allAskedQuestions, false, userFinalAnswerInput.trim());
    setLoading(false);
  };

  const saveGame = async (
    history: GeminiChatMessage[],
    finalPrediction: string,
    askedQuestions: string[],
    isCorrect: boolean,
    userAnswer: string | null
  ) => {
    try {
      const filteredHistory = history.filter((msg, index) => {
        const text = msg.parts[0].text;
        return !text.includes('Merhaba! Aklımda bir nesne tuttum. Bana sorular sorarak tahmin etmeye çalışabilirsin.');
      });

      const response = await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameHistory: filteredHistory,
          prediction: finalPrediction,
          staticQuestions: askedQuestions,
          isPredictionCorrect: isCorrect,
          userCorrectAnswer: userAnswer,
        }),
      });

      if (response.ok) {
        console.log('[Game/Client] Oyun başarıyla kaydedildi.');
      } else {
        const errorData = await response.json();
        console.error('[Game/Client] Oyunu kaydederken API hatası:', errorData.message);
      }
    } catch (error) {
      console.error('[Game/Client] Oyunu kaydederken genel hata oluştu:', error);
    }
  };

  const resetGame = () => {
    setCurrentQuestionNode(QUESTION_TREE);
    setGameHistoryForGemini([
      { role: 'user', parts: [{ text: 'Merhaba! Aklımda bir nesne tuttum. Bana sorular sorarak tahmin etmeye çalışabilirsin.' }] }
    ]);
    setQuestionsAskedCount(0);
    setPrediction(null);
    setAllAskedQuestions([]);
    setShowPredictionFeedback(false);
    setUserFinalAnswerInput('');
    setIsPredictionCorrectState(null);
  };

  return (
    <GameUI
      currentQuestionNode={currentQuestionNode}
      questionsAskedCount={questionsAskedCount}
      loading={loading}
      prediction={prediction}
      showPredictionFeedback={showPredictionFeedback}
      isPredictionCorrectState={isPredictionCorrectState}
      userFinalAnswerInput={userFinalAnswerInput}
      MAX_QUESTIONS_LIMIT={MAX_QUESTIONS_LIMIT}
      getRemainingQuestionCount={getRemainingQuestionCount}
      handleAnswer={handleAnswer}
      handleUserFeedback={handleUserFeedback}
      handleSaveFeedback={handleSaveFeedback}
      setUserFinalAnswerInput={setUserFinalAnswerInput}
      resetGame={resetGame}
    />
  );
}