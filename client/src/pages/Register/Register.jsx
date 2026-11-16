import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../Auth/Auth.css";

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

function Register() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    const name = form.name.trim();
    if (name.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        name,
        email: form.email.trim(),
        password: form.password
      });
      setForm(EMPTY_FORM);
      setNotice("Account created successfully. You can now log in.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="register-title">
        <h1 id="register-title">Create Account</h1>
        <p className="auth-intro">Register to get started.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">
            Name
            <input
              autoComplete="name"
              id="register-name"
              maxLength="100"
              name="name"
              onChange={handleChange}
              required
              value={form.name}
            />
          </label>
          <label htmlFor="register-email">
            Email
            <input
              autoComplete="email"
              id="register-email"
              maxLength="254"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={form.email}
            />
          </label>
          <div className="auth-field">
            <label htmlFor="register-password">Password</label>
            <div className="auth-password-control">
              <input
                autoComplete="new-password"
                id="register-password"
                maxLength="72"
                minLength="8"
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
          <div className="auth-field">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <div className="auth-password-control">
              <input
                autoComplete="new-password"
                id="register-confirm-password"
                maxLength="72"
                minLength="8"
                name="confirmPassword"
                onChange={handleChange}
                required
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
              />
              <button
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={showConfirmPassword}
                className="auth-password-toggle"
                onClick={() =>
                  setShowConfirmPassword((current) => !current)
                }
                type="button"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="auth-message auth-error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="auth-message auth-success" role="status">
              {notice}
            </p>
          )}

          <button
            className="btn btn-primary auth-submit"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
