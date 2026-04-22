import { PrismaClient } from "../generated/prisma/client.js";
import path from "path";
import fs from "fs";

function findMonorepoRoot(startDir: string): string {
  let dir = startDir;
  while (dir !== path.parse(dir).root) {
    if (fs.existsSync(path.join(dir, "turbo.json"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  throw new Error("Could not find monorepo root (no turbo.json found)");
}

const monorepoRoot = findMonorepoRoot(process.cwd());
const dbPath = path.join(monorepoRoot, "packages", "db", "prisma", "dev.db");

console.log("[prisma] using DB at:", dbPath);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}