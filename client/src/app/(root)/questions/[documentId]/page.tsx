import { Params, SearchParams } from "@/types";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function QuestionDetailRoute({ params }: PageProps) {
  const resolvedParams = await params;
  const questionId = resolvedParams?.documentId;
    return ( 
    <div className='min-h-screen'>
      <h1 className='h1-bold text-dark100_light900'>Question Detail</h1>
      <span>Question ID: {questionId}</span>
      <div className="mt-9">
        <div>Add Component to nicely display your question.</div>
      </div>
      <div>Add Comment Component Here</div>
    </div>
  )
}
