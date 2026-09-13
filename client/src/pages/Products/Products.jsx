import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Products() {
  return (
    <div className="page-container">

      <PageTitle
        title="Products"
        subtitle="Manage products in your inventory."
      />

      <Card
        title="Product Management"
        description="Add, view and manage inventory products."
      >

        <div className="quick-actions">

          <Button>
            Add Product
          </Button>

          <Button variant="secondary">
            View Products
          </Button>

        </div>

      </Card>

    </div>
  );
}

export default Products;