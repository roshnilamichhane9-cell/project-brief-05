import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app">

      {/* Navigation Bar */}
      <header className="navbar">
        <div className="navbar-container">

          {/* Logo / Website Name */}
          <Link to="/" className="navbar-brand">
            Inventory Management System
          </Link>

          {/* Navigation Links */}
          <nav className="navbar-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/products">
              Products
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/suppliers">
              Suppliers
            </Link>

            <Link to="/purchases">
              Purchases
            </Link>

            <Link to="/sales">
              Sales
            </Link>

          </nav>

        </div>
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2026 Inventory Management System. All rights reserved.
      </footer>

    </div>
  );
}

export default MainLayout;