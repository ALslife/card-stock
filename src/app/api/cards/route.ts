import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const cards = await prisma.card.findMany();
  return NextResponse.json(cards);
}
