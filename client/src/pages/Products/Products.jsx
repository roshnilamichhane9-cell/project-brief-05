import { useCallback, useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from "../../services/productService";
import "../../assets/styles/crud.css";

const EMPTY_FORM = {
  name: "",
  category: "",
  quantity: "0",
  price: ""
};

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      setProducts(await getProducts());
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setActionError("");
    setNotice("");

    const quantity = Number(form.quantity);
    const price = Number(form.price);
    if (
      !form.name.trim() ||
      !form.category.trim() ||
      form.quantity === "" ||
      form.price === "" ||
      !Number.isInteger(quantity) ||
      quantity < 0 ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setFormError("Enter a name, category, non-negative whole quantity, and valid price.");
      return;
    }

    const productData = {
      name: form.name.trim(),
      category: form.category.trim(),
      quantity,
      price
    };

    setSaving(true);
    try {
      const savedProduct = editingId
        ? await updateProduct(editingId, productData)
        : await createProduct(productData);

      if (editingId) {
        setProducts((current) =>
          current.map((product) =>
            product._id === editingId ? savedProduct : product
          )
        );
        setNotice("Product updated successfully.");
      } else {
        setProducts((current) => [savedProduct, ...current]);
        setNotice("Product created successfully.");
      }
      resetForm();
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSaving(false);
    }
  }

  function startEditing(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category,
      quantity: String(product.quantity),
      price: String(product.price)
    });
    setFormError("");
    setActionError("");
    setNotice("");
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(product._id);
    setActionError("");
    setNotice("");
    try {
      await deleteProduct(product._id);
      setProducts((current) =>
        current.filter((item) => item._id !== product._id)
      );
      if (editingId === product._id) {
        resetForm();
      }
      setNotice("Product deleted successfully.");
    } catch (error) {
      setActionError(error.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="crud-page">
      <div className="page-title">
        <h2>Products</h2>
        <p>Manage products and inventory stock.</p>
      </div>

      <section className="section-card" aria-labelledby="product-form-title">
        <h3 id="product-form-title">
          {editingId ? "Edit Product" : "Add Product"}
        </h3>
        <form className="crud-form" onSubmit={handleSubmit}>
          <div className="crud-form-grid">
            <label htmlFor="product-name">
              Product name
              <input
                autoComplete="off"
                id="product-name"
                maxLength="100"
                minLength="2"
                name="name"
                onChange={handleChange}
                required
                value={form.name}
              />
            </label>
            <label htmlFor="product-category">
              Category
              <input
                autoComplete="off"
                id="product-category"
                maxLength="100"
                minLength="2"
                name="category"
                onChange={handleChange}
                required
                value={form.category}
              />
            </label>
            <label htmlFor="product-quantity">
              Quantity
              <input
                id="product-quantity"
                min="0"
                name="quantity"
                onChange={handleChange}
                required
                step="1"
                type="number"
                value={form.quantity}
              />
            </label>
            <label htmlFor="product-price">
              Price (INR)
              <input
                id="product-price"
                min="0"
                name="price"
                onChange={handleChange}
                required
                step="0.01"
                type="number"
                value={form.price}
              />
            </label>
          </div>
          {formError && (
            <p className="crud-message crud-message-error" role="alert">
              {formError}
            </p>
          )}
          <div className="crud-form-actions">
            <button className="btn btn-primary" disabled={saving} type="submit">
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}
            </button>
            {editingId && (
              <button
                className="btn btn-secondary"
                disabled={saving}
                onClick={resetForm}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {notice && (
        <p className="crud-message crud-message-success" role="status">
          {notice}
        </p>
      )}
      {actionError && (
        <p className="crud-message crud-message-error" role="alert">
          {actionError}
        </p>
      )}

      <section className="section-card" aria-labelledby="product-list-title">
        <h3 id="product-list-title">Product List</h3>
        {loading ? (
          <p aria-live="polite" className="crud-state" role="status">
            Loading products...
          </p>
        ) : loadError ? (
          <div className="crud-state">
            <p className="crud-message crud-message-error" role="alert">
              Unable to load products: {loadError}
            </p>
            <button
              className="btn btn-secondary"
              onClick={loadProducts}
              type="button"
            >
              Try again
            </button>
          </div>
        ) : products.length === 0 ? (
          <p className="crud-state">No products yet. Add one above.</p>
        ) : (
          <div className="table-container">
            <table className="data-table crud-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td title={product._id}>{String(product._id).slice(-6)}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>{priceFormatter.format(product.price)}</td>
                    <td>
                      <div className="crud-row-actions">
                        <button
                          className="btn btn-secondary"
                          disabled={saving || deletingId === product._id}
                          onClick={() => startEditing(product)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          disabled={saving || deletingId === product._id}
                          onClick={() => handleDelete(product)}
                          type="button"
                        >
                          {deletingId === product._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;