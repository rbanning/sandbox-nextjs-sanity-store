import BlockContent from "@/components/block-content";
import Button from "@/components/button";
import { dateFormatting, enUS } from "@/sanity/utils/date-helpers";
import { getProduct } from "@/sanity/utils/product-utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params;
  const product = await getProduct(slug);

  return (
    <main className="p-24 flex flex-col items-center">
      {product && (
        <>
        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
        <div className="font-mono text-stone-500">{product.releaseDate.toLocaleDateString(enUS, dateFormatting.MMMddYYYY)}</div>
        {product.image && (
          <Image src={product.image} alt={product.name} width={350} height={275} />
        )}
        <div className="my-4">
          <BlockContent content={product.content} />
        </div>
        </>
      )}
      {!product && (
        <>
        <h1>Error</h1>
        <p>Could not locate the product requested</p>
        </>
      )}
      
      <div className="my-12">
        <h3>More...</h3>
        <div className="flex items-center">
          <Button href="/" type="solid" className="mx-4">Back Home</Button>
          <Button href="/" className="mx-4">Back Home</Button>
          <Button href="/" type="outline" className="mx-4">Back Home</Button>
        </div>
        <div className="flex items-center">
          <Button href="/" color="accent" type="solid" className="mx-4">Back Home</Button>
          <Button href="/" color="accent" className="mx-4">Back Home</Button>
          <Button href="/" color="accent" type="outline" className="mx-4">Back Home</Button>
        </div>
      </div>
      <p>
      </p>
    </main>
  )
}