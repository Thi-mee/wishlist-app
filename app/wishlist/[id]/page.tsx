"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface WishlistItem {
  id: string;
  name: string;
  link: string;
  price: string;
  claimed: boolean;
  claimedBy?: string;
}

interface Wishlist {
  id: string;
  name: string;
  occasion: string;
  createdAt: string;
  items: WishlistItem[];
}

export default function WishlistPage() {
  const params = useParams();
  const id = params.id as string;

  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  // Form states
  const [itemName, setItemName] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  useEffect(() => {
    // Load wishlist from localStorage
    const wishlists = JSON.parse(localStorage.getItem("wishlists") || "{}");
    const currentWishlist = wishlists[id];

    if (currentWishlist) {
      setWishlist(currentWishlist);
      // Check if user is owner (stored in a separate key)
      const ownerIds = JSON.parse(localStorage.getItem("myWishlists") || "[]");
      setIsOwner(ownerIds.includes(id));
    }
  }, [id]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!wishlist) return;

    const newItem: WishlistItem = {
      id: Date.now().toString(),
      name: itemName,
      link: itemLink,
      price: itemPrice,
      claimed: false,
    };

    const updatedWishlist = {
      ...wishlist,
      items: [...wishlist.items, newItem],
    };

    // Save to localStorage
    const wishlists = JSON.parse(localStorage.getItem("wishlists") || "{}");
    wishlists[id] = updatedWishlist;
    localStorage.setItem("wishlists", JSON.stringify(wishlists));

    // Mark as owner
    const ownerIds = JSON.parse(localStorage.getItem("myWishlists") || "[]");
    if (!ownerIds.includes(id)) {
      ownerIds.push(id);
      localStorage.setItem("myWishlists", JSON.stringify(ownerIds));
    }

    setWishlist(updatedWishlist);
    setItemName("");
    setItemLink("");
    setItemPrice("");
    setShowAddItem(false);
  };

  const toggleClaim = (itemId: string, claimerName?: string) => {
    if (!wishlist) return;

    const updatedItems = wishlist.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          claimed: !item.claimed,
          claimedBy: !item.claimed ? claimerName : undefined,
        };
      }
      return item;
    });

    const updatedWishlist = { ...wishlist, items: updatedItems };

    const wishlists = JSON.parse(localStorage.getItem("wishlists") || "{}");
    wishlists[id] = updatedWishlist;
    localStorage.setItem("wishlists", JSON.stringify(wishlists));

    setWishlist(updatedWishlist);
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  if (!wishlist) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Wishlist Not Found</h1>
          <Link href="/" className="text-purple-600 hover:text-purple-700">
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-purple-600 hover:text-purple-700 mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {wishlist.name}'s Wishlist
              </h1>
              <p className="text-gray-600">{wishlist.occasion}</p>
            </div>
            <button
              onClick={copyLink}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
            >
              📋 Copy Link
            </button>
          </div>
        </div>

        {isOwner && (
          <div className="mb-6">
            {!showAddItem ? (
              <button
                onClick={() => setShowAddItem(true)}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                + Add Item
              </button>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                <form onSubmit={addItem}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="e.g., Wireless Headphones"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (optional)
                    </label>
                    <input
                      type="url"
                      value={itemLink}
                      onChange={(e) => setItemLink(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (optional)
                    </label>
                    <input
                      type="text"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="$50"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Add Item
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddItem(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {wishlist.items.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No items yet. {isOwner && "Add your first item above!"}
            </div>
          ) : (
            wishlist.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    {item.price && (
                      <p className="text-gray-600 mb-2">{item.price}</p>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 text-sm"
                      >
                        View Item →
                      </a>
                    )}
                  </div>
                  <div>
                    {!isOwner && (
                      <button
                        onClick={() => {
                          if (!item.claimed) {
                            const name = prompt("Enter your name:");
                            if (name) toggleClaim(item.id, name);
                          } else {
                            toggleClaim(item.id);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          item.claimed
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {item.claimed ? "✓ Claimed" : "Claim"}
                      </button>
                    )}
                    {isOwner && item.claimed && (
                      <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                        ✓ Claimed by {item.claimedBy}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
