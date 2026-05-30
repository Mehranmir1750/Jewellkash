import { useEffect, useState } from "react";

import "../styles/AdminOrders.css";

import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const response = await fetch(
        "https://jewellkash.onrender.com/orders"
      );

      const data = await response.json();

      setOrders(data);

    } catch (err) {

      console.error(err.message);

    }
  };


  const updateStatus = async (orderId, status) => {

  try {

    await fetch(
      `http://localhost:5000/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );

  } catch (err) {

    console.error(err);

  }
};

  return (
    <div className="admin-orders-page">

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

          <a href="/" className="logout-btn">
            <FaSignOutAlt />
            Logout
          </a>

        </div>

      </nav>

      {/* Hero */}
      <section className="admin-orders-hero">

        <h1>
          Manage Orders ✨
        </h1>

        <p>
          Track customer orders and delivery status.
        </p>

      </section>

      {/* Orders */}
      <div className="orders-container">

        {orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <img
              src={order.image}
              alt={order.product_name}
            />

            <div className="order-content">

              <div className="order-top">

                <div>

                  <span className="order-id">
                    Order #{order.id}
                  </span>

                  <h2>
                    {order.product_name}
                  </h2>

                </div>

                <h3>
                  ₹{order.price}
                </h3>

              </div>

              <div className="order-details">

                <p>
                  Customer:
                  <span>
                    {order.customer_name}
                  </span>
                </p>

                <p>
                  Date:
                  <span>
                    {order.date}
                  </span>
                </p>

              </div>

              {/* Status */}
              <div
                className={`order-status ${order.status.toLowerCase()}`}
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
                  {order.status}
                </span>

              </div>

              {/* Buttons */}
              <div className="order-actions">


<button
  className="processing-btn"
  disabled={order.status === "Processing"}
  onClick={() =>
    updateStatus(order.id, "Processing")
  }
>
  Processing
</button>

<button
  className="shipped-btn"
  onClick={() =>
    updateStatus(order.id, "Shipped")
  }
>
  Shipped
</button>

<button
  className="delivered-btn"
  onClick={() =>
    updateStatus(order.id, "Delivered")
  }
>
  Delivered
</button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}