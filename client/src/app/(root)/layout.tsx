import {
  LeftSidebar,
  RightSidebar,
  TopNavigation,
} from "@/components/navigation";
import { getUserMeLoader } from "@/data/api/services/user";
import { logger } from "@/lib/logger";

// Force dynamic rendering for the entire app
export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;
}

async function loader() {
  try {
    const user = await getUserMeLoader();
    logger.info("DashboardLayout", { user });
    return user?.data;
  } catch (error) {
    console.error("Failed to load user:", error);
    throw error;
  }
}

export default async function DashboardLayout(props: Props) {
  const { children } = props;
  const user = await loader();
  return (
    <main className="h-screen background-light850_dark100 relative overflow-hidden">
      <TopNavigation user={user} />
      <div className="flex h-[calc(100vh-4rem)]">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl overflow-y-auto">
            {children}
          </div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
}
