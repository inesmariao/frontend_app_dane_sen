import { User } from "@/types";

// Obtener el token almacenado en localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Guardar el token y usuario en localStorage
export const setAuthData = (token: string, user: User) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("authUser", JSON.stringify(user));
};

// Limpiar datos de autenticación y cerrar sesión
export const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
};
