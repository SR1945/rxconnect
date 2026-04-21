import Link from 'next/link'

/**
 * Auth Layout — wraps /login and /signup.
 * Clean, centered design with the RxConnect brand at the top.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="py-8 text-center">
        <Link href="/" className="inline-block no-underline">
          <p className="text-4xl mb-1">💊</p>
          <h1 className="text-2xl font-bold text-primary-700">RxConnect</h1>
          <p className="text-gray-500 mt-1 text-base font-normal">
            Prescription management made simple
          </p>
        </Link>
      </header>
      <main className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
