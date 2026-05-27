import { useState } from "react";

import "../styles/AddProduct.css";

import {
  FaArrowLeft,
  FaImage,
  FaPlus,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";

export default function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "",
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost:5000/add-product",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(product),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Product Added Successfully ✨");

    // Reset form
    setProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      image: "",
      description: "",
    });

  } catch (err) {

    console.error(err.message);

  }
};

  return (
    <div className="add-product-page">

      <nav className="dashboard-nav">

  <div className="dashboard-logo">
    JEWELLKASH ADMIN
  </div>

  <div className="dashboard-links">

    <a href="/admin-dashboard">
      Dashboard
    </a>

    <a href="/add-product">
      Add Product
    </a>

    <a href="/admin-orders">
      Orders
    </a>

    <a href="/admin-users">
      Users
    </a>

    <a href="/" className="logout-btn">
      <FaSignOutAlt />
      Logout
    </a>

  </div>

</nav>

      {/* Main */}
      <div className="add-product-container">

        {/* Left */}
        <div className="add-product-left">

          <a href="/admin-dashboard" className="back-btn">
            <FaArrowLeft />
            Back to Dashboard
          </a>

          <h1>
            Add New Product ✨
          </h1>

          <p>
            Create a premium jewelry listing for your collection.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Product Name */}
            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                placeholder="Royal Diamond Ring"
                value={product.name}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value,
                  })
                }
                required
              />

            </div>

            {/* Price + Stock */}
            <div className="form-row">

              <div className="form-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  placeholder="4999"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: e.target.value,
                    })
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="20"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      stock: e.target.value,
                    })
                  }
                  required
                />

              </div>

            </div>

            {/* Category */}
            <div className="form-group">

              <label>
                Category
              </label>

              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category: e.target.value,
                  })
                }
                required
              >

                <option value="">
                  Select Category
                </option>

                <option value="Rings">
                  Rings
                </option>

                <option value="Necklaces">
                  Necklaces
                </option>

                <option value="Earrings">
                  Earrings
                </option>

                <option value="Bracelets">
                  Bracelets
                </option>

              </select>

            </div>

           {/* Product Image Upload */}
<div className="form-group">

  <label>
    Upload Product Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {

      const file = e.target.files[0];

      if (file) {

        const imageUrl =
          URL.createObjectURL(file);

        setProduct({
          ...product,
          image: imageUrl,
        });
      }
    }}
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
                placeholder="Write luxury product description..."
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
                required
              />

            </div>

            {/* Submit */}
            <button className="submit-btn" type="submit">

              <FaPlus />

              Add Product

            </button>

          </form>

        </div>

        {/* Right Preview */}
        <div className="preview-card">

          <div className="preview-image">

            {product.image ? (
              <img
                src={product.image}
                alt="preview"
                className="preview-img"
              />
            ) : (
              <FaImage />
            )}

          </div>

          <div className="preview-content">

            <span className="preview-tag">
              {product.category || "Luxury Collection"}
            </span>

            <h2>
              {product.name || "Product Preview"}
            </h2>

            <p>
              {product.description ||
                "Your jewelry product preview will appear here."}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}