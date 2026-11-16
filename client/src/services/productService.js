import { apiRequest } from "./apiClient";

export async function getProducts() {
  const products = await apiRequest(
    "get",
    "/products",
    undefined,
    "Unable to load products."
  );
  if (!Array.isArray(products)) {
    throw new Error("The products API returned an invalid response.");
  }
  return products;
}

export function createProduct(product) {
  return apiRequest("post", "/products", product, "Unable to create product.");
}

export function updateProduct(id, product) {
  return apiRequest(
    "put",
    `/products/${encodeURIComponent(id)}`,
    product,
    "Unable to update product."
  );
}

export function deleteProduct(id) {
  return apiRequest(
    "delete",
    `/products/${encodeURIComponent(id)}`,
    undefined,
    "Unable to delete product."
  );
}
