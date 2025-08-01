import axios, { AxiosError } from "axios";
import { getAuthToken, clearAuthData, setAuthData } from "@/utils/auth";
import { SurveyResponse } from "@/types";
import { handleError } from "@/utils/errorHandling";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Rutas públicas (NO requieren autenticación)
const publicEndpoints = ["/app_diversa/v1/messages/", "/users/v1/register/", "/users/v1/login/"];

// Interceptor para agregar el token solo en solicitudes protegidas
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

// Interceptor para manejar errores de autenticación y redirigir al login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      clearAuthData();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }
    } else if (error.response?.status === 403) {
      // Verifica si el error es debido a la respuesta del usuario y no debe cerrar sesión
      if (error.response.data?.message?.includes("No cumple con los requisitos")) {
        return Promise.reject(error);
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
        handleError(error.response.data?.error || "Error al registrar usuario");
    }
    if (error instanceof Error) {
      handleError(error.message);
    }
    handleError("Error al conectar con el servidor");
  }
};

// Método para el login
export const loginUser = async (credentials: { identifier: string; password: string }) => {
  try {
    const response = await apiClient.post("/users/v1/login/", credentials);

    const { access_token, refresh_token, user } = response.data;

    if (!access_token || !user) {
      handleError("Respuesta inválida del backend.");
    }

    setAuthData(access_token, user);

    return { token: access_token, refreshToken: refresh_token, user };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      handleError(error.response.data?.error || "Error al iniciar sesión.");
    }
    if (error instanceof Error) {
      handleError(error.message);
    }
    handleError("Error al conectar con el servidor durante el inicio de sesión.");
  }
};

// Método para obtener datos de las encuestas
export const getSurvey = async (surveyId: number) => {

  try {

    if (!surveyId || isNaN(surveyId)) {
      handleError("ID de la encuesta no válido.");
      return null;
    }

    const token = getAuthToken();
    if (!token) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }
      return null;
    }

    const response = await apiClient.get(`/app_diversa/v1/surveys/${surveyId}`);

    // const response = await apiClient.get(`/app_diversa/v1/surveys/${surveyId}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.warn("Sesión expirada. Redirigiendo...");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:logout"));
        }
        return null;
      }
      handleError(error.response.data?.error || "Error al obtener la encuesta.");
    }
    if (error instanceof Error) {
      handleError(error.message);
    }
    handleError("Error desconocido al obtener la encuesta.");
  }
};

// Método para enviar las respuestas al Backend
export async function submitResponses(responses: SurveyResponse[]) {
  try {
    const response = await apiClient.post("/app_diversa/v1/submit-response/", responses);

    // Verificar si la respuesta es exitosa (código de estado 2xx)
    if (response.status < 200 || response.status >= 300) {
      handleError(`Error en la API al enviar respuestas: ${response.status} ${response.statusText}`);
      return { success: false, error: `Error ${response.status}: ${response.statusText}` };
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as { error?: string };
      handleError(`Error de Axios al conectar con la API: ${responseData?.error || "Error de conexión con el servidor"}`);
      return { success: false, error: responseData?.error || "Error de conexión con el servidor" };
    }
    if (error instanceof Error) {
      handleError(`Error desconocido al conectar con la API: ${error.message}`);
      return { success: false, error: "Error de conexión con el servidor" };
    }
    handleError(`Error desconocido al conectar con la API: ${error}`);
    return { success: false, error: "Error de conexión con el servidor" };
  }
}

// Método para obtener un mensaje del sistema por clave
export const getSystemMessage = async (key: string): Promise<{ title: string; content: string } | null> => {
  try {
    const response = await apiClient.get(`/app_diversa/v1/messages/${key}/`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      handleError(error.response.data?.error || "No se pudo obtener el mensaje del sistema.");
    }
    if (error instanceof Error) {
      handleError(error.message);
    }
    return null;
  }
};


export default apiClient;
