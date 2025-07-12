import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StrapiUserData } from "@/types";

import { AuthLogoutButton } from "./auth-logout-button";

export function AuthUserNavButton({ user, className } : { readonly user: StrapiUserData, readonly className?: string }) {
  return (
    <div className={cn("items-center gap-2 md:flex", className)}>
      {user?.username}
      <Button asChild className="w-8 h-8 rounded-full">
        <Link href="/dashboard/profile" className="cursor-pointer">
          {user?.username[0].toLocaleUpperCase()}
        </Link>
      </Button>
      <AuthLogoutButton />
    </div>
  );
}