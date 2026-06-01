import "../styles/Cart.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaTrash,
  FaArrowLeft,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    if (!user) return;

    fetch(
      `https://jewellkash.onrender.com/api/cart/${user.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCartItems(
          data.map((item) => ({
            ...item,
            quantity: 1,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const removeItem = async (productId) => {

    try {

      await fetch(
        `https://jewellkash.onrender.com/cart/${user.id}/${productId}`,
        {
          method: "DELETE",
        }
      );

      setCartItems(
        cartItems.filter(
          (item) => item.id !== productId
        )
      );

    } catch (err) {

      console.log(err);

    }
  };



  const handleCheckout = () => {
  navigate("/payment");
};

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="User_cart-page">

      <nav className="User_dashboard-nav">

        <div className="User_dashboard-logo">
          JEWELLKASH
        </div>

        <div className="User_dashboard-links">

          <a href="/user-dashboard">
            Home
          </a>

          <a href="/orders">
            My Orders
          </a>

          <a href="/cart">
            <FaShoppingCart /> Cart
          </a>

          <a
            href="/"
            className="User_logout-btn"
          >
            <FaSignOutAlt />
            Logout
          </a>

        </div>

      </nav>

      <section className="User_cart-hero">
        <h1>Your Cart ✨</h1>

        <p>
          Review your selected luxury jewelry items.
        </p>
      </section>

      <div className="User_cart-container">

        <div className="User_cart-items">

          {cartItems.length === 0 ? (

            <h2>No items in cart</h2>

          ) : (

            cartItems.map((item) => (

              <div
                className="User_cart-card"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="User_cart-info">

                  <h2>{item.name}</h2>

                  <p className="User_cart-price">
                    ₹{Number(item.price).toLocaleString()}
                  </p>

                  <div className="User_cart-quantity">

                    <span>Quantity:</span>

                    <button>-</button>

                    <span>
                      {item.quantity}
                    </span>

                    <button>+</button>

                  </div>

                  <button
                    className="User_remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    <FaTrash />
                    Remove
                  </button>

                </div>

              </div>

            ))

          )}

          <a
            href="/user-dashboard"
            className="User_continue-shopping"
          >
            <FaArrowLeft />
            Continue Shopping
          </a>

        </div>

        <div className="User_cart-summary">

          <h2>Order Summary</h2>

          <div className="User_summary-row">
            <span>Subtotal</span>

            <span>
              ₹{subtotal.toLocaleString()}
            </span>
          </div>

          {/* <div className="User_summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div> */}

          <div className="User_shipping-note">
  Delivery charges will be calculated based on your delivery location.
</div>

          <div className="User_summary-row total">
            <span>Total</span>

            <span>
              ₹{subtotal.toLocaleString()}
            </span>
          </div>

          <button
            className="User_checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  );
}