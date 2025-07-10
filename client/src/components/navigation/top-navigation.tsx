import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/custom/theme-toggle";
import { UserButton } from "@/components/custom/user-button";
import { LocalSearch } from "@/components/search/local-search";
import { cn } from "@/lib/utils";

import { MobileNavigation } from "./mobile-navigation";
import { styles } from "./styles";


export function TopNavigation() {
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

      <LocalSearch
        route="/search"
        placeholder="Search anything..."
      />

      <div className="flex gap-2">
        <UserButton className="hidden sm:block" />
        <ThemeToggle />
        <MobileNavigation />
      </div>
    </nav>
  );
}
