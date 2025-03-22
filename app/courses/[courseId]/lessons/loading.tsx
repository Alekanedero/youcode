import { LessonsNavigationSkeleton } from "./[lessonId]/LessonsNavigationSkeleton";

export default function LessonLoading() {
  return (
    <div className="flex items-start gap-4 p-4">
      <LessonsNavigationSkeleton />
    </div>
  );
}
