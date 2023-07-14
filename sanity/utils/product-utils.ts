import { ProductDetailDTO, ProductListItemDTO } from "@/types/product.model";
import { sanityClient } from "./config/sanity-client";
import { groq } from "next-sanity";
import { parseSanityDate } from "./date-helpers";


const baseProductSelector = (published: boolean = true) => `_type == "product" && ${published ? "releaseDate <= now()" : "true"}`;
const baseProductFields = `
    sku,
    name,
    "slug": slug.current,    
    releaseDate,
    brief,
    price,
    available,
    featured,
    "image": image.asset->url
  `;

const postQueryMapper = <T extends ProductDetailDTO | ProductListItemDTO>(x: T) => {
  return {
    ...x,
    releaseDate: parseSanityDate(`${x.releaseDate}`)
  } as T;
}

export async function getProducts(): Promise<ProductListItemDTO[]> {

  const result = await sanityClient.fetch<ProductListItemDTO[]>(
    groq`*[${baseProductSelector()}]{
      ${baseProductFields},
    }`
  );
  
  return result.map(postQueryMapper);
  
}

export async function getLatestProducts(count: number): Promise<ProductListItemDTO[]> {

  const result = await sanityClient.fetch<ProductListItemDTO[]>(
    groq`*[${baseProductSelector()}]
    | order(releaseDate desc)
    [0..${count}]
    {
      ${baseProductFields},
    }`
  );
  
  return result.map(postQueryMapper);
}

export async function getProduct(slug: string): Promise<ProductDetailDTO> {

  const result = await sanityClient.fetch<ProductDetailDTO>(
    groq`*[${baseProductSelector()} && slug.current == $slug]
    [0]
    {
      ${baseProductFields},
      "image": image.asset->url,
      url,
      content
    }`,
    {slug}
  );
  
  return postQueryMapper(result);

}