// src/app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-6xl font-bold mb-4 text-red-700">404</h1>
      <p className="text-xl mb-6 text-red-800">Oops! Page not found.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-700 text-white font-semibold rounded hover:bg-red-800 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
