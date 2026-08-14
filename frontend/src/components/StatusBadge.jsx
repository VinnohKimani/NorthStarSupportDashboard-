// A tiny reusable component: shows a coloured pill for an order status
// or a stock availability value.
//
// This is the simplest possible React component: it takes "props" (inputs)
// and returns some JSX (what to draw). No state, no logic beyond a lookup.

const TONE = {
  // order statuses
  processing: "amber",
  packaged: "amber",
  shipped: "blue",
  "in transit": "blue",
  delivered: "green",
  cancelled: "red",
  // stock availability
  available: "green",
  unavailable: "red",
};

export default function StatusBadge({ value }) {
  const tone = TONE[String(value).toLowerCase()] || "grey";
  return <span className={`badge badge-${tone}`}>{value}</span>;
}
