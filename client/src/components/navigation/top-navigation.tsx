import Image from "next/image";
import Link from "next/link";

import { AuthButton, AuthUserNavButton } from "@/components/auth";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import { LocalSearch } from "@/components/search/local-search";
import { cn } from "@/lib/utils";
import { StrapiUserData } from "@/types";

import { MobileNavigation } from "./mobile-navigation";
import { styles } from "./styles";

interface TopNavigationProps {
  user: StrapiUserData | null;
}

export function TopNavigation({ user }: TopNavigationProps) {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        />
        <p className={cn(styles.logoText, "max-sm:hidden")}>
          Dev<span className={styles.span}>Flow</span>
        </p>
      </Link>

      <LocalSearch route="/search" placeholder="Search anything..." />

      <div className="flex gap-2">
        {user ? (
          <AuthUserNavButton user={user} className="hidden sm:block" />
        ) : (
          <AuthButton />
        )}
        <ThemeToggle />
        <MobileNavigation user={user} />
      </div>
    </nav>
  );
}
