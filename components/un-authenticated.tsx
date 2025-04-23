import Link from "next/link";

export default function NotAuthenticatedPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className=" shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You are not authenticated to view this page. Please log in to
          continue.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
