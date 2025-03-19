import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ message: "ユーザーIDが必要です" }, { status: 400 });
    }

    // ユーザーIDに関連するすべてのカードデータを取得
    const userCards = await prisma.userCard.findMany({
      where: {
        userId: userId
      },
      select: {
        cardId: true,
        heartQuantity: true,
        bagQuantity: true
      }
    });

    return NextResponse.json(userCards);
  } catch (error) {
    console.error("ユーザーカードデータの取得エラー:", error);
    return NextResponse.json({ message: "サーバー内部エラー" }, { status: 500 });
  }
}