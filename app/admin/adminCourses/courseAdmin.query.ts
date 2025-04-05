// import { getRequiredAuthSession } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// export const getAdminCourses = async () => {
//   "use server";

//   const session = await getRequiredAuthSession();

//   return prisma.course.findMany({
//     where: { creatorId: session?.user.id },
//   });
// };

// export type AdminCoursesType = Awaited<ReturnType<typeof getAdminCourses>> extends Array<infer T> ? T : never;

import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ✅ On sélectionne uniquement les champs nécessaires
export const getAdminCourses = async () => {
  "use server";

  const session = await getRequiredAuthSession();

  return prisma.course.findMany({
    where: { creatorId: session?.user.id },
    select: {
      id: true,
      name: true,
      image: true,
      state: true,
      createdAt: true, // tu peux le garder si tu veux trier par date plus tard
    },
  });
};

// ✅ Typage propre du tableau et de l’élément unique
export type AdminCoursesType = Awaited<ReturnType<typeof getAdminCourses>>;
export type AdminCourseItemType = AdminCoursesType[number];
