import { useState } from "react";
import { checkStock } from "../api/supportApi";
import StatusBadge from "../components/StatusBadge";

// TASK 15 — Stock Search Form.
// The backend needs BOTH a product and a size, so this is two inputs and
// one answer — not "search, then pick from a list of sizes".

export default function StockAvailability() {
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser reloading the page

    if (!product.trim() || !size.trim()) {
      setError("Please enter both a product and a size.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await checkStock(product, size);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // The backend's exact field names aren't confirmed yet, so read the most
  // likely ones and fall back. TODO(task 18): tighten once confirmed.
  const availability = result?.availability ?? result?.status ?? "";
  const quantity = result?.stock_quantity ?? result?.quantity;
  const inStock = String(availability).toLowerCase() === "in stock";

  return (
    <div className="stack">
      <header className="page-head">
        <h1>Check stock availability</h1>
        <p className="lede">
          Enter the product and the size you want, and we'll tell you if it's in
          stock.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="lookup-form">
        <div className="field-row">
          <div className="field">
            <label htmlFor="product">Product name or code</label>
            <input
              id="product"
              type="text"
              placeholder="Nike Air Max 270"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="field field-narrow">
            <label htmlFor="size">Size</label>
            <input
              id="size"
              type="text"
              placeholder="42"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Checking…" : "Check availability"}
        </button>
      </form>

      {loading && <p className="muted">Checking our stock levels…</p>}

      {error && (
        <div className="alert alert-error" role="alert">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <article className="result-card">
          <div className="result-head">
            <div>
              <p className="muted small">{result.product_id || "Product"}</p>
              <h2>{result.product_name || product}</h2>
            </div>
            {availability && <StatusBadge value={availability} />}
          </div>

          <div className="availability">
            <p className="availability-head">
              Size <strong>{result.size || size}</strong>
            </p>

            {inStock ? (
              <p>
                In stock
                {quantity !== undefined && ` — ${quantity} remaining`}.
                {quantity !== undefined && quantity <= 3 && (
                  <strong> Low stock, order soon.</strong>
                )}
              </p>
            ) : (
              <p>
                Out of stock.{" "}
                {result.restock_date
                  ? `We expect this size back on ${formatDate(result.restock_date)}.`
                  : "We don't have a restock date for this size yet."}
              </p>
            )}
          </div>
        </article>
      )}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
