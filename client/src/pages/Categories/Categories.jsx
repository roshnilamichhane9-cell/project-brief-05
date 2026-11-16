import { useCallback, useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from "../../services/categoryService";
import "../../assets/styles/crud.css";
import "./Categories.css";

const EMPTY_FORM = {
  name: "",
  description: "",
  isActive: true
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      setCategories(await getCategories());
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError("");
  }

  function handleChange(event) {
    const { checked, name, type, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setActionError("");
    setNotice("");

    const name = form.name.trim();
    if (name.length < 2) {
      setFormError("Category name must be at least 2 characters long.");
      return;
    }

    setSaving(true);
    try {
      const categoryData = {
        name,
        description: form.description.trim(),
        isActive: form.isActive
      };
      const savedCategory = editingId
        ? await updateCategory(editingId, categoryData)
        : await createCategory(categoryData);

      if (editingId) {
        setCategories((current) =>
          current.map((category) =>
            category._id === editingId ? savedCategory : category
          )
        );
        setNotice("Category updated successfully.");
      } else {
        setCategories((current) => [savedCategory, ...current]);
        setNotice("Category created successfully.");
      }
      resetForm();
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSaving(false);
    }
  }

  function startEditing(category) {
    setEditingId(category._id);
    setForm({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive
    });
    setFormError("");
    setActionError("");
    setNotice("");
  }

  async function handleDelete(category) {
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(category._id);
    setActionError("");
    setNotice("");
    try {
      await deleteCategory(category._id);
      setCategories((current) =>
        current.filter((item) => item._id !== category._id)
      );
      if (editingId === category._id) {
        resetForm();
      }
      setNotice("Category deleted successfully.");
    } catch (error) {
      setActionError(error.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="crud-page">
      <div className="page-title">
        <h2>Categories</h2>
        <p>Manage product categories.</p>
      </div>

      <section className="section-card" aria-labelledby="category-form-title">
        <h3 id="category-form-title">
          {editingId ? "Edit Category" : "Add Category"}
        </h3>
        <form className="crud-form" onSubmit={handleSubmit}>
          <div className="crud-form-grid category-form-grid">
            <label htmlFor="category-name">
              Category name
              <input
                autoComplete="off"
                id="category-name"
                maxLength="60"
                minLength="2"
                name="name"
                onChange={handleChange}
                required
                value={form.name}
              />
            </label>
            <label htmlFor="category-description">
              Description
              <textarea
                id="category-description"
                maxLength="250"
                name="description"
                onChange={handleChange}
                rows="2"
                value={form.description}
              />
            </label>
            <label className="category-active-field" htmlFor="category-active">
              <input
                checked={form.isActive}
                id="category-active"
                name="isActive"
                onChange={handleChange}
                type="checkbox"
              />
              Active
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
                  ? "Update Category"
                  : "Add Category"}
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

      <section className="section-card" aria-labelledby="category-list-title">
        <h3 id="category-list-title">Category List</h3>
        {loading ? (
          <p aria-live="polite" className="crud-state" role="status">
            Loading categories...
          </p>
        ) : loadError ? (
          <div className="crud-state">
            <p className="crud-message crud-message-error" role="alert">
              Unable to load categories: {loadError}
            </p>
            <button
              className="btn btn-secondary"
              onClick={loadCategories}
              type="button"
            >
              Try again
            </button>
          </div>
        ) : categories.length === 0 ? (
          <p className="crud-state">No categories yet. Add one above.</p>
        ) : (
          <div className="table-container">
            <table className="data-table crud-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td title={category._id}>
                      {String(category._id).slice(-6)}
                    </td>
                    <td>{category.name}</td>
                    <td>{category.description || "-"}</td>
                    <td>
                      <span
                        className={
                          category.isActive
                            ? "status category-status-active"
                            : "status category-status-inactive"
                        }
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="crud-row-actions">
                        <button
                          className="btn btn-secondary"
                          disabled={saving || deletingId === category._id}
                          onClick={() => startEditing(category)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          disabled={saving || deletingId === category._id}
                          onClick={() => handleDelete(category)}
                          type="button"
                        >
                          {deletingId === category._id
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

export default Categories;
