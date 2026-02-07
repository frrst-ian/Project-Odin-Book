-- AlterTable
ALTER TABLE "likes" ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("userId", "postId");

-- DropIndex
DROP INDEX "likes_userId_postId_key";
