"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { productQtySelector, decrement, increment, remove } from "@/store/features/cart/cartSlice";
import { ProductListItemDTO } from "@/types/product.model";

function AddToCart({product} : {product: ProductListItemDTO}) {
  const qty = useAppSelector((state) => productQtySelector(state, product.sku));
  const dispatch = useAppDispatch();

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-2 ">
        <button 
          onClick={() => dispatch(decrement(product))}
          disabled={!qty}
          className="border-2 border-slate-100 text-xl flex justify-center items-center py-2 px-4">-</button>
        <span className="bg-slate-100 text-xl flex justify-center items-center py-2 px-4">{qty || 0}</span>          
        <button
          onClick={() => dispatch(increment(product))} 
          className="border-2 border-slate-100 text-xl flex justify-center items-center py-2 px-4">+</button>
      </div>
      {!qty && (
      <button 
        onClick={() => dispatch(increment(product))}
        className="block w-full my-1 py-2 px-4 border-none bg-fuchsia-800 rounded text-lg text-fuchsia-50 text-center">
        Add to cart
      </button>
      )}
      {qty && (qty > 0) && (
      <button 
        onClick={() => dispatch(remove(product))}
        className="block w-full my-1 py-2 px-4 border-none bg-rose-800 rounded text-lg text-rose-50 text-center">
        Remove from cart
      </button>
      )}
    </div>
  );
}

export default AddToCart;