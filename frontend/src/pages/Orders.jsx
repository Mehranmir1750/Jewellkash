import "../styles/Orders.css";

import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaRedoAlt,
  FaShoppingCart,
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

    <div className="user_orders-page">

      {/* Navbar */}
      <nav className="user_orders-nav">

        <div className="user_orders-logo">
          JEWELLKASH
        </div>

        <div className="user_orders-links">

          <a href="/user-dashboard">
            Home
          </a>

          <a href="/orders">
            My Orders
          </a>

          <a href="/cart">

            <FaShoppingCart />

            Cart

          </a>

          <a
            href="/"
            className="user_orders-logout-btn"
          >

            <FaSignOutAlt />

            Logout

          </a>

        </div>

      </nav>

      {/* Hero */}
      <section className="user_orders-hero">

        <h1>
          My Orders ✨
        </h1>

        <p>
          Track your luxury jewelry purchases.
        </p>

      </section>

      {/* Orders */}
      <div className="user_orders-container">

        {orders.map((order) => (

          <div
            className="user_order-card"
            key={order.id}
          >

            <img
              src={order.image}
              alt={order.product}
            />

            <div className="user_order-content">

              <div className="user_order-top">

                <div>

                  <h2>
                    {order.product}
                  </h2>

                  <span>
                    Order ID: {order.id}
                  </span>

                </div>

                <h3>
                  {order.price}
                </h3>

              </div>

              <div className="user_order-details">

                <p>

                  <strong>
                    Placed On:
                  </strong>

                  {" "}
                  {order.date}

                </p>

                <div
                  className={`status ${order.status.toLowerCase()}`}
                >

                  {/* {order.status === "Delivered" && (
                    <FaCheckCircle />
                  )}

                  {order.status === "Shipped" && (
                    <FaTruck />
                  )}

                  {order.status === "Processing" && (
                    <FaClock />
                  )} */}

                  {/* <span>
                    {order.status}
                  </span> */}

                </div>

              </div>

              {/* Buttons */}
              <div className="user_order-buttons">

                {/* <button>
                  Track Order
                </button>

                <button className="user_secondary-btn">

                  <FaRedoAlt />

                  Buy Again

                </button> */}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}