import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
export const fetchSurvey = async (surveyId: number) => {
  try {
    const response = await fetch(`${API_URL}/v1/surveys/${surveyId}`);
    if (!response.ok) {
      throw new Error("Error al obtener la encuesta.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en fetchSurvey:", error);
    throw error;
  }
};

// Método para enviar las respuestas al Backend
export const submitResponses = async (responses: any) => {
  try {
    const response = await axios.post(`${API_URL}/responses`, responses, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al enviar las respuestas.");
  }
};

export default apiClient;
