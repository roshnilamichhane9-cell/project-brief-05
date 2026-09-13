import { useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Dashboard() {

  const [notificationCount, setNotificationCount] = useState(3);

  const [showMessage, setShowMessage] = useState(false);

  const [userName, setUserName] = useState("");

  const handleNotification = () => {
    setNotificationCount(notificationCount + 1);
  };

  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div className="page-container">

      <PageTitle
        title="Dashboard"
        description="Overview of your inventory management system."
      />

      {/* Dashboard Cards */}
      <div className="dashboard-grid">

        <Card
          title="Products"
          value="120"
          description="Total products"
        />

        <Card
          title="Categories"
          value="15"
          description="Product categories"
        />

        <Card
          title="Suppliers"
          value="25"
          description="Active suppliers"
        />

        <Card
          title="Sales"
          value="85"
          description="Total sales"
        />

      </div>

      {/* State Example */}
      <section className="interactive-section">

        <h2>Notification Counter</h2>

        <p>
          Notifications: <strong>{notificationCount}</strong>
        </p>

        <Button onClick={handleNotification}>
          Add Notification
        </Button>

      </section>

      {/* Button Event */}
      <section className="interactive-section">

        <h2>Message Toggle</h2>

        <Button onClick={handleMessage}>
          {showMessage ? "Hide Message" : "Show Message"}
        </Button>

        {showMessage && (
          <p className="success-message">
            Welcome to your Inventory Dashboard!
          </p>
        )}

      </section>

      {/* Input Event */}
      <section className="interactive-section">

        <h2>Enter Your Name</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />

        {userName && (
          <p>
            Hello, <strong>{userName}</strong>!
          </p>
        )}

      </section>

    </div>
  );
}

export default Dashboard;