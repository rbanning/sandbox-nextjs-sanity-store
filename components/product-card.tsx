
import { ProductListItemDTO } from "@/types/product.model";
import Image from "next/image";
import ProductAvailability from "./product-availability";
import ProductFeatured from "./product-featured";
import AddToCart from "./add-to-cart";
import NotifyMeWhenAvailable from "./notify-me-when-available";
import Link from "next/link";



function ProductCard({product}: {product: ProductListItemDTO}) {
  const amount = (value: number, includeCurrency = true) => {
    return `${includeCurrency ? '£' : ''}${(Math.round(value * 100) / 100).toFixed(2)}`
  }

  return (
    <div className="relative w-80 h-full flex flex-col">
      <div className="relative w-full h-48 flex flex-col justify-end p-4 overflow-hidden">
        {product.image && (
          <Link href={`/products/${product.slug}`} className="absolute opacity-95 top-0 left-0">
            <Image 
              src={product.image} 
              alt="product image"
              width={384}
              height={256}
              />
          </Link>
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
        <div className="text-slate-400 font-light text-xs text-center">
          Category
        </div>
        <h3 className="text-slate-800 mt-1 text-lg text-center">
          {product.name}
        </h3>
        <div className="text-slate-600 font-light text-sm text-center">
          {product.brief}
        </div>
        <div className="text-center mt-2">
          <Link href={`/products/${product.slug}`} className="text-fuchsia-600">Explore...</Link>
        </div>
      </div>

      <div className="p-4 pt-0 flex flex-col items-center">

        <div className="text-slate-900 text-lg text-center">
          {amount(product.price)}
        </div>
        
        {product.available && (
          <AddToCart product={product} />
        )}
        {!product.available && (
          <NotifyMeWhenAvailable product={product} />
        )}

      </div>
    </div>
  )
}

export default ProductCard;