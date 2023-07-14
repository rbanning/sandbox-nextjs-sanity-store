import { getProducts } from '@/sanity/utils/product-utils';
import ProductCard from '@/components/product-card';
import CartSummary from '@/components/cart-summary';

export default async function Home() {
  //NOTE: in v13, we can get the projects here
  const products = await getProducts();

  return (
    <>
    <header className="bg-fuchsia-50 flex items-center py-2 border-b-4 border-b-slate-200 mb-4 px-2 md:py-4 xl:px-8">
      <span>🤪</span>
      <span className="text-fuchsia-300 text-xl flex-1 text-center">The Sandbox Store</span>
      <span>
        <CartSummary />
      </span>
    </header>
    <main className="max-w-6xl mx-auto bg-white/50 p-8 shadow-lg">      
      <h1 className="text-3xl font-light text-fuchsia-600 mb-8">The Sandbox Store</h1>
      <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {products.map(product => (
          <div key={product.slug} className="round-sm shadow w-80 bg-slate-50 mb-4 transition-all hover:shadow-lg hover:bg-white">
            <ProductCard product={product} />
          </div>
        ))}
        
      </div>

    </main>
    </>
  )
}



//NOTE: in v12 you had to use the following to get paths and props
// export function getStaticPaths() {}
// export function getStaticProps() {}
