import { prisma } from "@/lib/prisma";

export const getAdminCourse = async ({
  adminCourseId,
  userId,
  userPage,
}: {
  adminCourseId: string;
  userId: string;
  userPage: number;
}) => {
  const courses = await prisma.course.findUnique({
    where: {
      creatorId: userId,
      id: adminCourseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      state: true,
      users: {
        take: 5,
        skip: Math.max(0, userPage * 5),
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              id: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const users = courses?.users.map((user) => {
    return {
      canceled: user.canceledAt ? true : false,
      ...user.user,
    };
  });

  return {
    ...courses,
    users,
  };
};
