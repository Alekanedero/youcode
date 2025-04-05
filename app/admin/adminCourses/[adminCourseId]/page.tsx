// import {
//   Layout,
//   LayoutContent,
//   LayoutHeader,
//   LayoutTitle,
// } from "@/components/layout/layout";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Typography } from "@/components/ui/typography";
// import { getRequiredAuthSession } from "@/lib/auth";
// import Link from "next/link";
// import { CoursePaginationButton } from "../../../../src/features/pagination/PaginationButton";
// import { getAdminCourse } from "./admin-course.query";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Menu } from "lucide-react";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { Badge } from "@/components/ui/badge";
// import { SubmitButton } from "@/components/form/SubmitButton";
// import { toggleAdminCourseState } from "./admin-course.action";

// export default async function AdminCoursePage({
//   params: { adminCourseId },
//   searchParams,
// }: {
//   params: {
//     adminCourseId: string;
//   };
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const page = Number(searchParams.page ?? 0);
//   const session = await getRequiredAuthSession();

//   const course = await getAdminCourse({
//     adminCourseId,
//     userId: session.user.id,
//     userPage: page,
//   });

//   if (!adminCourseId) {
//     return null;
//   }

//   return (
//     <Layout>
//       <LayoutHeader>
//         <LayoutTitle>Courses</LayoutTitle>
//       </LayoutHeader>
//       <LayoutContent className="flex flex-col gap-4 lg:flex-row">
//         <Card className="flex-[2]">
//           <CardHeader>
//             <CardTitle>Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-end">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {course?.users?.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>
//                       <Avatar className="rounded">
//                         <AvatarFallback>{user.email?.[0]}</AvatarFallback>
//                         {user.image && (
//                           <AvatarImage
//                             src={user.image}
//                             alt={user.email ?? ""}
//                           />
//                         )}
//                       </Avatar>
//                     </TableCell>
//                     <TableCell>
//                       <Typography
//                         as={Link}
//                         variant="large"
//                         href={`/admin/users/${user.id}`}
//                       >
//                         {user.email}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="secondary">
//                         {user.canceled ? "Canceled" : "Active"}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="flex flex-row-reverse">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger>
//                           <Button size="sm" variant="secondary">
//                             <Menu size={16} />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent>
//                           <DropdownMenuItem asChild>
//                             <form>
//                               <button
//                                 className="w-full"
//                                 formAction={async () => {
//                                   "use server";

//                                   const session =
//                                     await getRequiredAuthSession();
//                                   const userId = user.id;

//                                   const courseOnUser =
//                                     await prisma.courseOnUser.findFirst({
//                                       where: {
//                                         userId,
//                                         course: {
//                                           id: adminCourseId,
//                                           creatorId: session.user.id,
//                                         },
//                                       },
//                                     });

//                                   if (!courseOnUser) return;

//                                   await prisma.courseOnUser.update({
//                                     where: {
//                                       id: courseOnUser.id,
//                                     },
//                                     data: {
//                                       canceledAt: courseOnUser.canceledAt
//                                         ? null
//                                         : new Date(),
//                                     },
//                                   });

//                                   revalidatePath(
//                                     `/admin/adminCourses/${adminCourseId}`
//                                   );
//                                 }}
//                               >
//                                 {user.canceled ? "Active" : "Canceled"}
//                               </button>
//                             </form>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             {course && (
//               <CoursePaginationButton
//                 baseUrl={`/admin/adminCourses/${course.id}`}
//                 page={page}
//                 className="mt-6"
//               />
//             )}
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardHeader className="flex-row items-center gap-4 space-y-0">
//             <Avatar className="rounded">
//               <AvatarFallback>{course?.name?.[0]}</AvatarFallback>
//               {course.image && (
//                 <AvatarImage src={course.image} alt={course.name ?? ""} />
//               )}
//             </Avatar>
//             <CardTitle>{course?.name}</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-1">
//             <form>
//               <SubmitButton
//                 size="sm"
//                 className="w-auto"
//                 formAction={async () => {
//                   "use server";

//                   await toggleAdminCourseState({
//                     adminCourseId: course.id,
//                     state: course.state,
//                   });
//                 }}
//               >
//                 {course.state}
//               </SubmitButton>
//             </form>
//             <Typography>{course._count?.users} users</Typography>
//             <Typography>{course._count?.lessons} lessons</Typography>
//             <Link
//               href={`/admin/adminCourses/${course.id}/edit`}
//               className={buttonVariants({
//                 variant: "outline",
//               })}
//             >
//               Edit
//             </Link>
//             <Link
//               href={`/admin/adminCourses/${course.id}/lessons`}
//               className={buttonVariants({
//                 variant: "outline",
//               })}
//             >
//               Edit lessons
//             </Link>
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { CoursePaginationButton } from "../../../../src/features/pagination/PaginationButton";
import { getAdminCourse } from "./admin-course.query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/form/SubmitButton";
import { toggleAdminCourseState } from "./admin-course.action";

export default async function AdminCoursePage({
  params,
  searchParams,
}: {
  params: Promise<{
    adminCourseId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const paramss = await params;
  const searchParamss = await searchParams;

  const page = Number(searchParamss.page ?? 0);
  const session = await getRequiredAuthSession();

  const course = await getAdminCourse({
    adminCourseId: paramss.adminCourseId,
    userId: session.user.id,
    userPage: page,
  });

  if (!paramss.adminCourseId) {
    return null;
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course?.users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.email ?? ""}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {user.canceled ? "Canceled" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex flex-row-reverse">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button size="sm" variant="secondary">
                            <Menu size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <form>
                              <button
                                className="w-full"
                                formAction={async () => {
                                  "use server";

                                  const session =
                                    await getRequiredAuthSession();
                                  const userId = user.id;

                                  const courseOnUser =
                                    await prisma.courseOnUser.findFirst({
                                      where: {
                                        userId,
                                        course: {
                                          id: paramss.adminCourseId,
                                          creatorId: session.user.id,
                                        },
                                      },
                                    });

                                  if (!courseOnUser) return;

                                  await prisma.courseOnUser.update({
                                    where: {
                                      id: courseOnUser.id,
                                    },
                                    data: {
                                      canceledAt: courseOnUser.canceledAt
                                        ? null
                                        : new Date(),
                                    },
                                  });

                                  revalidatePath(
                                    `/admin/adminCourses/${paramss.adminCourseId}`
                                  );
                                }}
                              >
                                {user.canceled ? "Active" : "Canceled"}
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {course && (
              <CoursePaginationButton
                baseUrl={`/admin/adminCourses/${course.id}`}
                page={page}
                className="mt-6"
              />
            )}
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Avatar className="rounded">
              <AvatarFallback>{course?.name?.[0]}</AvatarFallback>
              {course.image && (
                <AvatarImage src={course.image} alt={course.name ?? ""} />
              )}
            </Avatar>
            <CardTitle>{course?.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <form>
              <SubmitButton
                size="sm"
                className="w-auto"
                formAction={async () => {
                  "use server";

                  if (
                    course.state === "DRAFT" ||
                    course.state === "PUBLISHED"
                  ) {
                    await toggleAdminCourseState({
                      adminCourseId: course.id,
                      state: course.state,
                    });
                  }
                }}
              >
                {course.state}
              </SubmitButton>
            </form>
            <Typography>{course._count?.users} users</Typography>
            <Typography>{course._count?.lessons} lessons</Typography>
            <Link
              href={`/admin/adminCourses/${course.id}/edit`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Edit
            </Link>
            <Link
              href={`/admin/adminCourses/${course.id}/lessons`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Edit lessons
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
