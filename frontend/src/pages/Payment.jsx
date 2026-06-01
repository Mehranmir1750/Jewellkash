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


  const [customer, setCustomer] = useState({
  name: "",
  phone: "",
  address: "",
  location: "Srinagar",
});


let deliveryCharge = 70;

if (customer.location === "Outside Srinagar") {
  deliveryCharge = 130;
}

if (customer.location === "Outside Kashmir") {
  deliveryCharge = 150;
}


const grandTotal =
  Number(total) + deliveryCharge;

  const handleCopy = () => {
    navigator.clipboard.writeText("mehran@upi");
    alert("UPI ID copied!");
  };

 const handlePaid = async () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    !customer.name ||
    !customer.phone ||
    !customer.address
  ) {
    alert(
      "Please fill all delivery details"
    );
    return;
  }

  try {

    const response = await fetch(
      `https://jewellkash.onrender.com/checkout/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          location: customer.location,
          deliveryCharge,
          total: grandTotal,
        }),
      }
    );

    const data =
      await response.json();

    if (data.success) {

      alert(
`Order Placed Successfully!

Send payment screenshot to:

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


        <div className="payment-summary">

  <h3>Order Summary</h3>

  <div className="summary-row">
    <span>Products Total</span>
    <strong>
      ₹{Number(total).toLocaleString()}
    </strong>
  </div>

  <div className="summary-row">
    <span>
      Delivery ({customer.location})
    </span>

    <strong>
      ₹{deliveryCharge}
    </strong>
  </div>

  <div className="summary-row grand">
    <span>Total Payable</span>

    <strong>
      ₹{grandTotal.toLocaleString()}
    </strong>
  </div>

</div>





        {/* <div className="payment-total">
          <span>Amount Due</span>
          <h2>₹{grandTotal}</h2>
        </div> */}

        <div className="payment-form">

  <input
    type="text"
    placeholder="Full Name"
    value={customer.name}
    onChange={(e) =>
      setCustomer({
        ...customer,
        name: e.target.value,
      })
    }
  />

  <input
    type="tel"
    placeholder="Phone Number"
    value={customer.phone}
    onChange={(e) =>
      setCustomer({
        ...customer,
        phone: e.target.value,
      })
    }
  />

  <textarea
    placeholder="Delivery Address"
    value={customer.address}
    onChange={(e) =>
      setCustomer({
        ...customer,
        address: e.target.value,
      })
    }
  />

 




<select
  value={customer.location}
  onChange={(e) =>
    setCustomer({
      ...customer,
      location: e.target.value,
    })
  }
>

  <option value="Srinagar">
    Srinagar (₹70)
  </option>

  <option value="Outside Srinagar">
    Outside Srinagar (₹130)
  </option>

  <option value="Outside Kashmir">
    Outside Kashmir (₹150)
  </option>

</select>





</div>

<div className="delivery-box">

  <span>
    Selected Delivery Area
  </span>

  <strong>
    {customer.location}
  </strong>

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

