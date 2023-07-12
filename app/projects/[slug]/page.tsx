import { dateFormatting, enUS } from "@/sanity/utils/date-helpers";
import { getProject } from "@/sanity/utils/project-utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { slug: string }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = await getProject(slug);

  return (
    <main className="p-24">
      {project && (
        <>
        <h1 className="text-3xl font-semibold mb-4">{project.name}</h1>
        <div className="font-mono text-stone-500">{project.publishedAt.toLocaleDateString(enUS, dateFormatting.MMMddYYYY)}</div>
        {project.image && (
          <Image src={project.image} alt={project.name} width={350} height={275} />
        )}
        </>
      )}
      {!project && (
        <>
        <h1>Error</h1>
        <p>Could not locate the project requested</p>
        </>
      )}
      
      <p>
        <Link href="/">Back Home</Link>
      </p>
    </main>
  )
}