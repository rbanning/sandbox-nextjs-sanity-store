import BlockContent from "@/components/block-content";
import Button from "@/components/button";
import ProductComments from "@/components/product-comments";
import ProductDetail from "@/components/product-detail";
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
    <main className="p-8 flex flex-col items-center">
      {product && (
        <>
        <ProductDetail product={product} comments="read-create" />
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
        <div className="flex items-center my-8">
          <Button href="/" color="accent" type="solid" className="mx-4">Back Home</Button>
          <Button href="/" color="accent" className="mx-4">Back Home</Button>
          <Button href="/" color="accent" type="outline" className="mx-4">Back Home</Button>
        </div>
        <div className="flex items-center my-8">
          <Button href="/" color="black" type="solid" className="mx-4">Back Home</Button>
          <Button href="/" color="black" className="mx-4">Back Home</Button>
          <Button href="/" color="black" type="outline" className="mx-4">Back Home</Button>
        </div>
        <div className="flex items-center my-8 p-8 bg-slate-900">
          <Button href="/" color="white" type="solid" className="mx-4">Back Home</Button>
          <Button href="/" color="white" className="mx-4">Back Home</Button>
          <Button href="/" color="white" type="outline" className="mx-4">Back Home</Button>
        </div>
        <div className="flex items-center my-8">
          <Button href="/" color="slate" type="solid" className="mx-4">Back Home</Button>
          <Button href="/" color="slate" className="mx-4">Back Home</Button>
          <Button href="/" color="slate" type="outline" className="mx-4">Back Home</Button>
        </div>
      </div>
      <p>
      </p>
    </main>
  )
}