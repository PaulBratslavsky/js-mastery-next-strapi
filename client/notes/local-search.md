``` jsx
"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "@/components/ui/input";

interface LocalSearchProps {
    route: string;
    imgSrc?: string;
    placeholder: string;
    otherClasses?: string;
}

export function LocalSearch({
    // route,
    imgSrc,
    placeholder,
    otherClasses,
}: LocalSearchProps) {
    const [inputValue, setInputValue] = useState("");
    const [_, setSearchQuery] = useQueryState("query", {
        defaultValue: "",
        shallow: false,
    });

    const debouncedValue = useDebounce(inputValue, 500);
    console.log(_);

    useEffect(() => {
        setSearchQuery(debouncedValue[0]);
    }, [debouncedValue, setSearchQuery]);

    return (
        <div
            className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
        >
            { imgSrc ? (
            <Image
                src={imgSrc}
                width={24}
                height={24}
                alt="search"
                className="cursor-pointer"
            />
            ) : (
                <Search className="h-5 w-5 text-dark-100" />
            )}
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                value={inputValue}
                className="dark:bg-background-light800_darkgradient paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
            />
        </div>
    );
};

```

``` tsx
"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "@/components/ui/input";

interface LocalSearchProps {
  route: string;
  imgSrc?: string;
  placeholder: string;
  otherClasses?: string;
}

export function LocalSearch({
  // route,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchProps) {
  const [query, setSearchQuery] = useQueryState("query", {
    defaultValue: "",
    shallow: false,
  });
  const [inputValue, setInputValue] = useState(query || "");

  const [debouncedValue] = useDebounce(inputValue, 500);

  // Update input value when URL query changes (e.g., on page load or navigation)
  useEffect(() => {
    setInputValue(query || "");
  }, [query]);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      ) : (
        <Search className="h-5 w-5 text-dark-100" />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
        className="dark:bg-background-light800_darkgradient paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
}
```