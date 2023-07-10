/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-xl items-center justify-between font-mono text-sm lg:flex">
        <img src="/sandbox.svg" alt="sandbox logo" className="w-16 aspect-auto mr-8"></img>
        <h1 className="text-3xl drop-shadow-lg">Sandbox Store</h1>
        <div className="text-xl font-light">Everything you need for your next sand adventure!</div>
      </div>
    </main>
  )
}
