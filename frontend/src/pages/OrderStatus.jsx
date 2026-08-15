import { useState } from "react";
import { lookupOrder } from "../api/supportApi";
import StatusBadge from "../components/StatusBadge";

// TASK 13 — Order Status page.
//Definition of done: customer can track their order status by entering their Order ID. 

export default function OrderStatus() {
  // --- STATE ---------------------------------------------------------------
  // useState gives you a value + a function to change it. When you call the
  // setter, React re-runs this component and redraws the screen.
  const [orderId, setOrderId] = useState("");   // what's typed in the box
  const [order, setOrder] = useState(null);     // the result, once we have one
  const [error, setError] = useState("");       // a friendly error message
  const [loading, setLoading] = useState(false); // are we waiting on the API?

  // --- EVENT HANDLER -------------------------------------------------------
  async function handleSubmit(event) {
    // Without this, the browser reloads the whole page on form submit.
    event.preventDefault();

    if (!orderId.trim()) {
      setError("Please enter your Order ID first.");
      setOrder(null);
      return;
    }

    // Reset previous results before starting a new lookup.
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const result = await lookupOrder(orderId);
      setOrder(result);
    } catch (err) {
      setError(err.message);
    } finally {
      // runs whether it succeeded or failed
      setLoading(false);
    }
  }

  // --- WHAT TO DRAW --------------------------------------------------------
  return (
    <div className="stack">
      <header className="page-head">
        <h1>Track your order</h1>
        <p className="lede">
          Enter the Order ID from your confirmation email,for example,
          <code>NS1001</code>.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="lookup-form">
        <label htmlFor="orderId">Order ID</label>
        <div className="input-row">
          <input
            id="orderId"
            type="text"
            placeholder="NS1001"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Checking…" : "Track order"}
          </button>
        </div>
      </form>

      {/* Conditional rendering: `condition && <thing/>` draws <thing/> only
          when the condition is true. */}

      {loading && <p className="muted">Looking up your order…</p>}

      {error && (
        <div className="alert alert-error" role="alert">
          <strong>We couldn't find that order</strong>
          <p>{error}</p>
        </div>
      )}

      {order && (
        <article className="result-card">
          <div className="result-head">
            <div>
              <p className="muted small">Order {order.order_id}</p>
              <h2>{order.product_name}</h2>
            </div>
            <StatusBadge value={order.status} />
          </div>

          <dl className="detail-grid">
            <div>
              <dt>Customer</dt>
              <dd>{order.customer_name}</dd>
            </div>
            <div>
              <dt>Order date</dt>
              <dd>{formatDate(order.order_date)}</dd>
            </div>
            <div>
              <dt>Expected delivery</dt>
              <dd>
                {order.expected_delivery
                  ? formatDate(order.expected_delivery)
                  : "Not applicable"}
              </dd>
            </div>
            <div>
              <dt>Product code</dt>
              <dd>{order.product_id}</dd>
            </div>
          </dl>

          <div className="latest-update">
            <dt>Latest update</dt>
            <dd>{order.last_update}</dd>
          </div>
        </article>
      )}
    </div>
  );
}

// turn "2026-08-15" into "15 Aug 2026".
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso; // if the sheet has odd data, show it raw
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
