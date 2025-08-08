import { QuestionForm } from "@/components/forms/question-form";
export default async function AskQuestionRoute() {
  return ( 
    <div className='min-h-screen'>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </div>
  )
}
