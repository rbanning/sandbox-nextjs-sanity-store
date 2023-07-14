
import { ProductListItemDTO } from "@/types/product.model";
import Image from "next/image";
import ProductAvailability from "./product-availability";
import ProductFeatured from "./product-featured";



function ProductCard({product}: {product: ProductListItemDTO}) {

  return (
    <div className="relative w-80 h-full flex flex-col">
      <div className="relative w-full h-48 flex flex-col justify-end p-4 overflow-hidden">
        {product.image && (
          <div className="absolute opacity-95 top-0 left-0">
            <Image 
              src={product.image} 
              alt="product image"
              width={320}
              height={192} />
          </div>
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
      </div>

      <div className="p-4 pt-0 flex flex-col items-center">

        <div className="text-slate-900 text-lg text-center">
          &pound; {product.price}
        </div>
        
        <div className="flex justify-center items-center mt-2">
          <button className="border-2 border-slate-100 text-xl flex justify-center items-center py-2 px-4">-</button>
          <span className="bg-slate-100 text-xl flex justify-center items-center py-2 px-4">1</span>          
          <button className="border-2 border-slate-100 text-xl flex justify-center items-center py-2 px-4">+</button>
        </div>
        <button className="block w-full my-1 py-2 border-none bg-fuchsia-800 rounded text-lg text-white text-center">
          Add to cart 🛒
        </button>

      </div>
    </div>
  )
}

export default ProductCard;