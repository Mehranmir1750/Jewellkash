import "../styles/Orders.css";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaRedoAlt,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Orders() {
  const orders = [
    {
      id: "JK1023",
      product: "Royal Diamond Ring",
      price: "₹4,999",
      status: "Delivered",
      date: "24 May 2026",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    },

    {
      id: "JK2045",
      product: "Luxury Gold Necklace",
      price: "₹7,499",
      status: "Shipped",
      date: "20 May 2026",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
    },

    {
      id: "JK3310",
      product: "Elegant Earrings",
      price: "₹2,999",
      status: "Processing",
      date: "18 May 2026",
      image:
        "https://images.unsplash.com/photo-1588444650700-6d7f6f8b88d7",
    },
  ];

  return (
    <div className="orders-page">
      {/* Navbar */}
      

     {/* Navbar */}
<nav className="dashboard-nav">

  <div className="dashboard-logo">
    JEWELLKASH ADMIN
  </div>

  <div className="dashboard-links">

    <a href="/admin-dashboard">
      Dashboard
    </a>

    <a href="/admin-products">
      Products
    </a>

    <a href="/admin-orders">
      Orders
    </a>

    <a href="/admin-users">
      Users
    </a>

    <a href="/add-product" className="add-product-link">

      <FaPlus />

      Add Product

    </a>

    <a href="/" className="logout-btn">

      <FaSignOutAlt />

      Logout

    </a>

  </div>

</nav>

      {/* Hero */}
      <section className="orders-hero">
        <h1>My Orders ✨</h1>
        <p>Track your luxury jewelry purchases and order history.</p>
      </section>

      {/* Orders */}
      <div className="orders-container">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <img src={order.image} alt={order.product} />

            <div className="order-content">
              <div className="order-top">
                <div>
                  <h2>{order.product}</h2>
                  <span>Order ID: {order.id}</span>
                </div>

                <h3>{order.price}</h3>
              </div>

              <div className="order-details">
                <p>
                  <strong>Placed On:</strong> {order.date}
                </p>

                <div className={`status ${order.status.toLowerCase()}`}>
                  {order.status === "Delivered" && (
                    <FaCheckCircle />
                  )}

                  {order.status === "Shipped" && (
                    <FaTruck />
                  )}

                  {order.status === "Processing" && (
                    <FaClock />
                  )}

                  <span>{order.status}</span>
                </div>
              </div>

              <div className="order-buttons">
                <button>Track Order</button>

                <button className="secondary-btn">
                  <FaRedoAlt />
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}