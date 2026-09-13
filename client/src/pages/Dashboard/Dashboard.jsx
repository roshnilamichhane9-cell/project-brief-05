import React from "react";

const Dashboard = () => {
  return (
    <div>

      {/* Page Header */}

      <div className="page-header">
        <h1>Dashboard</h1>

        <p>
          Overview of your inventory management system.
        </p>
      </div>


      {/* Statistics */}

      <div className="card-grid">

        <div className="card stat-card">
          <div className="stat-title">
            Total Products
          </div>

          <div className="stat-value">
            120
          </div>
        </div>


        <div className="card stat-card">
          <div className="stat-title">
            Categories
          </div>

          <div className="stat-value">
            15
          </div>
        </div>


        <div className="card stat-card">
          <div className="stat-title">
            Suppliers
          </div>

          <div className="stat-value">
            25
          </div>
        </div>


        <div className="card stat-card">
          <div className="stat-title">
            Purchases
          </div>

          <div className="stat-value">
            48
          </div>
        </div>

      </div>


      {/* Dashboard Content */}

      <div className="dashboard-content">


        {/* Recent Activity */}

        <div className="card">

          <h3>Recent Activity</h3>

          <div className="activity-list">

            <div className="activity-item">

              <div className="activity-icon">
                P
              </div>

              <div className="activity-text">
                <h4>New Product Added</h4>

                <p>
                  A new product was added to the inventory.
                </p>
              </div>

            </div>


            <div className="activity-item">

              <div className="activity-icon">
                S
              </div>

              <div className="activity-text">
                <h4>Supplier Updated</h4>

                <p>
                  Supplier information was successfully updated.
                </p>
              </div>

            </div>


            <div className="activity-item">

              <div className="activity-icon">
                P
              </div>

              <div className="activity-text">
                <h4>Purchase Created</h4>

                <p>
                  A new purchase order has been created.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="card">

          <h3>Quick Actions</h3>

          <p style={{ marginTop: "8px", marginBottom: "20px" }}>
            Quickly access important inventory functions.
          </p>


          <div className="quick-actions">

            <button className="btn btn-primary">
              Add Product
            </button>

            <button className="btn btn-secondary">
              Add Supplier
            </button>

            <button className="btn btn-secondary">
              Create Purchase
            </button>

          </div>

        </div>

      </div>


      {/* Inventory Overview */}

      <div className="content-section" style={{ marginTop: "25px" }}>

        <div className="card">

          <h3>Inventory Overview</h3>

          <div
            className="card-grid"
            style={{ marginTop: "20px" }}
          >

            <div className="card">
              <div className="stat-title">
                In Stock
              </div>

              <div className="stat-value">
                95
              </div>
            </div>


            <div className="card">
              <div className="stat-title">
                Low Stock
              </div>

              <div className="stat-value">
                15
              </div>
            </div>


            <div className="card">
              <div className="stat-title">
                Out of Stock
              </div>

              <div className="stat-value">
                10
              </div>
            </div>


            <div className="card">
              <div className="stat-title">
                Pending
              </div>

              <div className="stat-value">
                18
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;