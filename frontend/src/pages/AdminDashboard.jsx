import "../styles/AdminDashboard.css";

import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const products = [
    {
      id: 1,
      name: "Royal Diamond Ring",
      price: "₹4,999",
      stock: 12,
      category: "Rings",
    },

    {
      id: 2,
      name: "Luxury Gold Necklace",
      price: "₹7,499",
      stock: 8,
      category: "Necklaces",
    },

    {
      id: 3,
      name: "Elegant Earrings",
      price: "₹2,999",
      stock: 20,
      category: "Earrings",
    },
  ];

  return (
    <div className="admin-page">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          JEWELLKASH
        </div>

        <div className="admin-menu">

          <a href="#">
            Dashboard
          </a>

          <a href="/admin-products">
            Products
          </a>

          <a href="/admin-orders">
            Orders
          </a>

          <a href="#">
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

        <a href="/add-product" className="add-product-btn">
  <FaPlus />
  Add Product
</a>
        </div>

        {/* Stats */}
        <div className="stats-grid">

          <div className="stat-card">
            <FaBoxOpen className="stat-icon" />

            <div>
              <h2>120</h2>
              <p>Total Products</p>
            </div>
          </div>

          <div className="stat-card">
            <FaShoppingCart className="stat-icon" />

            <div>
              <h2>540</h2>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="stat-card">
            <FaUsers className="stat-icon" />

            <div>
              <h2>320</h2>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <FaRupeeSign className="stat-icon" />

            <div>
              <h2>₹2.4L</h2>
              <p>Total Revenue</p>
            </div>
          </div>

        </div>

        {/* Products */}
        <div className="products-section">

          <div className="section-top">

            <h2>
              Manage Products
            </h2>

            <button>
              <FaPlus />
              New Product
            </button>

          </div>

          <table className="products-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  <td>{product.id}</td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>{product.price}</td>

                  <td>{product.stock}</td>

                  <td className="actions">

                    <button className="edit-btn">
                      <FaEdit />
                    </button>

                    <button className="delete-btn">
                      <FaTrash />
                    </button>

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