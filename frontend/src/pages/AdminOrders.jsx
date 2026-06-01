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
  const [openOrder, setOpenOrder] =
  useState(null);

  useEffect(() => {

    fetchOrders();
    fetch(
  "https://jewellkash.onrender.com/order-details"
)
  .then((res) => res.json())
  .then((data) => {
    setOrderDetails(data);
  });

  }, []);

  const [orderDetails, setOrderDetails] =
  useState([]);

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
      `https://jewellkash.onrender.com/orders/${orderId}`,
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
    <div className="AdminOrders_admin-orders-page">

      {/* Navbar */}
      <nav className="AdminOrders_dashboard-nav">

        <div className="AdminOrders_dashboard-logo">
          JEWELLKASH ADMIN
        </div>

        <div className="AdminOrders_dashboard-links">

          <a href="/admin-dashboard">
            Dashboard
          </a>

          <a href="/admin-products">
            Products
          </a>

          <a href="/admin-orders">
            Orders
          </a>

          <a href="/" className="AdminOrders_logout-btn">
            <FaSignOutAlt />
            Logout
          </a>

        </div>

      </nav>

      {/* Hero */}
      <section className="AdminOrders_admin-orders-hero">

        <h1>
          Manage Orders ✨
        </h1>

        <p>
          Track customer orders and delivery status.
        </p>

      </section>

      {/* Orders */}
      <div className="AdminOrders_orders-container">

        {orders.map((order) => (

          <div
            className="AdminOrders_order-card"
            key={order.id}
          >

            <img
              src={order.image}
              alt={order.product_name}
            />

            <div className="AdminOrders_order-content">

              <div className="AdminOrders_order-top">

                <div>

                  <span className="AdminOrders_order-id">
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

              <div className="AdminOrders_order-details">

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
  className={`order-status ${(order.status || "").toLowerCase()}`}
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

            
             {/* Buttons */}
<div className="AdminOrders_order-actions">

  <button
    className="view-details-btn"
    onClick={() =>
      setOpenOrder(
        openOrder === order.id
          ? null
          : order.id
      )
    }
  >
    {openOrder === order.id
      ? "Hide Details"
      : "View Details"}
  </button>

  <button
    className="AdminOrders_processing-btn"
    disabled={order.status === "Processing"}
    onClick={() =>
      updateStatus(
        order.id,
        "Processing"
      )
    }
  >
    Processing
  </button>

  <button
    className="AdminOrders_shipped-btn"
    onClick={() =>
      updateStatus(
        order.id,
        "Shipped"
      )
    }
  >
    Shipped
  </button>

  <button
    className="AdminOrders_delivered-btn"
    onClick={() =>
      updateStatus(
        order.id,
        "Delivered"
      )
    }
  >
    Delivered
  </button>

</div>

{/* Delivery Details */}

{openOrder === order.id &&
  orderDetails
    .filter(
      (detail) =>
        detail.order_id === order.id
    )
    .slice(0, 1)
    .map((detail) => (

      <div
        key={detail.id}
        className="AdminOrders_delivery-details"
      >

        <h3>
          Customer Details
        </h3>

        <p>
          <strong>Name:</strong>{" "}
          {detail.customer_name}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {detail.phone}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {detail.location}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {detail.address}
        </p>

        <p>
          <strong>Delivery Charge:</strong>{" "}
          ₹{detail.delivery_charge}
        </p>

        <p>
          <strong>Total Amount:</strong>{" "}
          ₹{detail.total_amount}
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          {detail.payment_status}
        </p>

        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(
            detail.order_date
          ).toLocaleString()}
        </p>

      </div>

))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}