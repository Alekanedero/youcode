// import { PropsWithChildren, ReactNode } from "react";

// export default async function RootLayout(
//   props: PropsWithChildren<{
//     modal?: ReactNode;
//   }>
// ) {
//   return (
//     <div>
//       {props.children}
//       {props.modal}
//     </div>
//   );
// }

import { PropsWithChildren } from "react";

export default async function RootLayout(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
