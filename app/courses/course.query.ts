import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourses = async (userId?: string) => {
  return await prisma.course.findMany({
    where: userId
      ? {
          // Si userId est fourni, filtrer les cours auxquels l'utilisateur est inscrit et qui ne sont pas annulés
          users: {
            some: {
              userId,
              canceledAt: null,
            },
          },
          // Exclure les cours en état de brouillon
          state: {
            not: "DRAFT",
          },
        }
      : {
          // Si userId n'est pas fourni, récupérer tous les cours qui ne sont pas en état de brouillon
          state: {
            not: "DRAFT",
          },
        },
    select: {
      name: true,
      image: true,
      presentation: true,
      id: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
};

// Définir le type CoursesCard pour représenter le type de chaque élément retourné par getCourses
export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];
