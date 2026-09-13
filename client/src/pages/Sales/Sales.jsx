import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Sales() {
  return (
    <div className="page-container">

      <PageTitle
        title="Sales"
        subtitle="Manage sales and inventory transactions."
      />

      <Card
        title="Sales Management"
        description="Create and manage sales transactions."
      >

        <div className="quick-actions">

          <Button>
            Add Sale
          </Button>

          <Button variant="secondary">
            View Sales
          </Button>

        </div>

      </Card>

    </div>
  );
}

export default Sales;