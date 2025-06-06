// import {
//   Layout,
//   LayoutActions,
//   LayoutContent,
//   LayoutHeader,
//   LayoutTitle,
// } from "@/components/layout/layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getRequiredAuthSession } from "@/lib/auth";
// import { notFound, redirect } from "next/navigation";
// import { getCourseLessons } from "./lessons.query";
// import { SubmitButton } from "@/components/form/SubmitButton";
// import { prisma } from "@/lib/prisma";
// import { AdminLessonSortable } from "./AdminLessonSortable";
// import { getTheMiddleRank } from "@/lib/getTheMiddleRank";

// export default async function CourseLessonsPage({
//   params,
// }: {
//   params: {
//     adminCourseId: string;
//   };
// }) {
//   const session = await getRequiredAuthSession();
//   const course = await getCourseLessons({
//     adminCourseId: params.adminCourseId,
//     userId: session.user.id,
//   });

//   if (!course) {
//     notFound();
//   }

//   return (
//     <Layout>
//       <LayoutHeader>
//         <LayoutTitle>{course.name}</LayoutTitle>
//       </LayoutHeader>
//       <LayoutActions></LayoutActions>
//       <LayoutContent className="flex flex-col gap-4 lg:flex-row">
//         <Card className="flex-[2]">
//           <CardHeader>
//             <CardTitle>Lessons</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-2">
//             <AdminLessonSortable items={course.lessons} />
//             <form>
//               <SubmitButton
//                 size="sm"
//                 variant="secondary"
//                 className="w-full"
//                 formAction={async () => {
//                   "use server";

//                   const session = await getRequiredAuthSession();

//                   const courseId = params.adminCourseId;

//                   //Authorize the user
//                   await prisma.course.findFirstOrThrow({
//                     where: {
//                       creatorId: session.user.id,
//                       id: courseId,
//                     },
//                   });

//                   // Récupérer le rang le plus élevé actuel des leçons
//                   const lastLesson = await prisma.lesson.findFirst({
//                     where: { courseId: courseId },
//                     orderBy: { rank: "desc" },
//                   });

//                   const newRank = getTheMiddleRank(lastLesson?.rank, undefined);

//                   const lesson = await prisma.lesson.create({
//                     data: {
//                       courseId: courseId,
//                       name: "Draft Lesson",
//                       state: "HIDDEN",
//                       rank: newRank,
//                       content: "## Default content",
//                     },
//                   });

//                   redirect(
//                     `/admin/adminCourses/${courseId}/lessons/${lesson.id}`
//                   );
//                 }}
//               >
//                 Create lesson
//               </SubmitButton>
//             </form>
//           </CardContent>
//         </Card>
//       </LayoutContent>
//     </Layout>
//   );
// }

import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { getCourseLessons } from "./lessons.query";
import { SubmitButton } from "@/components/form/SubmitButton";
import { prisma } from "@/lib/prisma";

import { getTheMiddleRank } from "@/lib/getTheMiddleRank";
import { AdminLessonSortable } from "./AdminLessonSortable";

export default async function CourseLessonsPage({
  params,
}: {
  params: Promise<{
    adminCourseId: string;
  }>;
}) {
  const paramss = await params;
  const session = await getRequiredAuthSession();
  const course = await getCourseLessons({
    adminCourseId: paramss.adminCourseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutActions></LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AdminLessonSortable items={course.lessons} />
            <form>
              <SubmitButton
                size="sm"
                variant="secondary"
                className="w-full"
                formAction={async () => {
                  "use server";

                  const session = await getRequiredAuthSession();

                  const courseId = paramss.adminCourseId;

                  //Authorize the user
                  await prisma.course.findFirstOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: courseId,
                    },
                  });

                  // Récupérer le rang le plus élevé actuel des leçons
                  const lastLesson = await prisma.lesson.findFirst({
                    where: { courseId: courseId },
                    orderBy: { rank: "desc" },
                  });

                  const newRank = getTheMiddleRank(lastLesson?.rank, undefined);

                  const lesson = await prisma.lesson.create({
                    data: {
                      courseId: courseId,
                      name: "Draft Lesson",
                      state: "HIDDEN",
                      rank: newRank,
                      content: "## Default content",
                    },
                  });

                  redirect(
                    `/admin/adminCourses/${courseId}/lessons/${lesson.id}`
                  );
                }}
              >
                Create lesson
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
