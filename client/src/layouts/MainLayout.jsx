import { Link, Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Suppliers",
      path: "/suppliers",
    },
    {
      name: "Purchases",
      path: "/purchases",
    },
    {
      name: "Sales",
      path: "/sales",
    },
  ];

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <div className="logo-box">IMS</div>

          <div>
            <h2>Inventory</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <p className="nav-heading">
            MAIN MENU
          </p>

          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {item.name}
            </Link>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <Link to="/login" className="nav-link">
            Logout
          </Link>

        </div>

      </aside>


      {/* Main area */}
      <div className="main-area">

        <header className="top-header">

          <div>
            <h1>Inventory Management System</h1>
            <p>Manage your inventory efficiently</p>
          </div>

          <div className="profile-box">

            <div className="profile-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Admin</span>
            </div>

          </div>

        </header>


        <main className="page-content">
          <Outlet />
        </main>


        <footer className="app-footer">
          © 2026 Inventory Management System.
          All rights reserved.
        </footer>

      </div>

    </div>
  );
}

export default MainLayout;