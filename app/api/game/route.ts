// app/api/game/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
  prisma = global.prismaGlobal;
}

export async function POST(req: Request) {
  try {
    const { gameHistory, prediction, staticQuestions, isPredictionCorrect, userCorrectAnswer } = await req.json();
    if (!gameHistory || !Array.isArray(gameHistory) || !prediction || !staticQuestions || !Array.isArray(staticQuestions)) {
      return NextResponse.json({ message: "Geçersiz oyun verileri.", details: "gameHistory, prediction veya staticQuestions eksik/geçersiz." }, { status: 400 });
    }

    const questionsToSave = [];
    let questionIndexCounter = 0;
    for (let i = 0; i < gameHistory.length; i++) {
        const message = gameHistory[i];
        if (message.role === 'user' && questionIndexCounter < staticQuestions.length) {
            const correspondingQuestion = staticQuestions[questionIndexCounter];
            const userAnswer = message.parts[0].text; 

            if (correspondingQuestion) {
                questionsToSave.push({
                    question: correspondingQuestion,
                    answer: userAnswer,
                    questionIndex: questionIndexCounter, 
                });
            }
            questionIndexCounter++; 
        }
    }

    const newGame = await prisma.game.create({
      data: {
        prediction: prediction, 
        isPredictionCorrect: isPredictionCorrect, 
        userCorrectAnswer: userCorrectAnswer,     
        gameQuestions: {
          create: questionsToSave.map(q => ({ 
            question: q.question,
            answer: q.answer,
            questionIndex: q.questionIndex,
          })),
        },
      },
      include: {
        gameQuestions: true, 
      },
    });

    console.log(`[API/Game] Oyun başarıyla kaydedildi: ID - ${newGame.id}`);
    return NextResponse.json({ message: "Oyun başarıyla kaydedildi.", game: newGame }, { status: 200 });

  } catch (error: any) {
    console.error(`[API/Game] Oyunu kaydederken hata oluştu:`, error);
    return NextResponse.json(
      {
        message: `Oyunu kaydederken bir hata oluştu: ${error.message || 'Bilinmeyen Hata'}`,
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
