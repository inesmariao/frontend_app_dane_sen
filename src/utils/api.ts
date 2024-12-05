import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para el registro de usuarios
export const registerUser = async (userData: {
  identifier: string;
  password: string;
  name?: string;
  last_name?: string;
}) => {
  try {
    const response = await apiClient.post("/users/v1/register/", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Error al conectar con el servidor");
    }
  }
};

export default apiClient;
