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
import AdminProducts from "./pages/AdminProducts"
import AdminOrders from "./pages/AdminOrders"
import AdminUsers from "./pages/AdminUsers"
import EditProduct from "./pages/EditProduct"
import Payment from "./pages/Payment"
import ProductDetail from "./pages/ProductDetails"


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
<Route
  path="/admin-products"
  element={<AdminProducts />}
/>

<Route
  path="/admin-orders"
  element={<AdminOrders />}
/>

<Route
  path="/admin-users"
  element={<AdminUsers />}
/>

<Route
  path="/edit-product/:id"
  element={<EditProduct />}
/>

<Route
  path="/payment"
  element={<Payment />}
/>

<Route path="/product/:id" element={<ProductDetail />} />

      </Routes>


      

    </BrowserRouter>
  )
}
