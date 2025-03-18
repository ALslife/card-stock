import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    // paramsからcardIdを直接取得せず、まず変数にawaitして格納
    const resolvedParams = await params;
    const cardId = resolvedParams.cardId;
    
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!cardId) {
      return NextResponse.json({ message: "カードIDが必要です" }, { status: 400 });
    }

    // cardIdを数値に変換
    const cardIdNumber = parseInt(cardId, 10);
    
    if (isNaN(cardIdNumber)) {
      return NextResponse.json({ message: "無効なカードIDフォーマットです" }, { status: 400 });
    }

    try {
      const cardData = await prisma.card.findUnique({
        where: {
          id: cardIdNumber
        }
      });

      if (!cardData) {
        return NextResponse.json({ message: "カードが見つかりません" }, { status: 404 });
      }

      // ユーザー固有のデータを取得する場合、別のクエリで取得
      let bagQuantity = 0;
      let heartQuantity = 0;

      if (userId) {
        const userCardData = await prisma.userCard?.findFirst({
          where: {
            cardId: cardIdNumber,
            userId: userId
          }
        });

        if (userCardData) {
          bagQuantity = userCardData.bagQuantity || 0;
          heartQuantity = userCardData.heartQuantity || 0;
        }
      }

      return NextResponse.json({
        ...cardData,
        bagQuantity,
        heartQuantity,
      });
    } catch (dbError) {
      const errorMessage = dbError ? dbError.toString() : "不明なデータベースエラー";
      console.error("データベース操作エラー:", errorMessage);
      return NextResponse.json({ message: "データベースエラー" }, { status: 500 });
    }
  } catch (error) {
    const errorMessage = error ? error.toString() : "不明なエラー";
    console.error("カードデータの取得エラー:", errorMessage);
    return NextResponse.json({ message: "サーバー内部エラー" }, { status: 500 });
  }
}