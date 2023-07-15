import CartDetail from "@/components/cart-detail";

function CartPage() {

  return (
    <>    
    <main className="max-w-6xl mx-auto bg-white/50 p-8 shadow-lg">      
      <h1 className="text-3xl font-light text-fuchsia-600 mb-8">Shopping Cart</h1>
      <CartDetail />
    </main>
    </>
  )
}

export default CartPage;