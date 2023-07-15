import { getProducts } from '@/sanity/utils/product-utils';
import ProductCard from '@/components/product-card';

export default async function Home() {
  //NOTE: in v13, we can get the projects here
  const products = await getProducts();

  return (
    <>
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
