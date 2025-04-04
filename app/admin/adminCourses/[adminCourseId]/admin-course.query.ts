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
  const courses = (await prisma.course.findUnique({
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
  })) as {
    id: string;
    image: string | null;
    name: string;
    presentation: string | null;
    state: string;
    users: {
      canceledAt: Date | null;
      id: string;
      user: {
        email: string;
        id: string;
        image: string | null;
      };
    }[];
    _count: {
      lessons: number;
      users: number;
    };
  } | null;

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
