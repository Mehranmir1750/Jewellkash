import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import "../styles/Home.css"



const filters = ["all", "ring", "necklace", "earring", "bracelet", "set"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishlist, setWishlist] = useState(new Set());
  const [addedItems, setAddedItems] = useState(new Set());
  const [toast, setToast] = useState({ show: false, message: "" });

  const [products, setProducts] = useState([]);



  useEffect(() => {

  fetchProducts();

}, []);

const fetchProducts = async () => {

  try {

    const response = await fetch(
      "http://localhost:5000/products"
    );

    const data = await response.json();

    setProducts(data);

  } catch (err) {

    console.error(err.message);

  }
};


  const filtered =
  activeFilter === "all"

    ? products

    : products.filter(
        (p) =>
          p.category.toLowerCase() ===
          activeFilter
      );

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // const addToCart = (product) => {
  //   if (product.stock === "out") return;
  //   setCartCount((c) => c + 1);
  //   setCartBump(true);
  //   setTimeout(() => setCartBump(false), 400);

  //   setAddedItems((prev) => new Set(prev).add(product.id));
  //   setTimeout(() => {
  //     setAddedItems((prev) => {
  //       const next = new Set(prev);
  //       next.delete(product.id);
  //       return next;
  //     });
  //   }, 1800);

  //   setTimeout(() => setToast({ show: false, message: "" }), 2400);
  // };


  const addToCart = (product) => {

  const token =
    localStorage.getItem("token");

  // Not logged in
  if (!token) {

    alert("Login to continue");

    return;
  }

  alert(`Login To Continue`);
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
                <img
  src={product.image}
  alt={product.name}
  className="jk-product-image"
/>

                {product.badge === "new" && (
                  <span className="jk-badge jk-badge-new">New</span>
                )}
                {product.badge === "low" && (
                  <span className="jk-badge jk-badge-low">Low Stock</span>
                )}

              </div>

              <div className="jk-card-body">
                <div className="jk-prod-type">{product.category}</div>
                <div className="jk-prod-name">{product.name}</div>

                <div className="jk-price-row">
                  <span className="jk-price">₹{product.price}</span>
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