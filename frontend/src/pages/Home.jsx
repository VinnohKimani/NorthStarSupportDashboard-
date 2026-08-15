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
           Choose what you need below.
        </p>
      </section>

      <section className="cards" aria-label="Available services">
        <Link to="/order-status" className="card">
          <div className="card-icon" aria-hidden="true">
            
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
          
          </div>
          <h2>Is this available in my size?</h2>
          <p>
            Search for a product and pick a size to check whether it is in stock,
            and when it is expected back if not.
          </p>
          <span className="card-cta">Check availability →</span>
        </Link>
      </section>

      <p className="hint">
        Our support team is available Mon–Fri, 8am–6pm EAT.
      </p>
    </div>
  );
}
