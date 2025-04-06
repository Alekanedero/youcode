// import { PrismaClient } from "@prisma/client";

// export const prisma: PrismaClient =
//   global.prisma ??
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? ["query", "error", "warn"]
//         : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// ------------- fix 1 --------------
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? ["query", "error", "warn"]
//         : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// ------------- fix 2 --------------
import { PrismaClient } from "@prisma/client"; // Assure-toi que PrismaClient est bien importé ici

// Définir l'instance PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Créer une instance globale ou une nouvelle connexion si nécessaire
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Dans un environnement non-production, conserver l'instance Prisma pour éviter des reconnections multiples en dev
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
