
import { useEffect, useState } from "react";
import "../styles/UserDashboard.css";
import {
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

export default function UserDashboard() {


  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
  // fetch("https://jewellkash.onrender.com/cart/1")
  fetch("https://jewellkash.onrender.com/api/cart/1")
    .then((res) => res.json())
    .then((data) => {
      setCart(
        data.map((item) => item.id)
      );
    });
}, []);

 

useEffect(() => {
  fetch("https://jewellkash.onrender.com/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


  const handleAddToCart = async (product) => {
  try {

    const response = await fetch(
      "https://jewellkash.onrender.com/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // logged-in user
          productId: product.id,
        }),
      }
    );

    const data = await response.json();

    if (data.added) {
      setCart([...cart, product.id]);
    } else {
      setCart(
        cart.filter(
          (id) => id !== product.id
        )
      );
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="userDashboard_dashboard-page">

      {/* Navbar */}
      <nav className="userDashboard_dashboard-nav">

        <div className="userDashboard_dashboard-logo">
          JEWELLKASH
        </div>

        <div className="userDashboard_dashboard-links">

          <a href="/user-dashboard">
            Home
          </a>

          <a href="/orders">
            My Orders
          </a>

          <a href="/cart">
            <FaShoppingCart />
            Cart ({cart.length})
          </a>

          <a
            href="/"
            className="userDashboard_logout-btn"
          >
            <FaSignOutAlt />
            Logout
          </a>

        </div>

      </nav>

      {/* Hero */}
      <section className="userDashboard_dashboard-hero">

        <h1>
          Luxury Jewelry Collection ✨
        </h1>

        <p>
          Discover timeless elegance crafted for every occasion.
        </p>

      </section>

      {/* Products */}
      <div className="userDashboard_products-grid">

        {products.map((product) => (

          <div
            className="userDashboard_product-card"
            key={product.id}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <div className="userDashboard_product-info">

              <h3>{product.name}</h3>

              <p>
  ₹{Number(product.price).toLocaleString()}
</p>

              <div className="userDashboard_product-actions">

               <button
  className={
    cart.includes(product.id)
      ? "added-cart-btn"
      : ""
  }
  onClick={() => handleAddToCart(product)}
>
  {cart.includes(product.id)
    ? "✓ Added to Cart"
    : "Add to Cart"}
</button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}