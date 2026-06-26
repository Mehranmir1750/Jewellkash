
import { useEffect, useState } from "react";
import "../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

export default function UserDashboard() {

  const navigate = useNavigate();


  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState("");
  

useEffect(() => {

  // const user = JSON.parse(
  //   localStorage.getItem("user")
  // );


  const raw = localStorage.getItem('user');
const user = raw && raw !== 'undefined' ? JSON.parse(raw) : null;

  if (!user) return;

  fetch(
    `https://jewellkash.onrender.com/cart/${user.id}`
  )
    .then((res) => res.json())
    .then((data) => {
      setCart(
        data.map((item) => item.id)
      );
    })
    .catch((err) => {
      console.log(err);
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

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await fetch(
      "https://jewellkash.onrender.com/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
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
          Luxury Jewellery Collection ✨
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
  onClick={() => navigate(`/product/${product.id}`)}
  style={{ cursor: "pointer" }}
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

{product.size && (
  <div className="product-size">
    Size: {product.size}
  </div>
)}

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