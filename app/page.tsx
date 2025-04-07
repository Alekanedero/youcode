import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { CircleDollarSign, PencilLine, Rocket, Star } from "lucide-react";
import { FAQValues } from "@/lib/FAQValues";
import { AuthButton } from "@/features/auth/AuthButton";

export default function Home() {
  return (
    <div>
      <div className="m-auto my-8 flex max-w-6xl flex-col gap-4 px-6 lg:my-16 lg:flex-row xl:my-24 xl:gap-8">
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <h1 className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-4xl lg:text-6xl font-extrabold text-transparent flex justify-center lg:justify-normal items-center">
            Create courses in seconds
          </h1>
          <h2 className="text-xl lg:text-2xl font-bold">
            YouCode is the YouTube of education. You will create online courses
            in seconds.
          </h2>
          <div className="flex items-center flex-col lg:flex-row gap-8">
            <div className="flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <Avatar key={i} className="-mr-4">
                  <AvatarFallback>{i + 1}</AvatarFallback>
                  <AvatarImage src={`/images/review/${(i % 4) + 1}.png`} />
                </Avatar>
              ))}
            </div>
            <div className="flex flex-col gap-0.5 text-yellow-500 dark:text-yellow-400">
              <p className="whitespace-nowrap  font-extrabold">
                +500 teachers trust us.
              </p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={32} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="bg-primary py-8 text-primary-foreground xl:py-16">
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:flex-row xl:gap-6">
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <PencilLine size={32} />
            <Typography variant="h3">MDX Based</Typography>
            <Typography variant="large">
              YouCode is based on MDX. You can write your courses in Markdown
              and React.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <CircleDollarSign size={32} />
            <Typography variant="h3">Free to use</Typography>
            <Typography variant="large">
              You want to publish your courses for free? YouCode is free to use.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <Rocket size={32} />
            <Typography variant="h3">
              This platform is for profit, but above all it has enabled me to
              develop and acquire skills in Next.js, React, Prisma, next-auth,
              Shadcn and TypeScript.
            </Typography>
          </div>
        </div>
      </div>
      <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <h2 className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-3xl lg:text-4xl font-extrabold text-transparent p-4">
          Start building your course today
        </h2>
        <p className="text-center text-xl px-4 py-8 max-w-3xl">
          All the current courses are fictitious, they are not real courses.
          What&#39;s interesting is how the platform works. I invite you to try
          out all its features. Don&#39;t hesitate to log in and try out the
          Admin mode, which offers a wealth of possibilities.
        </p>
        <AuthButton />
      </div>
      <div
        className="bg-secondary py-8 text-secondary-foreground xl:py-16"
        style={{
          // @ts-expect-error tailwindcss
          "--border": "240 3.7% 25%",
        }}
      >
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:gap-6">
          <h2 className="text-4xl font-extrabold">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQValues.map((value, i) => (
              <AccordionItem value={i + value.question} key={i}>
                <AccordionTrigger>{value.question}</AccordionTrigger>
                <AccordionContent>{value.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <h2 className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-3xl lg:text-4xl font-extrabold text-transparent p-4">
          Try it! It&#39;s free
        </h2>
      </div>
    </div>
  );
}
