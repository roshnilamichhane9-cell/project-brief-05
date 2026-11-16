import { apiRequest } from "./apiClient";

export async function getCategories() {
  const categories = await apiRequest(
    "get",
    "/categories",
    undefined,
    "Unable to load categories."
  );
  if (!Array.isArray(categories)) {
    throw new Error("The categories API returned an invalid response.");
  }
  return categories;
}

export function getCategoryById(id) {
  return apiRequest(
    "get",
    `/categories/${encodeURIComponent(id)}`,
    undefined,
    "Unable to load category."
  );
}

export function createCategory(category) {
  return apiRequest(
    "post",
    "/categories",
    category,
    "Unable to create category."
  );
}

export function updateCategory(id, category) {
  return apiRequest(
    "put",
    `/categories/${encodeURIComponent(id)}`,
    category,
    "Unable to update category."
  );
}

export function deleteCategory(id) {
  return apiRequest(
    "delete",
    `/categories/${encodeURIComponent(id)}`,
    undefined,
    "Unable to delete category."
  );
}
