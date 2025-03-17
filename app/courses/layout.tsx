import { PropsWithChildren } from "react";

export default async function RootLayout(
  props: PropsWithChildren<{
    modal?: React.ReactNode;
  }>
) {
  return (
    <div>
      {props.children}
      {props.modal}
    </div>
  );
}
