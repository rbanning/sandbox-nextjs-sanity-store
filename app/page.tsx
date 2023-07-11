import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-xl items-center justify-between font-mono text-sm lg:flex">
        <div className="relative mr-8 w-20 pb-[20%]">
          <Image src="/sandbox.svg" alt="sandbox logo" fill={true} className="object-contain"></Image>
        </div>
        <h1 className="text-3xl drop-shadow-lg">Sandbox Store</h1>
        <div className="text-xl font-light">Everything you need for your next sand adventure!</div>
      </div>
    </main>
  )
}
