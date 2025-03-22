import React, { PropsWithChildren } from "react";
import { LessonsNavigation } from "./[lessonId]/LessonsNavigation";

export default function layoutLesson({
  children,
  params,
}: PropsWithChildren<{ params: { courseId: string } }>) {
  return (
    <div className="flex items-start gap-4 p-4">
      <LessonsNavigation courseId={params.courseId} />
      {children}
    </div>
  );
}
