import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdAccountCircle } from "react-icons/md";
import { logoutUser, clearCart } from "./store";
import { setSearchTerm } from "./store";


import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Milk from "./Milk";
import Chocolate from "./Chocolate";
import Bakery from "./Bakery";
import Cart from "./Cart";
import Orders from "./Orders";
import Aboutus from "./Aboutus";
import Contactus from "./Contactus";
import Account from "./Account";
import Signup from "./Signup";
import NotFound from "./NotFound";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, currentUser } = useSelector(
    (state) => state.authentication
  );

  return (
    <>
      {/* ✅ Navbar */}
      <div className="navbar">
        <div className="navbar-wrapper">
          <div className="navbar-top">
            <div className="logo">
              <h1>🍴FoodiePlace</h1>
            </div>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for items..."
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
            </div>

            <div className="nav-actions">
              {isAuthenticated ? (
                <>
                  <span className="nav-links">
                    👋 Welcome, {currentUser?.userName}
                  </span>
                  <button
                    onClick={() => {
                      dispatch(clearCart());
                      dispatch(logoutUser());
                      navigate("/"); // ✅ redirects home after logout
                    }}
                    className="nav-links logout-btn"
                  >
                    Logout➡️
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="nav-links">
                    📝SignUp
                  </Link>
                  <Link to="/signin" className="nav-links">
                    <MdAccountCircle size={22} style={{ marginRight: "4px" }} />
                    SignIn
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="navbar-bottom">
            <Link to="/" className="nav-links">
              🏠 Home
            </Link>
            <div className="dropdown">
              <button className="dropbtn">&#9776; Menu 🍽️</button>
              <div className="dropdown-content">
                <Link to="/veg">🥦 VegItems</Link>
                <Link to="/nonveg">🍗 Non-Veg</Link>
                <Link to="/milk">🥛 MilkItems</Link>
                <Link to="/chocolate">🍫 Chocolates</Link>
                <Link to="/bakery">🍔 BakeryItems</Link>
              </div>
            </div>
            <Link to="/cart" className="nav-links">
              🛒 Cart (<span className="cart-count">{cartCount}</span>)
            </Link>
            <Link to="/orders" className="nav-links">
              📦 Orders
            </Link>
            <Link to="/aboutus" className="nav-links">
              ℹ️ AboutUs
            </Link>
            <Link to="/contactus" className="nav-links">
              📞 ContactUs
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/milk" element={<Milk />} />
        <Route path="/chocolate" element={<Chocolate />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
