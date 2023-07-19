import { ProductDetailDTO, ProductListItemDTO } from "@/types/product.model";
import { sanityClient } from "./config/sanity-client";
import { groq } from "next-sanity";
import { parseSanityDate } from "./date-helpers";


const baseProductSelector = (published: boolean = true) => `_type == "product" && ${published ? "releaseDate <= now()" : "true"}`;
const baseProductFields = `
    sku,
    name,
    "slug": slug.current,    
    brief,
    price,
    available,
    featured,
    "image": image.asset->url
  `;

// releaseDate is not in the both DTOs so we pass it separately
const postQueryMapper = <T extends ProductDetailDTO | ProductListItemDTO>(x: T, releaseDate?: string) => {  
  return {
    ...x,
    releaseDate: releaseDate ? parseSanityDate(`${releaseDate}`) : undefined
  } as T;
}

export async function getProducts(): Promise<ProductListItemDTO[]> {

  const result = await sanityClient.fetch<ProductListItemDTO[]>(
    groq`*[${baseProductSelector()}]{
      ${baseProductFields},
    }`
  );
  
  return result.map(m => postQueryMapper(m));
  
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
  
  return result.map(m => postQueryMapper(m));
}

export async function getProduct(slug: string): Promise<ProductDetailDTO> {

  const result = await sanityClient.fetch(
    groq`*[${baseProductSelector()} && slug.current == $slug]
    [0]
    {
      ${baseProductFields},
      releaseDate,
      content
    }`,
    {slug}
  );
  
  return postQueryMapper(result, result.releaseDate);

}