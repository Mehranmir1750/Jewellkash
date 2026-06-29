import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import "../styles/ProductDetails.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    // fetch(`https://jewellkash.onrender.com/cart/${user.id}`)
    fetch(`https://jewellkash.onrender.com/cart/${user.id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
      .then((res) => res.json())
      .then((data) => setCart(data.map((item) => item.id)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`https://jewellkash.onrender.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("https://jewellkash.onrender.com/cart", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
         headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        body: JSON.stringify({ userId: user.id, productId: product.id }),
      });
      const data = await response.json();
      if (data.added) {
        setCart((prev) => [...prev, product.id]);
      } else {
        setCart((prev) => prev.filter((cartId) => cartId !== product.id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  const isInCart = cart.includes(product?.id);

  return (
    <div className="pd_page">

      {/* Navbar */}
      <nav className="pd_nav">
        <div className="pd_nav-logo">JEWELLKASH</div>
        <div className="pd_nav-links">
          <a href="/user-dashboard">Home</a>
          <a href="/orders">My Orders</a>
          <a href="/cart">
            <FaShoppingCart />
            Cart ({cart.length})
          </a>
          <a href="/" className="pd_logout-btn">
            <FaSignOutAlt />
            Logout
          </a>
        </div>
      </nav>

      {/* Back Button */}
      <div className="pd_back-wrap">
        <button className="pd_back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Collection
        </button>
      </div>

      {loading ? (
        <div className="pd_skeleton-wrap">
          <div className="pd_skeleton pd_skeleton-img" />
          <div className="pd_skeleton-info">
            <div className="pd_skeleton pd_skeleton-title" />
            <div className="pd_skeleton pd_skeleton-price" />
            <div className="pd_skeleton pd_skeleton-line" />
            <div className="pd_skeleton pd_skeleton-line short" />
            <div className="pd_skeleton pd_skeleton-btn" />
          </div>
        </div>
      ) : product ? (
        <div className="pd_container">

          {/* Image Side */}
          <div className="pd_image-wrap">
            <div className={`pd_image-frame ${imgLoaded ? "loaded" : ""}`}>
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </div>

          {/* Details Side */}
          <div className="pd_details">

            <div className="pd_tag">Luxury Collection</div>

            <h1 className="pd_name">{product.name}</h1>

            <div className="pd_price">
              ₹{Number(product.price).toLocaleString()}
            </div>

            {product.size && (
              <div className="pd_meta-row">
                <span className="pd_meta-label">Size</span>
                <span className="pd_meta-value pd_size-badge">{product.size}</span>
              </div>
            )}

            {product.category && (
              <div className="pd_meta-row">
                <span className="pd_meta-label">Category</span>
                <span className="pd_meta-value">{product.category}</span>
              </div>
            )}

            {product.material && (
              <div className="pd_meta-row">
                <span className="pd_meta-label">Material</span>
                <span className="pd_meta-value">{product.material}</span>
              </div>
            )}

            <div className="pd_divider" />

            {product.description && (
              <p className="pd_description">{product.description}</p>
            )}

            {/* Highlights */}
          

            {/* CTA */}
            <div className="pd_actions">
              <button
                className={`pd_cart-btn ${isInCart ? "pd_cart-btn--added" : ""} ${adding ? "pd_cart-btn--loading" : ""}`}
                onClick={handleAddToCart}
                disabled={adding}
              >
                {isInCart ? (
                  <>
                    <FaCheckCircle style={{ fontSize: "15px" }} />
                    Added to Cart
                  </>
                ) : adding ? (
                  <span className="pd_spinner" />
                ) : (
                  <>
                    <FaShoppingCart style={{ fontSize: "14px" }} />
                    Add to Cart
                  </>
                )}
              </button>

              <button className="pd_wishlist-btn" aria-label="Add to wishlist">
                ♡
              </button>
            </div>

          </div>
        </div>
      ) : (
        <div className="pd_not-found">Product not found.</div>
      )}
    </div>
  );
}