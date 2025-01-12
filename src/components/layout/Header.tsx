// src/components/layout/Header.
import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { AuthButton } from "@/features/auth/AuthButton";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 item-center">
          <Image src="/images/logo.svg" alt="app logo" width={50} height={35} />
        </div>
        <div className="flex justify-center items-baseline gap-2 pl-4">
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
          <div className="flex gap-2 ml-6">
            <Typography
              variant="link"
              as={Link}
              href="/explorer"
              className="text-muted-foreground hover:text-foreground"
            >
              Explorer
            </Typography>
            <Typography
              variant="link"
              as={Link}
              href="/courses"
              className="text-muted-foreground hover:text-foreground"
            >
              Courses
            </Typography>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
