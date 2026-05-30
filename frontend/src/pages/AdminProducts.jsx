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
        `https://jewellkash.onrender.com/products/${id}`,
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
    <div className="AdminProducts_admin-products-page">

    
    {/* Navbar */}
<nav className="AdminProducts_dashboard-nav">

  <div className="AdminProducts_dashboard-logo">
    JEWELLKASH ADMIN
  </div>

  <div className="AdminProducts_dashboard-links">

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

    <a href="/add-product" className="AdminProducts_add-product-link">

      <FaPlus />

      Add Product

    </a>

    <a href="/" className="AdminProducts_logout-btn">

      <FaSignOutAlt />

      Logout

    </a>

  </div>

</nav>

      {/* Hero */}
      <section className="AdminProducts_admin-products-hero">

        <h1>
          Manage Products ✨
        </h1>

        <p>
          Add, edit, and manage your luxury jewelry collection.
        </p>

      </section>

      {/* Products */}
      <div className="AdminProducts_admin-products-grid">

        {products.map((product) => (

          <div
            className="AdminProducts_admin-product-card"
            key={product.id}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <div className="AdminProducts_admin-product-content">

              <span className="AdminProducts_product-category">
                {product.category}
              </span>

              <h2>
                {product.name}
              </h2>

              <p className="AdminProducts_product-price">
                ₹{product.price}
              </p>

              <p className="AdminProducts_product-stock">
                Stock: {product.stock}
              </p>

              {/* Actions */}
              <div className="AdminProducts_admin-product-actions">

                <button
  className="AdminProducts_edit-btn"
  onClick={() =>
    navigate(`/edit-product/${product.id}`)
  }
>

  <FaEdit />

  Edit

</button>

                <button
                  className="AdminProducts_delete-btn"
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