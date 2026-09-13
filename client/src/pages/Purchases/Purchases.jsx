import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Purchases() {
  return (
    <div className="page-container">

      <PageTitle
        title="Purchases"
        subtitle="Manage purchase orders and transactions."
      />

      <Card
        title="Purchase Management"
        description="Create and manage purchase orders."
      >

        <div className="quick-actions">

          <Button>
            Add Purchase
          </Button>

          <Button variant="secondary">
            View Purchases
          </Button>

        </div>

      </Card>

    </div>
  );
}

export default Purchases;