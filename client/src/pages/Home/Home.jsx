import { Link } from "react-router-dom";
import Welcome from "../../components/ui/Welcome";

function Home() {
  return (
    <div className="page-container">

      <h1>Home</h1>

      <p className="page-description">
        Welcome to the Inventory Management System.
      </p>

      <Welcome
        userName="Administrator"
        projectName="Inventory Management System"
      />

      <div className="home-actions">
        <Link to="/dashboard" className="primary-button">
          Go to Dashboard
        </Link>
      </div>

    </div>
  );
}

export default Home;