"use client";

import { useAppSelector, useAppDispatch } from "@/store";
import { increment, decrement, remove, totalQtySelector, totalPriceSelector } from "@/store/features/cart/cartSlice";
import Image from "next/image";


function CartDetail() {
  const items = useAppSelector((state) => state.cart.items);
  const totalQty = useAppSelector((state) => totalQtySelector(state));
  const totalCost = useAppSelector((state) => totalPriceSelector(state));

  const dispatch = useAppDispatch();

  const amount = (value: number, includeCurrency = true) => {
    return `${includeCurrency ? '£' : ''}${(Math.round(value * 100) / 100).toFixed(2)}`
  }

  return (
    <div className="">
      {items?.length > 0 && (
        <>
        {items.map(({product, qty}) => (
          <div key={product.sku} className="flex my-8 border-b-2 border-b-slate-100">
          <Image
            src={product.image}
            alt="product image"
            width={200}
            height={200} />
          <div className="mx-4 flex-1">
            <div className=" text-lg">{product.name}</div>
            <div className="my-2 font-bold text-lg">
              {qty} @ &pound;{product.price}
            </div>
            <div className="flex items-center text-sm">
              <button
              onClick={() => dispatch(decrement(product))} 
              className="border-2 border-slate-100 flex justify-center items-center py-1 px-2 text-base">-</button>
              <span className="py-2">
                Qty: {qty}
              </span>
              <button
              onClick={() => dispatch(increment(product))} 
              className="border-2 border-slate-100 flex justify-center items-center py-1 px-2 text-base">+</button>
              <span className="px-4 text-slate-400">|</span>
              <button
              onClick={() => dispatch(remove(product))} 
              className="border-none text-rose-500 px-1">Delete</button>
            </div>
            <div className="text-xl text-right">
              Subtotal ({qty} item{qty > 1 ? 's' : ''}): <span className="font-bold">{amount(qty * product.price)}</span> 
            </div>
          </div>
        </div>
        ))}
        <div className="my-4 py-8 border-t-2 border-t-slate-700 text-2xl text-right">
          TOTAL: ({totalQty} item{totalQty > 1 ? 's' : ''}): <span className="text-fuchsia-700">{amount(totalCost)}</span> 
        </div>
        </>
      )}

      {!items?.length && (
        <div className="text-xl font-bold">No items in your cart.</div>
      )}
      
    </div>
  )
}

export default CartDetail;