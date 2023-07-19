"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { productQtySelector, decrement, increment, remove } from "@/store/features/cart/cartSlice";
import { ProductListItemDTO } from "@/types/product.model";
import Button from "./button";

function AddToCart({product} : {product: ProductListItemDTO}) {
  const qty = useAppSelector((state) => productQtySelector(state, product.sku));
  const dispatch = useAppDispatch();

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-2 ">
        <button 
          onClick={() => dispatch(decrement(product))}
          disabled={!qty}
          className="border-2 border-slate-100 text-base flex justify-center items-center py-2 px-4 hover:border-slate-200 hover:bg-slate-50 transition-colors active:bg-slate-100 active:text-slate-400">-</button>
        <span className="bg-slate-100 border-2 border-slate-100 text-base flex justify-center items-center py-2 px-4">{qty || 0}</span>          
        <button
          onClick={() => dispatch(increment(product))} 
          className="border-2 border-slate-100 text-base flex justify-center items-center py-2 px-4 hover:border-slate-200 hover:bg-slate-50 transition-colors active:bg-slate-100 active:text-slate-400">+</button>
      </div>
      {!qty && (
      <Button        
        type="solid"
        color="primary"
        onClick={() => dispatch(increment(product))}
        className="block w-full">
        Add to cart
      </Button>
      )}
      {qty && (qty > 0) && (
      <Button 
        type="solid"
        color="accent"
        onClick={() => dispatch(remove(product))}
        className="block w-full">
        Remove from cart
      </Button>
      )}
    </div>
  );
}

export default AddToCart;