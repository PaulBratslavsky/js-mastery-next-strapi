"use client"; 

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  isMobile?: boolean;
  navLinks: {
    href: string;
    label: string;
    imgUrl?: string;
  }[];
}

const userId = 3;

export function NavLinks({ navLinks, isMobile }: NavLinkProps) {
  const pathname = usePathname();

  const LinkWrapper = isMobile ? SheetClose : React.Fragment;

  return (
    <nav className="flex flex-col gap-2">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const isActiveLink = isActive
          ? "primary-gradient rounded text-light-900"
          : "text-dark300_light900";

        if (link.href === "/profile") {
          if (userId) link.href = `/profile/${userId}`;
          else return null;
        }

        return (
          <LinkWrapper key={link.href}>
            <Link
              href={link.href}
              className={cn("flex items-center gap-2 px-2 py-1 w-full", isActiveLink)}
            >
              {link.imgUrl && (
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={20}
                  height={20}
                  className={cn(!isActive && "invert-colors")}
                />
              )}
              <p
                className={cn(
                  isActive ? "base-bold" : "base-medium",
                  isActive ? "text-light-900" : "text-dark-100 dark:text-light-900"
                )}
              >
                {link.label}
              </p>
            </Link>
          </LinkWrapper>
        );
      })}
    </nav>
  );
}