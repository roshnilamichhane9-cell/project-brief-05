import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Categories() {
  return (
    <div className="page-container">

      <PageTitle
        title="Categories"
        subtitle="Organize products into categories."
      />

      <Card
        title="Category Management"
        description="Manage product categories."
      >

        <div className="quick-actions">

          <Button>
            Add Category
          </Button>

          <Button variant="secondary">
            View Categories
          </Button>

        </div>

      </Card>

    </div>
  );
}

export default Categories;