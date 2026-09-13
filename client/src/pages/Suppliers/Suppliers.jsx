import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Suppliers() {
  return (
    <div className="page-container">

      <PageTitle
        title="Suppliers"
        subtitle="Manage supplier information."
      />

      <Card
        title="Supplier Management"
        description="View and manage registered suppliers."
      >

        <div className="quick-actions">

          <Button>
            Add Supplier
          </Button>

          <Button variant="secondary">
            View Suppliers
          </Button>

        </div>

      </Card>

    </div>
  );
}

export default Suppliers;