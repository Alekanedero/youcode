// import {
//   Layout,
//   LayoutContent,
//   LayoutHeader,
//   LayoutTitle,
// } from "@/components/layout/layout";
// import { Card, CardContent } from "@/components/ui/card";
// import { getRequiredAuthSession } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import { CourseForm } from "./CourseForm";

// export default async function EditPage({
//   params,
// }: {
//   params: {
//     adminCourseId: string;
//   };
// }) {
//   const session = await getRequiredAuthSession();

//   const course = await prisma.course.findUnique({
//     where: {
//       id: params.adminCourseId,
//       creatorId: session.user.id,
//     },
//     select: {
//       id: true,
//       image: true,
//       name: true,
//       presentation: true,
//       state: true,
//     },
//   });

//   if (!course) {
//     notFound();
//   }

//   return (
//     <Layout>
//       <LayoutHeader>
//         <LayoutTitle>Edit course</LayoutTitle>
//       </LayoutHeader>
//       <LayoutContent>
//         <Card className="flex-[2]">
//           <CardContent className="mt-6">
//             <CourseForm defaultValue={course} />
//           </CardContent>
//         </Card>
//       </LayoutContent>
//     </Layout>
//   );
// }

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CourseForm } from "./CourseForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{
    adminCourseId: string;
  }>;
}) {
  const paramss = await params;
  const session = await getRequiredAuthSession();

  const course = await prisma.course.findUnique({
    where: {
      id: paramss.adminCourseId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      state: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <CourseForm defaultValue={course} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
