"use client";
// https://sonner.emilkowal.ski/
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { ROUTES } from "@/constants/routes";

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
      signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: true,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occured during singin";
      toast.error("Failed To Sign In", {
        description: errorMessage,
      });
    } finally {
      toast.success("Success");
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
