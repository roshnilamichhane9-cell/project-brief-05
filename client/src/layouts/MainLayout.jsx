import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Inventory Management System</h1>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/purchases">Purchases</Link>
          <Link to="/sales">Sales</Link>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        © 2026 Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
}

export default MainLayout;