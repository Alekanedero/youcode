import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getAdminCourses = async () => {
  "use server";

  const session = await getRequiredAuthSession();

  return prisma.course.findMany({
    where: { creatorId: session?.user.id },
  });
};

export type AdminCoursesType = Awaited<ReturnType<typeof getAdminCourses>>;
