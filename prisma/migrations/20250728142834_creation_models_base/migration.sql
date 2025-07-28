-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_carreraId_key" ON "Teacher"("carreraId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_profesorId_key" ON "Score"("profesorId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
