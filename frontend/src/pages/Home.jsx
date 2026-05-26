import Navbar from "./Navbar";
import { useState } from "react";
import "../styles/Home.css"

const products = [
  { id: 1, name: "Chinar Bloom Ring", type: "ring", icon: "💍", price: "₹18,500", oldPrice: null, stock: "ok", stockQty: 12, badge: "new" },
  { id: 2, name: "Dal Lake Pearl Necklace", type: "necklace", icon: "📿", price: "₹42,000", oldPrice: "₹48,000", stock: "low", stockQty: 3, badge: "low" },
  { id: 3, name: "Sapphire Jhelum Drop", type: "earring", icon: "✨", price: "₹9,800", oldPrice: null, stock: "ok", stockQty: 8, badge: null },
  { id: 4, name: "Himalayan Snowflake Bangle", type: "bracelet", icon: "🔮", price: "₹14,200", oldPrice: "₹16,000", stock: "low", stockQty: 2, badge: "low" },
  { id: 5, name: "Mughal Rose Choker", type: "necklace", icon: "🌹", price: "₹55,000", oldPrice: null, stock: "out", stockQty: 0, badge: null },
  { id: 6, name: "Walnut Grove Earrings", type: "earring", icon: "🍂", price: "₹7,500", oldPrice: null, stock: "ok", stockQty: 15, badge: "new" },
  { id: 7, name: "Zabarwan Ruby Set", type: "set", icon: "❤️", price: "₹88,000", oldPrice: "₹95,000", stock: "low", stockQty: 1, badge: "low" },
  { id: 8, name: "Moonstone Srinagar Band", type: "ring", icon: "🌙", price: "₹22,000", oldPrice: null, stock: "ok", stockQty: 6, badge: null },
];

const filters = ["all", "ring", "necklace", "earring", "bracelet", "set"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishlist, setWishlist] = useState(new Set());
  const [addedItems, setAddedItems] = useState(new Set());
  const [toast, setToast] = useState({ show: false, message: "" });

  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.type === activeFilter);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addToCart = (product) => {
    if (product.stock === "out") return;
    setCartCount((c) => c + 1);
    setCartBump(true);
    setTimeout(() => setCartBump(false), 400);

    setAddedItems((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1800);

    setTimeout(() => setToast({ show: false, message: "" }), 2400);
  };

  return (
    <>

    <Navbar />
      <div className="jk-page">

        {/* Brand Header */}
        <div className="jk-brand">
          <div className="jk-brand-name">JewellKash</div>
          <div className="jk-brand-sub">Kashmir Fine Jewellery</div>
          <div className="jk-divider">
            <div className="jk-gem" />
          </div>
        </div>

        {/* Filters */}
        <div className="jk-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`jk-filter-btn${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="jk-grid">
          {filtered.map((product) => (
            <div key={product.id} className="jk-card">
              <div className="jk-img-wrap">
                <div className="jk-gem-icon">{product.icon}</div>

                {product.badge === "new" && (
                  <span className="jk-badge jk-badge-new">New</span>
                )}
                {product.badge === "low" && (
                  <span className="jk-badge jk-badge-low">Low Stock</span>
                )}

                <button
                  className={`jk-wish-btn${wishlist.has(product.id) ? " active" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                >
                  {wishlist.has(product.id) ? "♥" : "♡"}
                </button>
              </div>

              <div className="jk-card-body">
                <div className="jk-prod-type">{product.type}</div>
                <div className="jk-prod-name">{product.name}</div>

                <div className="jk-price-row">
                  <span className="jk-price">{product.price}</span>
                  {product.oldPrice && (
                    <span className="jk-price-old">{product.oldPrice}</span>
                  )}
                </div>

                <div className="jk-stock">
                  {product.stock === "out" && (
                    <>
                      <span className="jk-dot jk-dot-out" />
                      <span className="jk-stock-out">Out of stock</span>
                    </>
                  )}
                  {product.stock === "low" && (
                    <>
                      <span className="jk-dot jk-dot-low" />
                      <span className="jk-stock-low">Only {product.stockQty} left</span>
                    </>
                  )}
                  {product.stock === "ok" && (
                    <>
                      <span className="jk-dot jk-dot-ok" />
                      <span className="jk-stock-ok">In stock</span>
                    </>
                  )}
                </div>

                <button
                  className={`jk-cart-btn${addedItems.has(product.id) ? " added" : ""}`}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === "out"}
                >
                  {product.stock === "out"
                    ? "Sold Out"
                    : addedItems.has(product.id)
                    ? "✓ Added!"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toast */}
        <div className={`jk-toast${toast.show ? " show" : ""}`}>
          {toast.message}
        </div>
      </div>
    </>
  );
}