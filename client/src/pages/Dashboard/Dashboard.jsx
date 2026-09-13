import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>

      <div className="page-title">
        <h2>Dashboard</h2>

        <p>
          Overview of your inventory management system.
        </p>
      </div>


      {/* Statistics */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Products</h3>

          <div className="dashboard-number">
            120
          </div>

          <p>Products in inventory</p>
        </div>


        <div className="dashboard-card">
          <h3>Total Categories</h3>

          <div className="dashboard-number">
            18
          </div>

          <p>Product categories</p>
        </div>


        <div className="dashboard-card">
          <h3>Total Suppliers</h3>

          <div className="dashboard-number">
            24
          </div>

          <p>Registered suppliers</p>
        </div>


        <div className="dashboard-card">
          <h3>Total Sales</h3>

          <div className="dashboard-number">
            58
          </div>

          <p>Sales transactions</p>
        </div>

      </div>


      {/* Lower sections */}

      <div className="dashboard-sections">


        {/* Recent transactions */}

        <div className="section-card">

          <h3>Recent Transactions</h3>

          <div className="table-container">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Sale #1001</td>
                  <td>Laptop</td>
                  <td>2</td>
                  <td>
                    <span className="status">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Purchase #2001</td>
                  <td>Keyboard</td>
                  <td>20</td>
                  <td>
                    <span className="status">
                      Received
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Sale #1002</td>
                  <td>Mouse</td>
                  <td>5</td>
                  <td>
                    <span className="status">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Purchase #2002</td>
                  <td>Monitor</td>
                  <td>10</td>
                  <td>
                    <span className="status">
                      Pending
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>


        {/* Quick actions */}

        <div className="section-card">

          <h3>Quick Actions</h3>

          <div className="quick-actions">

            <Link
              to="/products"
              className="quick-action"
            >
              Manage Products
            </Link>

            <Link
              to="/suppliers"
              className="quick-action"
            >
              Manage Suppliers
            </Link>

            <Link
              to="/purchases"
              className="quick-action"
            >
              View Purchases
            </Link>

            <Link
              to="/sales"
              className="quick-action"
            >
              View Sales
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;