import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartTotal = localStorage.getItem("cartTotal");
    if (cartTotal) setTotal(cartTotal);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("mehran@upi");
    alert("UPI ID copied!");
  };

  const handlePaid = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await fetch(
        `https://jewellkash.onrender.com/checkout/${user.id}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (data.success) {
        alert(
`Order Placed Successfully!

Please send payment screenshot to:

Instagram: @jewellkash

Contact: 7006877819`
        );

        navigate("/orders");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <div className="payment-header">
          <h1>Complete Payment ✨</h1>
          <p>Scan & pay to confirm your order</p>
        </div>

        <div className="payment-total">
          <span>Amount Due</span>
          <h2>₹{total}</h2>
        </div>

        <div className="payment-divider" />

        <div className="payment-qr-section">
          <span className="payment-qr-label">Scan QR Code</span>
          <div className="payment-qr-wrapper">
            <img src="/qr-code.png" alt="QR Code" />
          </div>
        </div>

        <div className="payment-upi-box">
          <div>
            <span>UPI ID</span>
            <p>affanrashidpeerzada@oksbi</p>
          </div>
          <button className="payment-copy-btn" onClick={handleCopy}>
            Copy
          </button>
        </div>

        <p className="payment-note">
          After completing the payment, tap the button below to confirm your order.
        </p>

         <div className="payment-info">
          <h3>After Payment</h3>
          <p>Send payment screenshot to:</p>
          <p>Instagram: <strong>@jewellkash</strong></p>
          <p>Contact: <strong>7006877819</strong></p>
        </div>


        <button className="payment-btn" onClick={handlePaid}>
          I Have Paid
        </button>


        <a href="/cart" className="payment-back">
          <FaArrowLeft size={10} /> Back to Cart
        </a>

      </div>
    </div>
  );
}