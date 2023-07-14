"use client";

import { ProductListItemDTO } from "@/types/product.model";

function NotifyMeWhenAvailable({product}: {product: ProductListItemDTO}) {
  if (product.available) { return null; } //check

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center mt-2 ">
        <span className="text-fuchsia-600 font-light">
          Notify Me When Available
        </span>
        <input 
          type="text" 
          placeholder="enter your email address..."
          className="block my-2 w-full border-2 rounded border-fuchsia-100 focus:border-fuchsia-600 text-lg px-4 py-1 focus:outline-none" />
        <button 
          onClick={() => console.log('Recorded')}
          className="border-2 border-fuchsia-800 rounded bg-fuchsia-50 text-fuchsia-800 text-lg flex justify-center items-center py-1 px-4">
            Submit
          </button>
      </div>
    </div>
  )
}

export default NotifyMeWhenAvailable;
