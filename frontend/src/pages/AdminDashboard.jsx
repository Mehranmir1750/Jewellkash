import "../styles/AdminDashboard.css";

import { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {

  // Orders State
  const [orders, setOrders] = useState([]);

  // Stats State
  const [stats, setStats] = useState({

    products: 0,

    orders: 0,

    users: 0,

    revenue: 0,

  });

  // Load Data
  useEffect(() => {

    fetchOrders();

    fetchDashboardStats();

  }, []);

  // Fetch Orders
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

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {

    try {

      const response = await fetch(
        "https://jewellkash.onrender.com/admin-dashboard"
      );

      const data = await response.json();

      setStats({

  products: data.totalProducts || 0,

  orders: data.totalOrders || 0,

  users: data.totalUsers || 0,

  revenue: data.totalRevenue || 0,

});

    } catch (err) {

      console.error(err.message);

    }
  };

  return (

    <div className="admin-page">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          JEWELLKASH
        </div>

        <div className="admin-menu">

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

        </div>

        <a href="/" className="admin-logout">

          <FaSignOutAlt />

          Logout

        </a>

      </aside>

      {/* Main */}
      <main className="admin-main">

        {/* Top */}
        <div className="admin-top">

          <div>

            <h1>
              Admin Dashboard ✨
            </h1>

            <p>
              Manage products, orders, users, and analytics.
            </p>

          </div>

          <a
            href="/add-product"
            className="add-product-btn"
          >

            <FaPlus />

            Add Product

          </a>

        </div>

        {/* Stats */}
        <div className="stats-grid">

          {/* Products */}
          <div className="stat-card">

            <FaBoxOpen className="stat-icon" />

            <div>

              <h2>
                {stats.products}
              </h2>

              <p>
                Total Products
              </p>

            </div>

          </div>

          {/* Orders */}
          <div className="stat-card">

            <FaShoppingCart className="stat-icon" />

            <div>

              <h2>
                {stats.orders}
              </h2>

              <p>
                Total Orders
              </p>

            </div>

          </div>

          {/* Users */}
          <div className="stat-card">

            <FaUsers className="stat-icon" />

            <div>

              <h2>
                {stats.users}
              </h2>

              <p>
                Total Users
              </p>

            </div>

          </div>

          {/* Revenue */}
          <div className="stat-card">

            <FaRupeeSign className="stat-icon" />

            <div>

              <h2>
                ₹{Number(stats.revenue || 0).toLocaleString()}
              </h2>

              <p>
                Total Revenue
              </p>

            </div>

          </div>

        </div>

        {/* Recent Orders */}
        <div className="products-section">

          <div className="section-top">

            <h2>
              Recent Orders
            </h2>

          </div>

          <table className="products-table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Customer</th>

                <th>Product</th>

                <th>Price</th>

                <th>Status</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order.id}>

                  <td>
                    {order.id}
                  </td>

                  <td>
                    {order.customer_name}
                  </td>

                  <td>
                    {order.product_name}
                  </td>

                  <td>
                    ₹{order.price}
                  </td>

                  <td>
                    {order.status}
                  </td>

                  <td>
                    {order.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}