import { apiRequest } from "./apiClient";

export function registerUser(user) {
  return apiRequest(
    "post",
    "/auth/register",
    user,
    "Unable to create account."
  );
}

export function loginUser(credentials) {
  return apiRequest(
    "post",
    "/auth/login",
    credentials,
    "Unable to log in."
  );
}
