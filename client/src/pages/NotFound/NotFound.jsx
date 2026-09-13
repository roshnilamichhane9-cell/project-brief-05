import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
      }}
    >

      <h1 style={{ fontSize: "60px" }}>
        404
      </h1>

      <h2>
        Page Not Found
      </h2>

      <p
        style={{
          color: "#777",
          margin: "12px 0 25px",
        }}
      >
        The page you are looking for does not exist.
      </p>

      <Link
        to="/dashboard"
        className="btn btn-primary"
      >
        Go to Dashboard
      </Link>

    </div>
  );
}

export default NotFound;