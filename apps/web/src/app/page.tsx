export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          💊 RxConnect
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Prescription management made simple.
          <br />
          Automatic refills, delivered to your door.
        </p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <p className="text-gray-500 text-base">
            🚧 Stage 1 complete — project scaffold ready.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Authentication coming in Stage 2.
          </p>
        </div>
      </div>
    </main>
  )
}
