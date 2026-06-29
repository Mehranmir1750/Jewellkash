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
  size: "",
  image: "",
  description: "",
});


  const [imageFile, setImageFile] = useState(null);



  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // Upload image to Cloudinary
    const formData = new FormData();

    formData.append(
      "image",
      imageFile
    );

    // const uploadResponse = await fetch(
    //   "https://jewellkash.onrender.com/upload",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );


    const uploadResponse = await fetch(
  "https://jewellkash.onrender.com/upload",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  }
);

    const uploadData =
      await uploadResponse.json();

    // Save product with Cloudinary URL
    // const response = await fetch(
    //   "https://jewellkash.onrender.com/add-product",
    //   {
    //     method: "POST",

    //     // headers: {
    //     //   "Content-Type":
    //     //     "application/json",
    //     // },
        

    //     body: JSON.stringify({
    //       ...product,
    //       image: uploadData.url,
    //     }),
        
    //   }
    // );


    const response = await fetch(
  "https://jewellkash.onrender.com/add-product",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      ...product,
      image: uploadData.url,
    }),
  }
);

    const data =
      await response.json();

    console.log(data);

    alert(
      "Product Added Successfully ✨"
    );

    
    setProduct({
  name: "",
  price: "",
  stock: "",
  category: "",
  size: "",
  image: "",
  description: "",
});

    setImageFile(null);

  } catch (err) {

    console.error(err);

  }
};



  return (
    <div className="AdminAddProduct_add-product-page">

      <nav className="AdminAddProduct_dashboard-nav">

  <div className="AdminAddProduct_dashboard-logo">
    JEWELLKASH ADMIN
  </div>

  <div className="AdminAddProduct_dashboard-links">

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

    <a href="/" className="AdminAddProduct_logout-btn">
      <FaSignOutAlt />
      Logout
    </a>

  </div>

</nav>

      {/* Main */}
      <div className="AdminAddProduct_add-product-container">

        {/* Left */}
        <div className="AdminAddProduct_add-product-left">

          <a href="/admin-dashboard" className="AdminAddProduct_back-btn">
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
            <div className="AdminAddProduct_form-group">

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
            <div className="AdminAddProduct_form-row">

              <div className="AdminAddProduct_form-group">

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

              <div className="AdminAddProduct_form-group">

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



            {/* Size */}
<div className="AdminAddProduct_form-group">

  <label>
    Size
  </label>

  <input
    type="text"
    placeholder="e.g. 6,7,8,9,10"
    value={product.size}
    onChange={(e) =>
      setProduct({
        ...product,
        size: e.target.value,
      })
    }
  />

</div>




            {/* Category */}
            <div className="AdminAddProduct_form-group">

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
<div className="AdminAddProduct_form-group">

  <label>
    Upload Product Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
  const file = e.target.files[0];

  if (file) {

    setImageFile(file);

    setProduct({
      ...product,
      image: URL.createObjectURL(file), // preview only
    });
  }
}}
    required
  />

</div>

            {/* Description */}
            <div className="AdminAddProduct_form-group">

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
            <button className="AdminAddProduct_submit-btn" type="submit">

              <FaPlus />

              Add Product

            </button>

          </form>

        </div>

        {/* Right Preview */}
        <div className="AdminAddProduct_preview-card">

          <div className="AdminAddProduct_preview-image">

            {product.image ? (
              <img
                src={product.image}
                alt="preview"
                className="AdminAddProduct_preview-img"
              />
            ) : (
              <FaImage />
            )}

          </div>

          <div className="AdminAddProduct_preview-content">

            <span className="AdminAddProduct_preview-tag">
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