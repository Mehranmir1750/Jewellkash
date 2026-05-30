import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminProducts.css";
import {
  FaEdit, FaTrash, FaPlus, FaSignOutAlt,
  FaTachometerAlt, FaBox, FaShoppingCart,
  FaUsers, FaBars, FaTimes,
} from "react-icons/fa";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://jewellkash.onrender.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) { console.error(err.message); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jewellkash.onrender.com/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) { console.error(err.message); }
  };

  return (
    <div className="admin-products-page">

      {/* ── Navbar ── */}
      <nav className="dashboard-nav">
        <div className="dashboard-logo">JEWELLKASH</div>

        {/* Hamburger button — mobile only */}
        <button
          className="dashboard-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links — desktop always visible, mobile slides down */}
        <div className={`dashboard-links ${menuOpen ? "open" : ""}`}>
          <a href="/admin-dashboard" onClick={() => setMenuOpen(false)}>
            <FaTachometerAlt /> <span>Dashboard</span>
          </a>
          <a href="/admin-products" onClick={() => setMenuOpen(false)}>
            <FaBox /> <span>Products</span>
          </a>
          <a href="/admin-orders" onClick={() => setMenuOpen(false)}>
            <FaShoppingCart /> <span>Orders</span>
          </a>
          <a href="/admin-users" onClick={() => setMenuOpen(false)}>
            <FaUsers /> <span>Users</span>
          </a>
          <a href="/add-product" className="add-product-link" onClick={() => setMenuOpen(false)}>
            <FaPlus /> <span>Add Product</span>
          </a>
          <a href="/" className="logout-btn" onClick={() => setMenuOpen(false)}>
            <FaSignOutAlt /> <span>Logout</span>
          </a>
        </div>
      </nav>

      {/* Backdrop — closes menu when tapping outside */}
      {menuOpen && (
        <div
          className="dashboard-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Hero ── */}
      <section className="admin-products-hero">
        <h1>Manage Products ✨</h1>
        <p>Add, edit, and manage your luxury jewelry collection.</p>
      </section>

      {/* ── Products Grid ── */}
      <div className="admin-products-grid">
        {products.map((product) => (
          <div className="admin-product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="admin-product-content">
              <span className="product-category">{product.category}</span>
              <h2>{product.name}</h2>
              <p className="product-price">₹{Number(product.price).toLocaleString()}</p>
              <p className="product-stock">Stock: {product.stock}</p>
              <div className="admin-product-actions">
                <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.id}`)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
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