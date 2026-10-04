-- AlterTable
ALTER TABLE "Motocarro" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Moto" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL DEFAULT 'Vento',
    "model" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(12,2),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "warrantyYears" INTEGER,
    "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "engineType" TEXT,
    "displacement" DECIMAL(8,2),
    "horsepower" DECIMAL(8,2),
    "horsepowerRpm" INTEGER,
    "maxTorque" DECIMAL(8,2),
    "torqueRpm" INTEGER,
    "compressionRatio" TEXT,
    "fuelSupply" TEXT,
    "ignition" TEXT,
    "transmission" TEXT,
    "fuelCapacity" DECIMAL(8,2),
    "lengthMm" INTEGER,
    "widthMm" INTEGER,
    "heightMm" INTEGER,
    "seatHeightMm" INTEGER,
    "groundClearanceMm" INTEGER,
    "weightKg" DECIMAL(8,2),
    "frontSuspension" TEXT,
    "rearSuspension" TEXT,
    "frontBrake" TEXT,
    "rearBrake" TEXT,
    "frontWheel" TEXT,
    "rearWheel" TEXT,
    "equipment" TEXT,
    "certifications" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotoImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "motoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MotoImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Moto_slug_key" ON "Moto"("slug");

-- CreateIndex
CREATE INDEX "MotoImage_motoId_position_idx" ON "MotoImage"("motoId", "position");

-- AddForeignKey
ALTER TABLE "MotoImage" ADD CONSTRAINT "MotoImage_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES "Moto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
