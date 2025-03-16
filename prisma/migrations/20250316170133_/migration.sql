/*
  Warnings:

  - Added the required column `Block` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `No` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN "Block" INTEGER NULL,
ADD COLUMN "No" TEXT NULL;