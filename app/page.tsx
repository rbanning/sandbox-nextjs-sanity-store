import Image from 'next/image';

import { getProjects } from '@/sanity/utils/project-utils';
import { dateFormatting, enUS } from '@/sanity/utils/date-helpers';

export default async function Home() {
  //NOTE: in v13, we can get the projects here
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 w-full max-w-xl items-center justify-between font-mono md:flex">
        <div className="relative mr-8 w-20 pb-[20%]">
          <Image src="/sandbox.svg" alt="sandbox logo" fill={true} className="object-contain"></Image>
        </div>
        <h1 className="text-3xl drop-shadow-lg">Sandbox Store</h1>
        <div className="text-xl font-light">Everything you need for your next sand adventure!</div>
      </div>

      <div className="z-10 w-full max-w-xl flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {projects.map((project) => (
          <div key={project.slug} className="my-4">
            <h3 className="text-xl"><a href="#">{project.name}</a></h3>
            <div className="font-mono text-stone-500 text-center">{project.publishedAt.toLocaleDateString(enUS, dateFormatting.MMMddYYYY)}</div>
          </div>
        ))}
      </div>



    </main>
  )
}



//NOTE: in v12 you had to use the following to get paths and props
// export function getStaticPaths() {}
// export function getStaticProps() {}
