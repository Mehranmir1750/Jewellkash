import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Products from "./pages/Products"
import LoginAdmin from "./pages/LoginAdmin"
import UserDashboard from "./pages/UserDashboard"
import Orders from "./pages/Orders"
import Cart from "./pages/Cart"
import AdminDashboard from "./pages/AdminDashboard"
import AddProduct from "./pages/AddProduct"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

         <Route path="/products" element={<Products />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/orders" element={<Orders />} />

<Route path="/cart" element={<Cart />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/add-product" element={<AddProduct />} />


      </Routes>
    </BrowserRouter>
  )
}
