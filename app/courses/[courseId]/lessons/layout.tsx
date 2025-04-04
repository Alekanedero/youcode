// import React, { PropsWithChildren, Suspense } from "react";
// import { LessonsNavigation } from "./LessonsNavigation";
// import { LessonsNavigationSkeleton } from "./LessonsNavigationSkeleton";

// export default function layoutLesson({
//   children,
//   params,
// }: PropsWithChildren<{ params: { courseId: string } }>) {
//   return (
//     <div className="flex items-start gap-4 p-4 relative">
//       <Suspense fallback={<LessonsNavigationSkeleton />}>
//         <LessonsNavigation courseId={params.courseId} />
//       </Suspense>
//       {children}
//     </div>
//   );
// }

import React, { PropsWithChildren, Suspense } from "react";
import { LessonsNavigation } from "./LessonsNavigation";
import { LessonsNavigationSkeleton } from "./LessonsNavigationSkeleton";

export default async function layoutLesson({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ courseId: string }> }>) {
  const paramss = await params;
  return (
    <div className="flex items-start gap-4 p-4 relative">
      <Suspense fallback={<LessonsNavigationSkeleton />}>
        <LessonsNavigation courseId={paramss.courseId} />
      </Suspense>
      {children}
    </div>
  );
}
