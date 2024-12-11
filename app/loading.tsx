import BryFlyHero from 'app/ui/bryfly-hero'

export default function Loading () {
  return (
    <main className='mx-auto max-w-[1960px] p-4 w-full'>
      <div className='gap-4 columns-1 sm:columns-2 xl:columns-3 2xl:columns-4'>
        <BryFlyHero />
        {Array.from(Array(7)).map((_, i) => (
          <div
            key={i}
            className='w-full aspect-video break-inside-avoid-column rounded-lg
              bg-gradient-to-br from-slate-800 to-slate-900/60  mb-4'
          />
        ))}
      </div>
    </main>
  )
}
