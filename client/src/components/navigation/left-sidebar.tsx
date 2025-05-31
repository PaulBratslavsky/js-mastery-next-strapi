import React from 'react';

import { navLinks } from "@/constants/nav-links";

import { NavLinks } from "./nav-link";

export function LeftSidebar() {
  return (
    <div className="background-light900_dark200 sticky left-0 top-0 flex h-screen w-[266px] flex-col justify-between overflow-y-auto p-6 pt-36 max-sm:hidden">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks navLinks={navLinks} />
      </div>
    </div>
  );
}

