import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CourseCard } from "../courses/CourseCard";
import { CoursesCard, getCourses } from "../courses/course.query";

export default async function ExplorerPage() {
  // const courses = await getCourses();

  // Force l'inférence explicite du type de courses
  const courses = (await getCourses()) as CoursesCard[];

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-2">
        {courses.map((course: CoursesCard) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
