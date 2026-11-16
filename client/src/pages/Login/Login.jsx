import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../Auth/Auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const email = form.email.trim();
    if (!email || !form.password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      await loginUser({ email, password: form.password });
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <h1 id="login-title">Login</h1>
        <p className="auth-intro">Sign in to your inventory account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">
            Email
            <input
              autoComplete="email"
              id="login-email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={form.email}
            />
          </label>
          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <div className="auth-password-control">
              <input
                autoComplete="current-password"
                id="login-password"
                name="password"
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                value={form.password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="auth-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                type="button"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="auth-message auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="btn btn-primary auth-submit"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="auth-link">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
        <p className="auth-link">
          <Link to="/">Back to Home</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;