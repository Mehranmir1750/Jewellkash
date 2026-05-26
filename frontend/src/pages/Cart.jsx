import "../styles/Cart.css";
import {
  FaShoppingCart,
  FaTrash,
  FaArrowLeft,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Royal Diamond Ring",
      price: 4999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    },

    {
      id: 2,
      name: "Luxury Gold Necklace",
      price: 7499,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="dashboard-logo">JEWELLKASH</div>

        <div className="dashboard-links">
          <a href="/user-dashboard">Home</a>

          <a href="/orders">My Orders</a>

          <a href="/cart">
            <FaShoppingCart /> Cart
          </a>

          <a href="/" className="logout-btn">
            <FaSignOutAlt /> Logout
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="cart-hero">
        <h1>Your Cart ✨</h1>
        <p>Review your selected luxury jewelry items.</p>
      </section>

      {/* Main */}
      <div className="cart-container">
        {/* Left */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h2>{item.name}</h2>

                <p className="cart-price">
                  ₹{item.price.toLocaleString()}
                </p>

                <div className="cart-quantity">
                  <span>Quantity:</span>
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>

                <button className="remove-btn">
                  <FaTrash />
                  Remove
                </button>
              </div>
            </div>
          ))}

          <a href="/user-dashboard" className="continue-shopping">
            <FaArrowLeft />
            Continue Shopping
          </a>
        </div>

        {/* Right */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}