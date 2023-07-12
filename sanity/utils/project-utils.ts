import { ProjectDetailDTO, ProjectListItemDTO } from "@/types/project.model";
import { sanityClient } from "./config/sanity-client";
import { groq } from "next-sanity";
import { parseSanityDate } from "./date-helpers";


const baseProjectSelector = (published: boolean = true) => `_type == "project" && ${published ? "publishedAt <= now()" : "true"}`;
const baseProjectFields = `
    name,
    "slug": slug.current,
    publishedAt
  `;

const postQueryMapper = <T extends ProjectDetailDTO | ProjectListItemDTO>(x: T) => {
  return {
    ...x,
    publishedAt: parseSanityDate(`${x.publishedAt}`)
  } as T;
}

export async function getProjects(): Promise<ProjectListItemDTO[]> {

  const result = await sanityClient.fetch<ProjectListItemDTO[]>(
    groq`*[${baseProjectSelector()}]{
      ${baseProjectFields},
    }`
  );
  
  return result.map(postQueryMapper);
  
}

export async function getLatestProjects(count: number): Promise<ProjectListItemDTO[]> {

  const result = await sanityClient.fetch<ProjectListItemDTO[]>(
    groq`*[${baseProjectSelector()}]
    | order(publishedAt desc)
    [0..${count}]
    {
      ${baseProjectFields},
    }`
  );
  
  return result.map(postQueryMapper);
}

export async function getProject(slug: string): Promise<ProjectDetailDTO> {

  const result = await sanityClient.fetch<ProjectDetailDTO>(
    groq`*[${baseProjectSelector()} && slug.current == $slug]
    [0]
    {
      ${baseProjectFields},
      "image", image.asset->url,
      url,
      content
    }`,
    {slug}
  );
  
  return postQueryMapper(result);
}