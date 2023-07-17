import Link from "next/link";
import CartSummary from "./cart-summary";
import Image from "next/image";
import AccountIcon from "./account-icon";

function PageHeader() {
  return (
    <header className="bg-fuchsia-50 py-2 border-b-4 border-b-slate-200 mb-4 px-2 md:py-4 xl:px-8">
      <div className="flex items-center md:max-w-6xl md:mx-auto">
      <Image
          src="/sandbox-64.png"
          alt="sandbox icon"
          width={30}
          height={20} />
        <Link href="/" className="text-fuchsia-300 text-xl flex-1 text-center">The Sandbox Store</Link>
        <AccountIcon />
        <Link href="/cart">
          <CartSummary />
        </Link>
      </div>
    </header>
  )
}

export default PageHeader;