import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1>Inventory Management System</h1>
        <p>Manage products, suppliers, purchases, sales and inventory.</p>
      </header>

      <nav>
        <Link to="/">Dashboard</Link>{" | "}
        <Link to="/products">Products</Link>{" | "}
        <Link to="/categories">Categories</Link>{" | "}
        <Link to="/suppliers">Suppliers</Link>{" | "}
        <Link to="/purchases">Purchases</Link>{" | "}
        <Link to="/sales">Sales</Link>{" | "}
        <Link to="/inventory">Inventory</Link>{" | "}
        <Link to="/reports">Reports</Link>
      </nav>

      <main>
        <h2>Dashboard</h2>

        <div>
          <h3>Total Products</h3>
          <p>0</p>
        </div>

        <div>
          <h3>Total Suppliers</h3>
          <p>0</p>
        </div>

        <div>
          <h3>Total Purchases</h3>
          <p>0</p>
        </div>

        <div>
          <h3>Total Sales</h3>
          <p>0</p>
        </div>
      </main>
    </div>
  );
}

export default App;