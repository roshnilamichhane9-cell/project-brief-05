import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

async function request(method, url, body, fallbackMessage) {
  try {
    const response = await api.request({ method, url, data: body });
    if (!response.data?.success) {
      throw new Error(response.data?.message || fallbackMessage);
    }

    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || fallbackMessage;
    throw new Error(message, { cause: error });
  }
}

export async function getProducts() {
  const products = await request(
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
  return request("post", "/products", product, "Unable to create product.");
}

export function updateProduct(id, product) {
  return request(
    "put",
    `/products/${encodeURIComponent(id)}`,
    product,
    "Unable to update product."
  );
}

export function deleteProduct(id) {
  return request(
    "delete",
    `/products/${encodeURIComponent(id)}`,
    undefined,
    "Unable to delete product."
  );
}
