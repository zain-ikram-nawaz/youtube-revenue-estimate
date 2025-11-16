import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-700">404</h1>
      <p className="text-xl mb-6 text-red-800">Page not found.</p>
      <Link href="/" className="px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800">
        Go Home
      </Link>
    </div>
  );
}
