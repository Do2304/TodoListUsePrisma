-- CreateTable
CREATE TABLE "nhap123" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "nhap123_pkey" PRIMARY KEY ("id")
);
