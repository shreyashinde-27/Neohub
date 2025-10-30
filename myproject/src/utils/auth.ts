// utils/auth.ts

// Save JWT token in localStorage
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Get JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove JWT token (logout)
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  // Optional: check expiration of JWT (if decoded)
  // For simplicity, we just check if token exists
  return true;
};

// Get user info
export const getUser = () => {
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("userName");
  if (!email || !name) return null;
  return { email, name };
};
