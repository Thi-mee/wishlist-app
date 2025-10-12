import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 mt-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🎁 WishList</h1>
          <p className="text-xl text-gray-600">
            Create and share your perfect gift registry
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6">
            Create a wishlist, add your favorite items, and share it with
            friends and family
          </p>
          <Link
            href="/create"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Create Your Wishlist
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold mb-2">Easy to Create</h3>
            <p className="text-gray-600 text-sm">
              Add items with just a name, link, and price
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="font-semibold mb-2">Share Anywhere</h3>
            <p className="text-gray-600 text-sm">
              Get a unique link to share with anyone
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2">Track Claims</h3>
            <p className="text-gray-600 text-sm">
              See what's been claimed without spoiling surprises
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
