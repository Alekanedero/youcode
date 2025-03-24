"use client";
import { LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import Image from "next/image";
import { Typewriter, Cursor } from "react-simple-typewriter";
import { Typography } from "@/components/ui/typography";
import logoJs from "./../public/images/logoJs.svg";
import logoNext from "./../public/images/logoNext.svg";
import logoGit from "./../public/images/logoGit.svg";
import logoReact from "./../public/images/logoReact.svg";
import logoPrisma from "./../public/images/logoPrisma.svg";
import logoTs from "./../public/images/logoTs.svg";
import logoTailwind from "./../public/images/logoTailwind.svg";
import logoShadcn from "./../public/images/logoShadcn.svg";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <div className=" max-w-md m-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
      <LayoutHeader className="flex items-center justify-center relative">
        <Image
          src="/images/alex2.png"
          alt="photo de profil alex"
          width={90}
          height={90}
          className="absolute top-0 left-[-30px]"
        />
        <LayoutTitle>
          <h1 className="text-4xl md:text-6xl font-black text-center upercase flex items-center mt-6 ">
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
          </h1>
        </LayoutTitle>
        <p className="text-center flex mt-20">
          Salut, c&#39;est Alex, développeur web fullstack ! 🚀 Ici, tu peux
          découvrir mon portfolio et explorer mes projet tels que cette
          plateforme de formation en ligne. Je l&#39;ai conçue lors d&#39;une
          formation Next.js, elle est juste à but lucratif. Bonne visite !
        </p>
        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </LayoutHeader>

      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          My stack
        </Typography>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <LogoItem
            src={logoNext}
            alt="Next Icon"
            className="bg-slate-500"
            title="Next.js"
            text="React Framework"
          />
          <LogoItem
            src={logoJs}
            alt="JavaScript Icon"
            title="Javascript"
            text="Programming Language"
          />

          <LogoItem
            src={logoTailwind}
            alt="Tailwind Icon"
            title="Tailwind CSS"
            text="CSS Framework"
          />
          <LogoItem
            src={logoReact}
            alt="React Icon"
            title="React JS"
            text="Javascript Framework"
          />
          <LogoItem
            src={logoTs}
            alt="Typescript Icon"
            title="Typescript"
            text="Typed Programming Language"
          />
          <LogoItem
            src={logoShadcn}
            alt="Github Icon"
            className="text-white"
            title="Shadcn"
            text="CSS Framework"
          />

          <LogoItem
            src={logoPrisma}
            alt="Prisma Icon"
            title="Prisma"
            text="ORM Database"
          />

          <LogoItem
            src={logoGit}
            alt="Github Icon"
            title="GitHub"
            text="Code Hosting Platform"
          />
        </div>
        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </section>
      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          My web courses
        </Typography>
      </section>
    </div>
  );
}
interface LogoItemProps {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  text?: string;
}

const LogoItem: React.FC<LogoItemProps> = ({
  src,
  alt,
  className,
  title,
  text,
}) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <div
        className={cn(
          "w-16 h-16 border border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-gray-200 transition-all duration-300",
          className
        )}
      >
        <Image src={src} alt={alt} width={40} height={40} />
      </div>

      {/* Texte */}
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
};
