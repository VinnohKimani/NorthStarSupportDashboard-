import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

// App is the layout shell that every page shares.
// <Outlet /> is the hole that react-router fills with the current page.
export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="page">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Northstar Retail Co. Self-Service Support</p>
      </footer>
    </div>
  );
}
