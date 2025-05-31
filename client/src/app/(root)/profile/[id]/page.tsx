
export default async function SingleProfileRoute({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const pageTitle = resolvedParams.id;
  return ( 
    <div className='min-h-screen w-full flex justify-center items-center'>
      <h1 className='h1-bold text-white invert-colors'>{pageTitle}</h1>
    </div>
  )
}
