
import { useEffect, useState } from "react";
import "../styles/UserDashboard.css";
import {
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

export default function UserDashboard() {

  const [cart, setCart] = useState([]);


  useEffect(() => {
  fetch("http://localhost:5000/cart/1")
    .then((res) => res.json())
    .then((data) => {
      setCart(
        data.map((item) => item.id)
      );
    });
}, []);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .catch((err) => console.log(err));
  }, []);


  const handleAddToCart = async (product) => {
  try {

    const response = await fetch(
      "http://localhost:5000/cart",
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


  const products = [
    {
      id: 1,
      name: "Royal Diamond Ring",
      price: "₹4,999",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    },
    {
      id: 2,
      name: "Luxury Gold Necklace",
      price: "₹7,499",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
    },
    {
      id: 3,
      name: "Elegant Earrings",
      price: "₹2,999",
      image:
        "https://images.unsplash.com/photo-1588444650700-6d7f6f8b88d7",
    },
    {
      id: 4,
      name: "Pearl Bracelet",
      price: "₹3,499",
      image:
        "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0",
    },
  ];

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

              <p>{product.price}</p>

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