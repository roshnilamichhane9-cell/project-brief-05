import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export async function apiRequest(method, url, body, fallbackMessage) {
  try {
    const response = await api.request({ method, url, data: body });
    if (!response.data?.success) {
      throw new Error(response.data?.message || fallbackMessage);
    }

    return response.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      (error.request && !error.response
        ? "Unable to reach the server. Check that the backend is running."
        : error.message || fallbackMessage);
    throw new Error(message, { cause: error });
  }
}
