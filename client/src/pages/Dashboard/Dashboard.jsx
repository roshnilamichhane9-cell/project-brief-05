function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>

      <p>
        Welcome to the Inventory Management System Dashboard.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Total Suppliers</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Total Purchases</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Total Sales</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;