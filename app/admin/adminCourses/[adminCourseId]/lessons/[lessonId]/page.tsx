// import {
//   Layout,
//   LayoutContent,
//   LayoutHeader,
//   LayoutTitle,
// } from "@/components/layout/layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { notFound } from "next/navigation";
// import { getAdminLesson } from "./lesson.query";
// import { getRequiredAuthSession } from "@/lib/auth";
// import { LessonDetailsForm } from "./form/LessonDetailsform";
// import { MdxEditor } from "./content/MdxEditor";

// export default async function EditLessonsPage({
//   params,
// }: {
//   params: {
//     lessonId: string;
//   };
// }) {
//   const session = await getRequiredAuthSession();
//   const lesson = await getAdminLesson(params.lessonId, session.user.id);

//   if (!lesson) {
//     notFound();
//   }

//   return (
//     <Layout className="max-w-5xl">
//       <LayoutHeader>
//         <LayoutTitle>{lesson.name}</LayoutTitle>
//       </LayoutHeader>
//       <LayoutContent className="flex flex-col gap-4 lg:flex-row">
//         <Card className="flex-[1]">
//           <CardHeader>
//             <CardTitle>Details</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-2">
//             <LessonDetailsForm defaultValue={lesson} />
//           </CardContent>
//         </Card>
//         <Card className="flex-[3]">
//           <CardHeader>
//             <CardTitle>Content</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-2">
//             <MdxEditor lessonId={lesson.id} markdown={lesson.content} />
//           </CardContent>
//         </Card>
//       </LayoutContent>
//     </Layout>
//   );
// }

// Fix MdxEditor

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { getAdminLesson } from "./lesson.query";
import { getRequiredAuthSession } from "@/lib/auth";
import { LessonDetailsForm } from "./form/LessonDetailsform";
import { LessonContentForm } from "./form/LessonContentForm";

export default async function EditLessonsPage({
  params,
}: {
  params: Promise<{
    lessonId: string;
  }>;
}) {
  const { lessonId } = await params;
  const session = await getRequiredAuthSession();
  const lesson = await getAdminLesson(lessonId, session.user.id);

  if (!lesson) {
    notFound();
  }

  return (
    <Layout className="max-w-5xl">
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[1]">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonDetailsForm defaultValue={lesson} />
          </CardContent>
        </Card>
        <Card className="flex-[3]">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonContentForm defaultValue={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
