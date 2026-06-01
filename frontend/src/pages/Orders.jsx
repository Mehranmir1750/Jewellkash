import { useEffect, useState } from "react";
import "../styles/Orders.css";

import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    fetch(
      `https://jewellkash.onrender.com/orders/${user.id}`
    )
      .then((res) => res.json())
      .then((data) => {
  setOrders(
    Array.isArray(data)
      ? data
      : []
  );
})
      .catch((err) => {
        console.log(err);
      });

  }, []);

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

        {orders.length === 0 ? (

          <h2>No Orders Found</h2>

        ) : (

          orders.map((order) => (

            <div
              className="user_order-card"
              key={order.id}
            >

              <img
                src={order.image}
                alt={order.name}
              />

              <div className="user_order-content">

                <div className="user_order-top">

                  <div>

                    <h2>
                      {order.name}
                    </h2>

                    <span>
                      Order ID: {order.id}
                    </span>

                  </div>

                  <h3>
                    ₹{Number(order.price).toLocaleString()}
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
                    className={`status ${(order.status || "").toLowerCase()}`}
                  >

                    {order.status === "Delivered" && (
                      <FaCheckCircle />
                    )}

                    {order.status === "Shipped" && (
                      <FaTruck />
                    )}

                    {order.status === "Processing" && (
                      <FaClock />
                    )}

                    <span>
                      {order.status || "Processing"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}