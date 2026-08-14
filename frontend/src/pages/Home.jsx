import { Link } from "react-router-dom";

// TASK 12 — Homepage.
// Definition of done: clearly asks the customer how we can help and presents
// the two main services.
export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>How can we help you today?</h1>
        <p className="lede">
          Get an instant answer without waiting for an agent. Choose what you
          need below.
        </p>
      </section>

      <section className="cards" aria-label="Available services">
        <Link to="/order-status" className="card">
          <div className="card-icon" aria-hidden="true">
            📦
          </div>
          <h2>Where is my order?</h2>
          <p>
            Enter your Order ID to see the current status, the latest update and
            your expected delivery date.
          </p>
          <span className="card-cta">Track an order →</span>
        </Link>

        <Link to="/stock" className="card">
          <div className="card-icon" aria-hidden="true">
            📏
          </div>
          <h2>Is this in my size?</h2>
          <p>
            Enter a product and size to check whether it's in stock, and when it's expected back if not.
          </p>
          <span className="card-cta">Check availability →</span>
        </Link>
      </section>

      <p className="hint">
        Still stuck? Our support team is available Mon–Fri, 8am–6pm EAT.
      </p>
    </div>
  );
}
