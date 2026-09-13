import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px"
      }}
    >

      <h1 style={{ fontSize: "60px" }}>
        404
      </h1>

      <h2>
        Page Not Found
      </h2>

      <p style={{ margin: "15px 0" }}>
        The page you are looking for does not exist.
      </p>

      <Link to="/">
        Go to Home
      </Link>

    </div>
  );
}

export default NotFound;