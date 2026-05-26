import "../styles/AddProduct.css";

import {
  FaArrowLeft,
  FaImage,
  FaPlus,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";

export default function AddProduct() {

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Product Added Successfully ✨");
  };

  return (
    <div className="add-product-page">

      {/* Navbar */}
      <nav className="dashboard-nav">

        <div className="dashboard-logo">
          JEWELLKASH
        </div>

        <div className="dashboard-links">

          <a href="/admin-dashboard">
            Dashboard
          </a>

          <a href="/orders">
            Orders
          </a>

          <a href="/cart">
            <FaShoppingCart />
            Cart
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
                required
              />

            </div>

            {/* Price */}
            <div className="form-row">

              <div className="form-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  placeholder="4999"
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
                  required
                />

              </div>

            </div>

            {/* Category */}
            <div className="form-group">

              <label>
                Category
              </label>

              <select required>

                <option value="">
                  Select Category
                </option>

                <option>
                  Rings
                </option>

                <option>
                  Necklaces
                </option>

                <option>
                  Earrings
                </option>

                <option>
                  Bracelets
                </option>

              </select>

            </div>

            {/* Image URL */}
            <div className="form-group">

              <label>
                Product Image URL
              </label>

              <input
                type="text"
                placeholder="Paste image URL"
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
                required
              />

            </div>

            {/* Button */}
            <button className="submit-btn" type="submit">

              <FaPlus />

              Add Product

            </button>

          </form>

        </div>

        {/* Right Preview */}
        <div className="preview-card">

          <div className="preview-image">

            <FaImage />

          </div>

          <div className="preview-content">

            <span className="preview-tag">
              Luxury Collection
            </span>

            <h2>
              Product Preview
            </h2>

            <p>
              Your jewelry product preview will appear here.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}