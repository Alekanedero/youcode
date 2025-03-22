import React, { PropsWithChildren, Suspense } from "react";
import { LessonsNavigation } from "./LessonsNavigation";
import { LessonsNavigationSkeleton } from "./LessonsNavigationSkeleton";

export default function layoutLesson({
  children,
  params,
}: PropsWithChildren<{ params: { courseId: string } }>) {
  return (
    <div className="flex items-start gap-4 p-4 relative">
      <Suspense fallback={<LessonsNavigationSkeleton />}>
        <LessonsNavigation courseId={params.courseId} />
      </Suspense>
      {children}
    </div>
  );
}
