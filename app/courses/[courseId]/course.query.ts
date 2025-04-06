// import { prisma } from "@/lib/prisma";
// // import { Prisma } from "@prisma/client";

// export const getCourse = async ({
//   courseId,
//   userId = "-",
// }: {
//   courseId: string;
//   userId?: string;
// }) => {
//   const course = await prisma.course.findUnique({
//     where: {
//       id: courseId,
//     },
//     select: {
//       id: true,
//       image: true,
//       name: true,
//       presentation: true,
//       users: {
//         where: {
//           userId,
//         },
//         select: {
//           canceledAt: true,
//           id: true,
//         },
//       },
//       lessons: {
//         where: {
//           state: {
//             in: ["PUBLIC", "PUBLISHED"],
//           },
//         },
//         orderBy: {
//           rank: "asc",
//         },
//         select: {
//           name: true,
//           id: true,
//           courseId: true,
//           state: true,
//           users: {
//             where: {
//               userId,
//             },
//             select: {
//               progress: true,
//             },
//           },
//         },
//       },
//       creator: {
//         select: {
//           name: true,
//           image: true,
//         },
//       },
//       _count: {
//         select: {
//           lessons: true,
//           users: true,
//         },
//       },
//     },
//   });

//   if (!course) {
//     return null;
//   }

//   const lessons = course.lessons.map((lesson) => {
//     const progress = lesson.users[0]?.progress ?? "NOT_STARTED";
//     return {
//       ...lesson,
//       progress,
//     };
//   });

//   return {
//     ...course,
//     isEnrolled: course.users.length > 0 && !course.users[0].canceledAt,
//     isCanceled: course.users.length > 0 && !!course.users[0].canceledAt,
//     lessons,
//   };
// };

// // export type CourseType = NonNullable<
// //   Prisma.PromiseReturnType<typeof getCourse>
// // >;

// export type CourseType = NonNullable<Awaited<ReturnType<typeof getCourse>>>;

// export type CourseLessonType = CourseType["lessons"][0];

// ------------------- fix --------------------

import { prisma } from "@/lib/prisma";

export const getCourse = async ({
  courseId,
  userId = "-",
}: {
  courseId: string;
  userId?: string;
}): Promise<CourseType | null> => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        where: {
          userId,
        },
        select: {
          canceledAt: true,
          id: true,
        },
      },
      lessons: {
        where: {
          state: {
            in: ["PUBLIC", "PUBLISHED"],
          },
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          name: true,
          id: true,
          courseId: true,
          state: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
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

  if (!course) return null;

  const lessons = course.lessons.map((lesson) => {
    const progress = lesson.users[0]?.progress ?? "NOT_STARTED";
    return {
      ...lesson,
      progress,
    };
  });

  return {
    ...course,
    isEnrolled: course.users.length > 0 && !course.users[0].canceledAt,
    isCanceled: course.users.length > 0 && !!course.users[0].canceledAt,
    lessons,
  };
};

// Types manuels (adaptés à ce que retourne la fonction)

export type CourseType = {
  id: string;
  image: string | null;
  name: string;
  presentation: string | null;
  creator: {
    name: string | null;
    image: string | null;
  };
  users: {
    canceledAt: Date | null;
    id: string;
  }[];
  lessons: CourseLessonType[];
  _count: {
    lessons: number;
    users: number;
  };
  isEnrolled: boolean;
  isCanceled: boolean;
};

export type CourseLessonType = {
  id: string;
  name: string;
  courseId: string;
  state: "PUBLIC" | "PUBLISHED" | string;
  users: {
    progress: string;
  }[];
  progress: string;
};
