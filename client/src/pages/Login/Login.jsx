import { Link } from "react-router-dom";

function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          border: "1px solid #dddddd",
          borderRadius: "10px",
          padding: "35px",
        }}
      >

        <h2 style={{ marginBottom: "8px" }}>
          Login
        </h2>

        <p
          style={{
            color: "#777",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          Sign in to your inventory account.
        </p>


        <form>

          <div style={{ marginBottom: "18px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
              }}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "11px",
                border: "1px solid #cccccc",
                borderRadius: "6px",
              }}
            />

          </div>


          <div style={{ marginBottom: "22px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "11px",
                border: "1px solid #cccccc",
                borderRadius: "6px",
              }}
            />

          </div>


          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
            }}
          >
            Login
          </button>

        </form>


        <div style={{ marginTop: "20px" }}>

          <Link to="/">
            Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;