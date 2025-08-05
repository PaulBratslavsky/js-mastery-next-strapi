"use client";
import { Hamburger } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants/nav-links";
import { StrapiUserData } from "@/types";

import { AuthButton, AuthUserNavButton } from "../auth";
import { NavLinks } from "./nav-link";
import { styles } from "./styles";

interface MobileNavigationProps {
  user: StrapiUserData | null;
}

export function MobileNavigation({ user }: MobileNavigationProps) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="sm:hidden">
          <Hamburger className="w-9 h-9" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200">
        <SheetHeader>
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/site-logo.svg"
              alt="logo"
              width={23}
              height={23}
            />
            <p className={styles.logoText}>
              Dev<span className={styles.span}>Flow</span>
            </p>
          </Link>
        </SheetHeader>
        <div className="px-6 no-scrollbar flex h-[calc(100vh-4rem)] flex-col justify-between overflow-y-auto">
          <div>
            <NavLinks navLinks={navLinks} isMobile />
          </div>
        </div>
        <SheetFooter className="flex flex-col gap-2">
        {user ? (
          <AuthUserNavButton user={user} className="flex" />
        ) : (
          <AuthButton />
        )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
