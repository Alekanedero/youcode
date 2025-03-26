import { LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import logoJs from "./../public/images/logoJs.svg";
import logoNext from "./../public/images/logoNext.svg";
import logoGit from "./../public/images/logoGit.svg";
import logoReact from "./../public/images/logoReact.svg";
import logoPrisma from "./../public/images/logoPrisma.svg";
import logoTs from "./../public/images/logoTs.svg";
import logoTailwind from "./../public/images/logoTailwind.svg";
import logoShadcn from "./../public/images/logoShadcn.svg";
import { LogoItem } from "./LogoItem";
import { TypeWriter } from "./TypeWriter";
import ClientOnly from "@/components/utils/clientOnly";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, PhoneIcon } from "lucide-react";

export default function Home() {
  return (
    <div className=" max-w-lg m-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
      <LayoutHeader className="flex items-center justify-center relative">
        <Image
          src="/images/alex2.png"
          alt="photo de profil alex"
          width={90}
          height={90}
          className="absolute top-0 left-[-30px]"
        />
        <LayoutTitle>
          <div className="text-4xl md:text-6xl font-black text-center upercase flex items-center mt-6 ">
            <ClientOnly>
              <TypeWriter />
            </ClientOnly>
          </div>
        </LayoutTitle>
        <p className="text-center flex mt-20 text-lg">
          Salut, c&#39;est Alex, développeur web fullstack ! 🚀 Ici, tu peux
          découvrir mon portfolio et explorer mes projet tels que cette
          plateforme de formation en ligne. Je l&#39;ai conçue lors d&#39;une
          formation Next.js, elle est juste à but lucratif. Bonne visite !
        </p>
        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </LayoutHeader>

      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          Stack
        </Typography>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <ClientOnly>
            <LogoItem
              src={logoNext}
              alt="Next Icon"
              title="Next Js"
              text="React Framework"
              isActiveThemeBlack
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
              title="React Js"
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
              title="Shadcn"
              text="CSS Framework"
              isActiveThemeBlack
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
              isActiveThemeWhite
            />
          </ClientOnly>
        </div>
        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </section>
      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          Web courses
        </Typography>
        <div className="flex flex-col gap-10">
          <div className="flex gap-6 items-start">
            <LogoItem
              src="/images/logoOpenclassroom.png"
              alt="logo Openclassroom"
              title="Openclassroom"
              text="Online Learning Platform"
            />
            <p className="max-w-2xl ml-auto">
              J’ai effectué une reconversion professionnelle en tant que
              développeur web sur une période d’un an avec OpenClassrooms.
              Durant cette formation, j’ai acquis des compétences en HTML, CSS,
              Sass, JavaScript, SEO, GitHub, React et bien plus encore. Chaque
              semaine, j’étais accompagné par un mentor pour mener à bien mes
              projets, jusqu’à l’obtention de mon diplôme.
            </p>
          </div>
          <div className="flex gap-6 items-start">
            <LogoItem
              src="/images/logo_beginreact.png"
              alt="logo Begin react"
              title="Begin React"
              text="Online Learning Mevlin Platform"
            />
            <p className="max-w-2xl ml-auto">
              J’ai poursuivi mon apprentissage avec une formation sur la
              plateforme Codeline de Melvin. Celle-ci m&apos;a permis de revoir,
              pratiquer et approfondir les principaux concepts de React ainsi
              que différents design patterns. Grâce à une approche interactive
              combinant exercices et workshops, j’ai pu consolider mes
              compétences et améliorer ma compréhension de cette bibliothèque.
            </p>
          </div>
          <div className="flex gap-6 items-start">
            <LogoItem
              src="/images/logo_nextreact.png"
              alt="logo Next react"
              title="Next React"
              text="Online Learning Mevlin Platform"
            />
            <p className="max-w-2xl ml-auto">
              J’ai ensuite suivi une formation complète sur Next.js 15. Au cours
              de cet apprentissage, j’ai approfondi ma maîtrise de TypeScript
              avec React, structurant mes projets selon les standards
              professionnels et utilisant des outils avancés comme Prisma,
              NextAuth et TanStack Query. J’ai également travaillé sur la
              gestion des Server et Client Components, le routing avancé, les
              Server Actions sécurisées, ainsi que l’intégration de tests en
              React pour assurer la fiabilité du code. Enfin, j’ai appris à
              déployer mes projets sur Vercel et à les optimiser. Un projet
              concret m’a permis d’appliquer ces compétences de manière
              pratique.
            </p>
          </div>
        </div>
        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </section>
      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          Project
        </Typography>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-2">
          {/* Kasa */}
          <Link href="https://kasa-zeta-pearl.vercel.app/">
            <Card className="hover:bg-accent">
              <CardHeader className="flex gap-4 space-y-0 items-center">
                <CardTitle>Kasa</CardTitle>
                <CardDescription>
                  <p>App react, de location immobilière</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col w-full items-center justify-center px-10">
                <Image
                  src="/images/kasa.jpg"
                  height={200}
                  width={300}
                  alt="site de démo Kasa"
                  className="rounded-xl w-full"
                />
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className=" italic text-gray-500 ">
                  Réaliser chez Openclassroom
                </p>
              </CardFooter>
            </Card>
          </Link>

          {/* Ohmyfood */}
          <Link href="https://alekanedero.github.io/ohmyfood/">
            <Card className="hover:bg-accent">
              <CardHeader className="flex gap-4 space-y-0 items-center">
                <CardTitle>Ohmyfood</CardTitle>
                <CardDescription>
                  <p>App mobile statique pour un restaurant</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col w-full items-center justify-center px-10">
                <Image
                  src="/images/ohmyfood.jpg"
                  height={200}
                  width={300}
                  alt="site de démo Ohmyfood"
                  className="rounded-xl w-full"
                />
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className=" italic text-gray-500 ">
                  Réaliser chez Openclassroom
                </p>
              </CardFooter>
            </Card>
          </Link>

          {/* La Panthère */}
          <Link href="https://alekanedero.github.io/La-Panthere/">
            <Card className="hover:bg-accent">
              <CardHeader className="flex gap-4 space-y-0 items-center">
                <CardTitle>Lapanthere</CardTitle>
                <CardDescription>
                  Site statique pour une agence de communications
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col w-full items-center justify-center px-10">
                <Image
                  src="/images/lapanthere.jpg"
                  height={200}
                  width={300}
                  alt="site de démo la Panthère"
                  className="rounded-xl w-full"
                />
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className=" italic text-gray-500 ">
                  Réaliser chez Openclassroom
                </p>
              </CardFooter>
            </Card>
          </Link>

          {/* Booki */}
          <Link href="https://alekanedero.github.io/Booki/">
            <Card className="hover:bg-accent">
              <CardHeader className="flex gap-4 space-y-0 items-center">
                <CardTitle>Booki</CardTitle>
                <CardDescription>
                  Site statique pour une agence de voyages
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col w-full items-center justify-center px-10">
                <Image
                  src="/images/booki.jpg"
                  height={200}
                  width={300}
                  alt="site de démo Booki"
                  className="rounded-xl w-full"
                />
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className=" italic text-gray-500 ">
                  Réaliser chez Openclassroom
                </p>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </section>

      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          Certifications
        </Typography>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 2xl:grid-cols-3">
          {/* NRCP */}
          <Card>
            <CardHeader className="flex gap-4 space-y-0 items-center">
              <CardTitle>Openclassroom, titre RNCP</CardTitle>
              <CardDescription>Développeur intégrateur web</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col w-full items-center justify-center px-10">
              <Image
                src="/images/rncp.jpg"
                height={200}
                width={300}
                alt="diplome de developpeur web"
                className="rounded-xl w-full"
              />
            </CardContent>
          </Card>

          {/* certificat Begin React */}
          <Card>
            <CardHeader className="flex gap-4 space-y-0 items-center">
              <CardTitle>Certificat Begin React</CardTitle>
              <CardDescription>React.Js</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col w-full items-center justify-center px-10">
              <Image
                src="/images/certificate_beginreact .jpg"
                height={200}
                width={300}
                alt="diplome de developpeur web"
                className="rounded-xl w-full"
              />
            </CardContent>
          </Card>

          {/* certificat Next React */}
          <Card>
            <CardHeader className="flex gap-4 space-y-0 items-center">
              <CardTitle>Certificat Next React</CardTitle>
              <CardDescription>Next.Js</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col w-full items-center justify-center px-10">
              <Image
                src="/images/certificate_nextreact.jpg"
                height={200}
                width={300}
                alt=" certificat Next React"
                className="rounded-xl w-full"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </section>
      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          About
        </Typography>
        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </section>

      {/* contact */}
      <section>
        <Typography className="flex mb-8 mt-8 text-2xl font-semibold">
          Contact
        </Typography>
        <div className="grid grid-cols-4 "></div>
        <Card className="">
          <CardHeader className="flex space-y-0 items-center justify-center mb-6">
            <CardTitle>My coordinates</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row w-full items-center justify-center px-10 gap-10">
            <div className="flex gap-2 items-center">
              <Mail size={30} />
              <p>alexandrecompin@gmail.com</p>
            </div>
            <div className="flex gap-2 items-center">
              <PhoneIcon size={30} />
              <p>06 18 25 07 58</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center gap-8">
            <Link
              href="https://www.linkedin.com/in/alexandre-compin-062a03177/"
              target="_blank"
              title="Visit my LinkedIn profile"
            >
              <Image
                src="/images/linkedin.svg"
                width={100}
                height={100}
                alt="logo linkedin"
              />
            </Link>
            <Link
              href="https://wa.me/33618250758"
              target="_blank"
              title="Send my a message on whatsapp"
            >
              <Image
                src="/images/whatsapp.svg"
                width={110}
                height={110}
                alt="logo whatsapp"
              />
            </Link>
            <Link
              href="mailto:alexandrecompin@gmail.com"
              title="Send my a mail"
            >
              <Image
                src="/images/gmail.svg"
                width={100}
                height={100}
                alt="logo gamil"
              />
            </Link>
            <Link
              href="https://github.com/Alekanedero"
              title="Visit my GitHub profile"
            >
              <LogoItem
                src="/images/logoGit.svg"
                alt="logo github"
                whitoutBorder
                isActiveThemeWhite
              />
            </Link>
          </CardFooter>
        </Card>

        <div className="mt-10 w-full border border-b-slate-500 "></div>
      </section>
    </div>
  );
}
