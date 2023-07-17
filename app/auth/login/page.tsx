import AccountLogin from "@/components/account-login";

export default async function LoginPage() {
  return (
    <>
    <main className="max-w-6xl mx-auto bg-white/50 p-8 shadow-lg">      
      <h1 className="text-3xl font-light text-fuchsia-600 mb-8">Login</h1>
      <AccountLogin />
    </main>
    </>
  )
}
