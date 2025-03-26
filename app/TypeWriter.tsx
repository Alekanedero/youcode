"use client";

import ClientOnly from "@/components/utils/clientOnly";
import { Cursor, Typewriter } from "react-simple-typewriter";

export const TypeWriter = () => {
  if (typeof window === "undefined") return null;
  return (
    <>
      <ClientOnly>
        <Typewriter
          typeSpeed={40}
          words={[
            "Bienvenue !",
            "Welcome !",
            "Willkomen !",
            "Vienvenido !",
            "Benvenuto !",
            "Hola",
          ]}
          loop={0}
        />
        <span>
          <Cursor />
        </span>
      </ClientOnly>
    </>
  );
};
