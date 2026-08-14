// ---------------------------------------------------------------------------
// THE SEAM between the React pages and the Flask backend.
//
// Pages never call fetch() directly — they call these two functions.
// That means task 16 (API integration) only ever touches THIS file.
//
// Endpoints confirmed from backend/app.py:
//   GET /api/orders/<order_id>
//   GET /api/stock?product=<name or SKU>&size=<size>
//
// Both return { "error": "..." } with a customer-friendly message on failure,
// so we surface the backend's own wording rather than inventing our own.
// ---------------------------------------------------------------------------

const BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

// Shared helper: read the response, and turn any non-200 into a thrown Error
// carrying the backend's message.
async function request(url) {
  let res;
  try {
    res = await fetch(url);
  } catch {
    // fetch only rejects when the network itself failed — server down, CORS,
    // no connection. A 404 does NOT land here.
    throw new Error(
      "We can't reach the support service right now. Please check that the backend is running and try again."
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again shortly.");
  }
  return data;
}

/**
 * Look up one order by its Order ID.
 * @param {string} orderId e.g. "NS1001"
 * @returns {Promise<object>} the order row from the Orders sheet
 */
export async function lookupOrder(orderId) {
  const id = orderId.trim();
  return request(`${BASE}/orders/${encodeURIComponent(id)}`);
}

/**
 * Check availability of one product in one size.
 * The backend requires BOTH parameters and 400s if either is missing.
 * @param {string} product product name or SKU
 * @param {string} size    e.g. "42", "M"
 */
export async function checkStock(product, size) {
  const params = new URLSearchParams({
    product: product.trim(),
    size: size.trim(),
  });
  return request(`${BASE}/stock?${params}`);
}
