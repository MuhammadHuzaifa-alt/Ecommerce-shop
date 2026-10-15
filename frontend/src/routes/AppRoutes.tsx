import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Public Pages
import Products from "../features/products/pages/Products/product";
import ProductDetails from "../features/products/pages/productdeatils";

import Blog from "../features/blog/pages/Blog";
import BlogDetails from "../features/blog/pages/BlogDetails";

import Contact from "../features/contact/pages/Contact/Contact";
import HelpCenter from "../features/contact/pages/HelpCenter/HelpCenter";
import CustomerCare from "../features/contact/pages/CustomerCare/CustomerCare";
import Orders from "../features/contact/pages/Orders/Orders";
import Shipping from "../features/contact/pages/Shipping/Shipping";
import Payment from "../features/contact/pages/Payments/Payment";
import ReturnsRefunds from "../features/contact/pages/ReturnsRefunds/ReturnsRefunds";

import Login from "../features/auth/pages/Login/Login";
import Register from "../features/auth/pages/Register/Register";

import Account from "../features/user/pages/Account/Account";
import Profile from "../features/user/pages/Profile/Profile";

import Wishlist from "../features/wishlist/pages/Wishlist/Wishlist";
import Cart from "../features/cart/pages/Cart";
import Checkout from "../features/checkout/pages/Checkout/Checkout";
import OrderDetails from "../features/checkout/pages/OrderDetails/OrderDetails";
import MyOrders from "../features/checkout/pages/MyOrders/MyOrders";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Navigate to="/products" replace />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* Blog */}
        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />


        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/contact/help-center"
          element={<HelpCenter />}
        />

        <Route
          path="/contact/customer-care"
          element={<CustomerCare />}
        />

        <Route
          path="/contact/orders"
          element={<Orders />}
        />

        <Route
          path="/contact/shipping"
          element={<Shipping />}
        />

        <Route
          path="/contact/payment"
          element={<Payment />}
        />

        <Route
          path="/contact/returns-refunds"
          element={<ReturnsRefunds />}
        />

        {/* Shopping */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* User */}
        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/orders/:id"element={<OrderDetails />}/>
        <Route path="/orders" element={<MyOrders />}/>
      </Routes>
    </BrowserRouter>
  );
}