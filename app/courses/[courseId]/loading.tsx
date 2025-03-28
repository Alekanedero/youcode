import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CourseSkeleton } from "./CourseSkeleton";

export default async function CourseSkeletonPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <CourseSkeleton />
      </LayoutContent>
    </Layout>
  );
}
