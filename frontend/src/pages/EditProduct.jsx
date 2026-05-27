import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "../styles/EditProduct.css";

import {
  FaArrowLeft,
  FaSave,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

export default function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({

    name: "",

    price: "",

    stock: "",

    category: "",

    image: "",

    description: "",

  });

  // Fetch Product
  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/products/${id}`
      );

      const data = await response.json();

      setProduct(data);

    } catch (err) {

      console.error(err.message);

    }
  };

  // Handle Change
  const handleChange = (e) => {

    setProduct({

      ...product,

      [e.target.name]: e.target.value,

    });
  };

  // Update Product
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await fetch(
        `http://localhost:5000/products/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(product),
        }
      );

      alert("Product Updated ✨");

      navigate("/admin-products");

    } catch (err) {

      console.error(err.message);

    }
  };

  return (

    <div className="edit-product-page">

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

          <a
            href="/add-product"
            className="add-product-link"
          >

            <FaPlus />

            Add Product

          </a>

          <a href="/" className="logout-btn">

            <FaSignOutAlt />

            Logout

          </a>

        </div>

      </nav>

      {/* Container */}
      <div className="edit-product-container">

        <a
          href="/admin-products"
          className="back-btn"
        >

          <FaArrowLeft />

          Back

        </a>

        <h1>
          Edit Product ✨
        </h1>

        <p>
          Update luxury product details.
        </p>

        <form onSubmit={handleUpdate}>

          {/* Name */}
          <div className="form-group">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Row */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* Category */}
          <div className="form-group">

            <label>
              Category
            </label>

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />

          </div>

          {/* Image */}
          <div className="form-group">

            <label>
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              required
            />

          </div>

          {/* Description */}
          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />

          </div>

          {/* Submit */}
          <button
            className="update-btn"
            type="submit"
          >

            <FaSave />

            Save Changes

          </button>

        </form>

      </div>

    </div>
  );
}