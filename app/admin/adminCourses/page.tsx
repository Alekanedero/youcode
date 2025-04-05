import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { getAdminCourses } from "./courseAdmin.query";
import { ArrowRightToLine } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminCoursesPage() {
  const courses = await getAdminCourses();

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link
          className={`${buttonVariants({
            size: "sm",
            variant: "secondary",
          })} `}
          href="/admin/adminCourses/new"
        >
          New course
        </Link>
      </LayoutActions>
      <LayoutContent>
        <Card>
          <CardContent className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses
                  // .sort(
                  //   (a: createdAtType, b: createdAtType) =>
                  //     new Date(b.createdAt).getTime() -
                  //     new Date(a.createdAt).getTime()
                  // )
                  .map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <Avatar className="rounded">
                          <AvatarFallback>{course.name[0]}</AvatarFallback>
                          {course.image && (
                            <AvatarImage src={course.image} alt={course.name} />
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography variant="large">{course.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          className={cn("text-red-300", {
                            "text-green-500": course.state === "PUBLISHED",
                          })}
                        >
                          {course.state}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link
                          className={buttonVariants({
                            size: "sm",
                            variant: "secondary",
                          })}
                          href={`/admin/adminCourses/${course.id}`}
                        >
                          <ArrowRightToLine size={20} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
