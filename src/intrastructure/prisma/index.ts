// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use a singleton pattern in dev to avoid hot-reload issues
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // Optional: show queries in console
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;