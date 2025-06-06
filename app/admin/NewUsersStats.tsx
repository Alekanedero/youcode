// import { getRequiredAuthSession } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import React from "react";
// import { NewUserCharts } from "./NewUserCharts";

// export const NewUsersStats = async () => {
//   const session = await getRequiredAuthSession();

//   const newUsers = await prisma.courseOnUser.findMany({
//     where: {
//       course: {
//         creatorId: session.user.id,
//       },
//       createdAt: {
//         // previous 30 days
//         gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
//       },
//     },
//     select: {
//       createdAt: true,
//       canceledAt: true,
//       id: true,
//     },
//   });

//   //formater les données pour rechart, il attend des tableau d'objet avec des clés et des valeurs
//   const data = Array.from({ length: 30 }, (_, i) => {
//     const date = new Date(new Date().setDate(new Date().getDate() - i));
//     date.setHours(0, 0, 0, 0);

//     const newUsersCount = newUsers.filter((user) => {
//       const userDateWithoutTime = new Date(user.createdAt.setHours(0, 0, 0, 0));
//       return userDateWithoutTime.getTime() === date.getTime();
//     }).length;

//     const canceledUsersCount = newUsers.filter((user) => {
//       if (!user.canceledAt) {
//         return false;
//       }
//       const userDate = new Date(user.canceledAt);
//       const userDateWithoutTime = new Date(userDate.setHours(0, 0, 0, 0));

//       return userDateWithoutTime.getTime() === date.getTime();
//     }).length;

//     return {
//       date: date.toDateString(),
//       newUsersCount,
//       canceledUsersCount,
//     };
//   }).reverse();

//   console.log({ data, newUsers });

//   return <NewUserCharts data={data} />;
// };

// --------------- fix ti deploy ------------------

import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";
import { NewUserCharts } from "./NewUserCharts";

export const NewUsersStats = async () => {
  const session = await getRequiredAuthSession();

  const newUsers = (await prisma.courseOnUser.findMany({
    where: {
      course: {
        creatorId: session.user.id,
      },
      createdAt: {
        // previous 30 days
        gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      canceledAt: true,
      id: true,
    },
  })) as { createdAt: Date; canceledAt: Date | null; id: string }[];

  //formater les données pour rechart, il attend des tableau d'objet avec des clés et des valeurs
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(new Date().setDate(new Date().getDate() - i));
    date.setHours(0, 0, 0, 0);

    const newUsersCount = newUsers.filter(
      (user: { createdAt: Date; canceledAt: Date | null; id: string }) => {
        const userDateWithoutTime = new Date(
          user.createdAt.setHours(0, 0, 0, 0)
        );
        return userDateWithoutTime.getTime() === date.getTime();
      }
    ).length;

    const canceledUsersCount = newUsers.filter((user) => {
      if (!user.canceledAt) {
        return false;
      }
      const userDate = new Date(user.canceledAt);
      const userDateWithoutTime = new Date(userDate.setHours(0, 0, 0, 0));

      return userDateWithoutTime.getTime() === date.getTime();
    }).length;

    return {
      date: date.toDateString(),
      newUsersCount,
      canceledUsersCount,
    };
  }).reverse();

  console.log({ data, newUsers });

  return <NewUserCharts data={data} />;
};
