import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="stack">
      <h1>Page not found</h1>
      <p className="lede">That link doesn't lead anywhere on this site.</p>
      <p>
        <Link to="/" className="card-cta">
          ← Back to the help centre
        </Link>
      </p>
    </div>
  );
}
