import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Login() {
  return (
    <div className="login-container">

      <PageTitle
        title="Login"
        subtitle="Sign in to your inventory system."
      />

      <Card>

        <div className="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
          />

        </div>


        <div className="form-group">

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
          />

        </div>


        <Button type="submit">
          Login
        </Button>

      </Card>

    </div>
  );
}

export default Login;