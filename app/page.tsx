import Link from 'next/link';
import Image from 'next/image';

import { getProjects } from '@/sanity/utils/project-utils';
import { dateFormatting, enUS } from '@/sanity/utils/date-helpers';

export default async function Home() {
  //NOTE: in v13, we can get the projects here
  const projects = await getProjects();

  return (
    <main className="flex flex-col items-center justify-between p-24">

      <div className="w-full max-w-xl items-center justify-between font-mono md:flex">
        <div className="relative mr-8 w-20 pb-[20%]">
          <Image src="/sandbox.svg" alt="sandbox logo" fill={true} className="object-contain"></Image>
        </div>
        <h1 className="text-3xl drop-shadow-lg">Sandbox Store</h1>
        <div className="text-xl font-light">Everything you need for your next sand adventure!</div>
      </div>

      <div className="my-8 w-full max-w-xl flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold pb-1 border-b-2 border-b-fuchsia-500">Projects</h2>
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className="my-4 hover:scale-105 transition-transform">
            <h3 className="text-xl">{project.name}</h3>
            <div className="font-mono text-stone-500 text-center">{project.publishedAt.toLocaleDateString(enUS, dateFormatting.MMMddYYYY)}</div>
          </Link>
        ))}
      </div>

    </main>
  )
}



//NOTE: in v12 you had to use the following to get paths and props
// export function getStaticPaths() {}
// export function getStaticProps() {}
