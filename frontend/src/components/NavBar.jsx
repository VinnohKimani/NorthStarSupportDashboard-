import { NavLink } from "react-router-dom";

// NavLink is like a normal <a> tag, except it does NOT reload the page,
// and it automatically knows when it is the "active" link.
export default function NavBar() {
  // A small helper: react-router hands us { isActive } and we return a class name.
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark">★</span>
        <span>Northstar Support</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/order-status" className={linkClass}>
          Track an Order
        </NavLink>
        <NavLink to="/stock" className={linkClass}>
          Check Stock
        </NavLink>
      </nav>
    </header>
  );
}
