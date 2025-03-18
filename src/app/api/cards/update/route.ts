import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from "@prisma/client"; // PrismaClientのインポート
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // セッション確認
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // リクエストボディの解析
    const body = await request.json();
    console.log("Request body:", body); // デバッグ用
    
    const { cardId, bagQuantity, heartQuantity } = body;
    const userId = session.user.id;

    // 入力値の検証
    const cardIdNumber = Number(cardId);
    if (isNaN(cardIdNumber)) {
      return NextResponse.json({ error: "Invalid cardId: must be a number" }, { status: 400 });
    }

    if (typeof bagQuantity !== "number" || typeof heartQuantity !== "number") {
      return NextResponse.json({ error: "bagQuantity and heartQuantity must be numbers" }, { status: 400 });
    }

    if (bagQuantity < 0 || heartQuantity < 0) {
      return NextResponse.json({ error: "Quantities cannot be negative" }, { status: 400 });
    }

    // カードの存在確認
    const cardExists = await prisma.card.findUnique({
      where: { id: cardIdNumber }
    });

    if (!cardExists) {
      return NextResponse.json({ error: `Card with ID ${cardIdNumber} does not exist` }, { status: 404 });
    }

    // ユーザーの存在確認
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userExists) {
      return NextResponse.json({ error: `User with ID ${userId} does not exist` }, { status: 404 });
    }

    // upsert操作の実行
    const updatedUserCard = await prisma.userCard.upsert({
      where: {
        userId_cardId: {
          userId: userId,
          cardId: cardIdNumber,
        },
      },
      update: {
        bagQuantity,
        heartQuantity,
      },
      create: {
        userId: userId,
        cardId: cardIdNumber,
        bagQuantity,
        heartQuantity,
      },
    });

    console.log("Updated user card:", updatedUserCard); // デバッグ用
    return NextResponse.json(updatedUserCard);
  } catch (error: unknown) {
    // エラーの詳細をログに出力
    console.error("Error updating user card data:", error);

    // Prismaエラーの特定
    let statusCode = 500;
    let errorMessage = "Internal server error";

    // 型ガードを使ってerrorがPrismaClientKnownRequestError型であることを確認
    if (isPrismaClientKnownRequestError(error)) {
      if (error.code === 'P2003') {
        statusCode = 404;
        errorMessage = "Foreign key constraint failed: Check if the card or user exists";
      } else if (error.code === 'P2002') {
        statusCode = 409;
        errorMessage = "Unique constraint violation";
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: error.message, // 安全にアクセス
          code: error.code || 'unknown',
        },
        { status: statusCode }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { 
          error: "Unknown error", 
          details: "An unexpected error occurred", 
          code: 'unknown' 
        },
        { status: 500 }
      );
    }
  }
}

// Prismaエラーの型ガード関数
function isPrismaClientKnownRequestError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return (error as Prisma.PrismaClientKnownRequestError).code !== undefined;
}