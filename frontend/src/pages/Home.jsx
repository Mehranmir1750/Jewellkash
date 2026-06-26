import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import "../styles/Home.css"



// const filters = ["all", "ring", "necklace", "earring", "bracelet", "set"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishlist, setWishlist] = useState(new Set());
  const [addedItems, setAddedItems] = useState(new Set());
  const [toast, setToast] = useState({ show: false, message: "" });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

  fetchProducts();

}, []);

const fetchProducts = async () => {

  setLoading(true);

  try {

    const response = await fetch(
  "https://jewellkash.onrender.com/products"
);

    const data = await response.json();

    setProducts(data);

  } catch (err) {

    console.error(err.message);

  }finally{
    setLoading(false);
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
      <div className="home_jk-page">

        {/* Brand Header */}
        <div className="home_jk-brand">
          <div className="home_jk-brand-name">JewellKash</div>
          <div className="home_jk-brand-sub">Kashmir Fine Jewellery</div>
          <div className="home_jk-divider">
            <div className="home_jk-gem" />
          </div>
        </div>

        {/* Filters */}
        {/* <div className="home_jk-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`jk-filter-btn${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
        </div> */}

        {/* Product Grid */}






          {loading ? (
  <div className="jk-skeleton-grid">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="jk-skeleton-card">
        <div className="jk-skeleton-img" />
        <div className="jk-skeleton-body">
          <div className="jk-skeleton-line short" />
          <div className="jk-skeleton-line medium" />
          <div className="jk-skeleton-line long" />
          <div className="jk-skeleton-line short" />
          <div className="jk-skeleton-line btn" />
        </div>
      </div>
    ))}
  </div>
) 

        :(<div className="home_jk-grid">
          {filtered.map((product) => (
            <div key={product.id} className="home_jk-card">
              <div className="home_jk-img-wrap">
                <img
  src={product.image}
  alt={product.name}
  className="home_jk-product-image"
/>

                {product.badge === "new" && (
                  <span className="home_jk-badge jk-badge-new">New</span>
                )}
                {product.badge === "low" && (
                  <span className="home_jk-badge jk-badge-low">Low Stock</span>
                )}

              </div>

              <div className="home_jk-card-body">
                <div className="home_jk-prod-type">{product.category}</div>
                <div className="home_jk-prod-name">{product.name}</div>

                <div className="home_jk-price-row">
                  <span className="home_jk-price">₹{product.price}</span>
                  {product.oldPrice && (
                    <span className="home_jk-price-old">{product.oldPrice}</span>
                  )}
                </div>
                <p className="home_Home_product-size">
                Size: {product.size}
              </p>

                <div className="home_jk-stock">
                  {product.stock === "out" && (
                    <>
                      <span className="home_jk-dot jk-dot-out" />
                      <span className="home_jk-stock-out">Out of stock</span>
                    </>
                  )}
                  {product.stock === "low" && (
                    <>
                      <span className="home_jk-dot jk-dot-low" />
                      <span className="home_jk-stock-low">Only {product.stockQty} left</span>
                    </>
                  )}
                  {product.stock === "ok" && (
                    <>
                      <span className="home_jk-dot jk-dot-ok" />
                      <span className="home_jk-stock-ok">In stock</span>
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
        )}

        {/* Toast */}
        <div className={`jk-toast${toast.show ? " show" : ""}`}>
          {toast.message}
        </div>
      </div>
    </>
  );
}