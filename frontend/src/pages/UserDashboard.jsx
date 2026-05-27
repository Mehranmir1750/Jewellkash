import "../styles/UserDashboard.css";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaHeart,
} from "react-icons/fa";

export default function UserDashboard() {

  useEffect(() => {
  fetch("http://localhost:5000/products")
}, [])

  const products = [
    {
      id: 1,
      name: "Royal Diamond Ring",
      price: "₹4,999",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    },
    {
      id: 2,
      name: "Luxury Gold Necklace",
      price: "₹7,499",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
    },
    {
      id: 3,
      name: "Elegant Earrings",
      price: "₹2,999",
      image:
        "https://images.unsplash.com/photo-1588444650700-6d7f6f8b88d7",
    },
    {
      id: 4,
      name: "Pearl Bracelet",
      price: "₹3,499",
      image:
        "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="dashboard-logo">JEWELLKASH</div>

        <div className="dashboard-links">
          <a href="/user-dashboard">Home</a>
         <a href="/orders">My Orders</a>

          <a href="cart">
            <FaShoppingCart /> Cart
          </a>

          <a href="/" className="logout-btn">
            <FaSignOutAlt /> Logout
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="dashboard-hero">
        <h1>Luxury Jewelry Collection ✨</h1>
        <p>
          Discover timeless elegance crafted for every occasion.
        </p>
      </section>

      {/* Products */}
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>

              <div className="product-actions">
                <button>Add to Cart</button>

                <FaHeart className="wishlist-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}