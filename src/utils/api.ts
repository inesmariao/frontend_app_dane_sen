import axios from "axios";
import { getAuthToken, clearAuthData } from "@/utils/auth";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// **Rutas públicas (NO requieren autenticación)**
const publicEndpoints = ["/users/v1/register/", "/users/v1/login/"];

// **Interceptor para agregar el token solo en solicitudes protegidas**
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    // Si la URL NO está en `publicEndpoints`, agrega el token
    if (token && !publicEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// **Interceptor para manejar errores de autenticación y redirigir al login**
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401 || error.response?.status === 403) {
      clearAuthData();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }
    }

    return Promise.reject(error);
  }
);

// Método para el registro de usuarios
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
      throw new Error(error.response.data.error || "Error al registrar usuario");
    } else {
      throw new Error("Error al conectar con el servidor");
    }
  }
};

// Método para el login
export const loginUser = async (credentials: { identifier: string; password: string }) => {
  try {
    const response = await apiClient.post("/users/v1/login/", credentials);

    const { access_token, refresh_token, user } = response.data;

    if (!access_token || !user) {
      throw new Error("Respuesta inválida del backend.");
    }

    return { token: access_token, refreshToken: refresh_token, user };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error al iniciar sesión.");
  }
};

// Método para obtener datos de las encuestas
export const getSurvey = async (surveyId: number) => {

  try {

    if (!surveyId || isNaN(surveyId)) {
      console.error("ID de la encuesta no válido.");
      return null;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }
      return null;
    }

    const response = await apiClient.get(`/app_diversa/v1/surveys/${surveyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Sesión expirada. Redirigiendo...");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }
      return null;
    }

    console.error("Error en getSurvey:", error.message || error);
    return null;
  }
};

// Método para enviar las respuestas al Backend
export const submitResponses = async (responses: any) => {
  try {
    const response = await apiClient.post("/app_diversa/v1/submit-response/", responses);

    return response.data;
  } catch (error: any) {
    console.error("Error al enviar las respuestas:", error.response?.data || error.message);
    throw new Error("Error al enviar las respuestas. Por favor, intenta de nuevo.");
  }
};

export default apiClient;
