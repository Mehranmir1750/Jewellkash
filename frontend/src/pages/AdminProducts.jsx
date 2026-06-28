import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminProducts.css";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSignOutAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [orderChanged, setOrderChanged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://jewellkash.onrender.com/products"
      );
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Move product up or down
  const moveProduct = (index, direction) => {
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= products.length) return;

    const updated = [...products];
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];

    setProducts(updated);
    setOrderChanged(true);
  };

  // Save new order to backend
  const saveOrder = async () => {
    try {
      const order = products.map((p, i) => ({
        id: p.id,
        sort_order: i + 1,
      }));

      await fetch(
        "https://jewellkash.onrender.com/products/reorder",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order }),
        }
      );

      setOrderChanged(false);
      alert("Order saved!");

    } catch (err) {
      console.error(err);
      alert("Failed to save order");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://jewellkash.onrender.com/products/${id}`,
        { method: "DELETE" }
      );
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="AdminProducts_admin-products-page">

      {/* Navbar */}
      <nav className="AdminProducts_dashboard-nav">
        <div className="AdminProducts_dashboard-logo">
          JEWELLKASH ADMIN
        </div>
        <div className="AdminProducts_dashboard-links">
          <a href="/admin-dashboard">Dashboard</a>
          <a href="/admin-products">Products</a>
          <a href="/admin-orders">Orders</a>
          <a href="/admin-users">Users</a>
          <a href="/add-product" className="AdminProducts_add-product-link">
            <FaPlus /> Add Product
          </a>
          <a href="/" className="AdminProducts_logout-btn">
            <FaSignOutAlt /> Logout
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="AdminProducts_admin-products-hero">
        <h1>Manage Products ✨</h1>
        <p>Add, edit, reorder and manage your luxury jewelry collection.</p>
      </section>

      {/* Save Order Button — only shows when order has changed */}
      {orderChanged && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <button
            onClick={saveOrder}
            style={{
              background: "#7c3aed",
              color: "#fff",
              padding: "0.6rem 1.6rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            💾 Save Order
          </button>
        </div>
      )}

      {/* Products */}
      <div className="AdminProducts_admin-products-grid">
        {products.map((product, index) => (
          <div
            className="AdminProducts_admin-product-card"
            key={product.id}
          >
            <img src={product.image} alt={product.name} />

            <div className="AdminProducts_admin-product-content">

              <span className="AdminProducts_product-category">
                {product.category}
              </span>

              <h2>{product.name}</h2>

              <p className="AdminProducts_product-price">
                ₹{product.price}
              </p>

              <p className="AdminProducts_product-stock">
                Stock: {product.stock}
              </p>

              <p className="AdminProducts_product-size">
                Size: {product.size}
              </p>

              {/* Reorder Arrows */}
              <div style={{ display: "flex", gap: "0.5rem", margin: "0.5rem 0" }}>
                <button
                  onClick={() => moveProduct(index, -1)}
                  disabled={index === 0}
                  style={{
                    background: index === 0 ? "#333" : "#7c3aed",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.3rem 0.7rem",
                    cursor: index === 0 ? "not-allowed" : "pointer",
                  }}
                  title="Move Up"
                >
                  <FaArrowUp />
                </button>

                <button
                  onClick={() => moveProduct(index, +1)}
                  disabled={index === products.length - 1}
                  style={{
                    background: index === products.length - 1 ? "#333" : "#7c3aed",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.3rem 0.7rem",
                    cursor: index === products.length - 1 ? "not-allowed" : "pointer",
                  }}
                  title="Move Down"
                >
                  <FaArrowDown />
                </button>

                <span style={{ color: "#888", fontSize: "0.8rem", alignSelf: "center" }}>
                  #{index + 1}
                </span>
              </div>

              {/* Actions */}
              <div className="AdminProducts_admin-product-actions">
                <button
                  className="AdminProducts_edit-btn"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  <FaEdit /> Edit
                </button>

                <button
                  className="AdminProducts_delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}