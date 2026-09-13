import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Home() {
  return (
    <div className="page-container">

      <PageTitle
        title="Home"
        subtitle="Welcome to the Inventory Management System."
      />

      <Card
        title="Welcome to Inventory Management System"
        description="Manage products, suppliers, purchases, sales and inventory in one place."
      >

        <p>
          The Inventory Management System helps businesses
          manage their products, suppliers, purchases,
          sales and inventory efficiently.
        </p>

        <div className="quick-actions" style={{ marginTop: "20px" }}>

          <Button>
            Get Started
          </Button>

        </div>

      </Card>

    </div>
  );
}

export default Home;