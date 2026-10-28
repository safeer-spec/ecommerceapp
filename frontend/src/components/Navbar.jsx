import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice.js";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart.items.length);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">SHOPIFY</Link>
      <div className="navbar-nav me-auto">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/orders">Orders</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
      </div>
      <div className="navbar-nav align-items-center">
        <Link className="nav-link" to="/cart">Cart ({cartCount})</Link>
        {user ? (
          <>
            <span className="navbar-text me-2">Hi, {user.name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
