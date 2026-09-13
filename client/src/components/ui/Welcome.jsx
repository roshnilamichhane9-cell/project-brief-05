function Welcome({ userName, projectName }) {
  return (
    <div className="welcome-box">
      <h2>Welcome, {userName}!</h2>

      <p>
        Welcome to the {projectName}.
      </p>

      <p>
        Manage products, suppliers, purchases, sales and inventory efficiently.
      </p>
    </div>
  );
}

export default Welcome;