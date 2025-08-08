import { Params, SearchParams } from "@/types";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function QuestionDetailRoute({ params }: PageProps) {
  const resolvedParams = await params;
  const questionId = resolvedParams?.documentId;
  return ( 
    <div className='min-h-screen w-full flex justify-center items-center'>
      <h1 className='h1-bold text-white invert-colors'>{questionId}</h1>
    </div>
  )
}
