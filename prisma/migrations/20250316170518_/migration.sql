/*
  Warnings:

  - Made the column `Block` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `No` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/

-- NULL値を持つ行をデフォルト値で更新
UPDATE "Card" SET "Block" = 0 WHERE "Block" IS NULL;
UPDATE "Card" SET "No" = '' WHERE "No" IS NULL;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN "Block" INTEGER NULL;
ALTER TABLE "Card" ADD COLUMN "No" TEXT NULL;
