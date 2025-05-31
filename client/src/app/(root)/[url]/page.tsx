
export default async function PageRoute({ params }: { params: { url: string } }) {
  const resolvedParams = await params;
  const pageTitle = resolvedParams.url.charAt(0).toUpperCase() + resolvedParams.url.slice(1);
  return ( 
    <div className='min-h-screen w-full flex justify-center items-center'>
      <h1 className='h1-bold text-white invert-colors'>{pageTitle}</h1>
    </div>
  )
}
