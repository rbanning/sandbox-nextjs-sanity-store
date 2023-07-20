
import { ProductDetailDTO } from "@/types/product.model";
import Image from "next/image";
import ProductAvailability from "./product-availability";
import ProductFeatured from "./product-featured";
import AddToCart from "./add-to-cart";
import NotifyMeWhenAvailable from "./notify-me-when-available";
import BlockContent from "./block-content";
import ProductComments from "./product-comments";
import ProductCommentForm from "./product-comment-form";


export type CommentStatus = 'read-only' | 'read-create' | 'none';

function ProductDetail({product, comments}: {product: ProductDetailDTO, comments?: CommentStatus}) {
  comments = comments || 'none';

  const discount = Math.floor(Math.random() * 20 + 10);
  const amount = (value: number, includeCurrency = true) => {
    return `${includeCurrency ? '£' : ''}${(Math.round(value * 100) / 100).toFixed(2)}`
  }
  const amountBeforeDiscount = (value: number, includeCurrency = true) => {
    value = value / (1 - discount/100);
    return `${includeCurrency ? '£' : ''}${(Math.round(value * 100) / 100).toFixed(2)}`
  }

  return (
    <div className="relative w-full max-w-xl mx-auto h-full flex flex-col">
      <div className="relative w-full h-auto ">
        {product.image && (
          <Image 
            src={product.image} 
            alt="product image"
            width={576}
            height={384}
          />
        )}
        <div className="z-10 flex justify-between items-center">
          <ProductAvailability available={product.available} />
          {product.featured && (
            <span className="text-2xl -rotate-45">
              <ProductFeatured />
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col items-center flex-1">
        <div className="text-slate-400 text-xs text-center">
          Category
        </div>
        <h1 className="text-slate-800 mt-1 text-4xl font-light text-center">
          {product.name}
        </h1>
        <div className="text-slate-600 font-light text-xl my-4 py-4 border-y-2 border-y-fuchsia-800 text-center">
          {product.brief}
        </div>
        <div className="my-4">
          <BlockContent content={product.content} />
        </div>
      </div>

      <div className="p-4 border-2 border-fuchsia-300 rounded shadow-md flex flex-col items-center">

        
        <h3 className="text-2xl text-fuchsia-700">On Sale (save {discount}%)</h3>
        <div className="text-slate-900 text-center">
          <span className="inline-block mx-1 line-through text-slate-500 italic">{amountBeforeDiscount(product.price)}</span>
          <span className="inline-block mx-1 font-semibold text-slate-900 text-xl">{amount(product.price)}</span>
        </div>          

        {product.available && (
          <AddToCart product={product} />
        )}
        {!product.available && (
          <>
            <div className="font-bold text-rose-600 text-center">Sorry - none in stock at this time</div>
            <NotifyMeWhenAvailable product={product} />
          </>
        )}

      </div>

      {(comments === 'read-only' || comments === 'read-create') && (
        <div className="my-8">
          <h2 className="text-2xl font-light">Comments</h2>
          <ProductComments comments={product.comments} />

          {comments === 'read-create' && (
            <div className="my-12 p-4 border-t-2 border-t-slate-400">
              <div className="text-xl mb-8">Would you like to write a comment?</div>
              <ProductCommentForm />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductDetail;