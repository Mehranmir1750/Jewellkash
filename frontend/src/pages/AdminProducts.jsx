import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminProducts.css";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Fetch Products
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

  // Delete Product
  const handleDelete = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/products/${id}`,
        {
          method: "DELETE",
        }
      );

      setProducts(
        products.filter(
          (product) => product.id !== id
        )
      );

    } catch (err) {

      console.error(err.message);

    }
  };

  return (
    <div className="admin-products-page">

    
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
      <section className="admin-products-hero">

        <h1>
          Manage Products ✨
        </h1>

        <p>
          Add, edit, and manage your luxury jewelry collection.
        </p>

      </section>

      {/* Products */}
      <div className="admin-products-grid">

        {products.map((product) => (

          <div
            className="admin-product-card"
            key={product.id}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <div className="admin-product-content">

              <span className="product-category">
                {product.category}
              </span>

              <h2>
                {product.name}
              </h2>

              <p className="product-price">
                ₹{product.price}
              </p>

              <p className="product-stock">
                Stock: {product.stock}
              </p>

              {/* Actions */}
              <div className="admin-product-actions">

                <button
  className="edit-btn"
  onClick={() =>
    navigate(`/edit-product/${product.id}`)
  }
>

  <FaEdit />

  Edit

</button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(product.id)
                  }
                >

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}