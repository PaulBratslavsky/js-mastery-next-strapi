import {
  LeftSidebar,
  RightSidebar,
  TopNavigation,
} from "@/components/navigation";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout(props: Props) {
  const { children } = props;
  return (
    <main className="h-screen background-light850_dark100 relative overflow-hidden">
      <TopNavigation />
      <div className="flex h-[calc(100vh-4rem)]">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
}
