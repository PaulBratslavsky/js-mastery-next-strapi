"use client";
import Image from "next/image";
import { toast } from "sonner";

import { getStrapiURL } from "@/lib/utils";

import { Button } from "../ui/button";

function AuthButton({
  provider,
  src,
  label,
  alt,
}: {
  provider: "github" | "google"
  src: string;
  label: string;
  alt: string;
}) {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      const strapiUrl = getStrapiURL();
      const authUrl = `${strapiUrl}/api/connect/${provider}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during sign in";
      toast.error("Failed To Sign In", {
        description: errorMessage,
      });
    }
  };

  return (
    <Button className={styles.button} onClick={() => handleSignIn(provider)}>
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className={styles.image}
      />
      <span>{label}</span>
    </Button>
  );
}

export function SocialAuthForm() {
  return (
    <div className={styles.container}>
      <AuthButton provider="github" src="/icons/github.svg" alt="GitHub Login Button" label="GitHub" />
    </div>
  );
}

const styles = {
  image: "invert-colors mr-2.5 object-contain",
  container: "mt-10 flex flex-wrap gap-2.5",
  button:
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-md px-4 py-3.5",
};
