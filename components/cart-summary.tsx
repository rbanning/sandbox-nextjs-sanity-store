
function CartSummary() {
  const count = 0;
  return (
    <span className="relative  inline-flex items-center justify-center p-3">
      <span className="flex-1 text-3xl">🛒</span>
      {count > 0 && (
        <span className="absolute bottom-0 right-0 font-bold text-fuchsia-100 bg-fuchsia-700/75 py-1 px-2 rounded-[50%] text-xs">
          {count}
        </span>
      )}
    </span>
  )
}

export default CartSummary;