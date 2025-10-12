"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateWishlist() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique ID
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    // Create wishlist object
    const wishlist = {
      id,
      name,
      occasion,
      createdAt: new Date().toISOString(),
      items: [],
    };

    // Save to localStorage
    const wishlists = JSON.parse(localStorage.getItem("wishlists") || "{}");
    wishlists[id] = wishlist;
    localStorage.setItem("wishlists", JSON.stringify(wishlists));

    // Redirect to the wishlist page
    router.push(`/wishlist/${id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-purple-600 hover:text-purple-700 mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create Your Wishlist</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Sarah Johnson"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="occasion"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Occasion *
              </label>
              <input
                type="text"
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Birthday, Wedding, Christmas"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Create Wishlist
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
