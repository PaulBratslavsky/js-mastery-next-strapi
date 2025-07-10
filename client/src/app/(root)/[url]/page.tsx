import { Params, SearchParams } from "@/types";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function PageRoute({ params }: PageProps) {
  const resolvedParams = await params;
  const pageTitle = resolvedParams?.url;
  return ( 
    <div className='min-h-screen w-full flex justify-center items-center'>
      <h1 className='h1-bold text-white invert-colors'>{pageTitle}</h1>
    </div>
  )
}
