import Image from "next/image";

import { SocialAuthForm } from "@/components/forms/social-auth-form";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout(props: Props) {
  const { children } = props;
  return (
    <main className={styles.layout}>
      <section className={styles.section}>
        <div className={styles.flex}>
          <div className={styles.space}>
            <h1 className={styles.heading}>Join DevFlow</h1>
            <p className={styles.paragraph}>To get your questions answered.</p>
          </div>
          <Image 
            src={"images/site-logo.svg"}
            alt="DevFlow Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
}

const styles = {
  flex: "flex items-center justify-between gap-2",
  space: "space-y-2.5",
  heading: "h2-bold text-dark100_light900",
  paragraph: "paragraph-regular text-dark500_light400",
  layout: "flex min-h-screen items-center justify-center",
  section:
    "light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8",
};
