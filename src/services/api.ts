import axios from "axios";

const API_BASE_URL = "http://localhost:8000/app_diversa/v1";

export const fetchSurveys = async () => {
  const response = await axios.get(`${API_BASE_URL}/surveys/`);
  return response.data;
};

export const fetchSurveyById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/surveys/${id}/`);
  return response.data;
};

export const fetchChapters = async (surveyId: string) => {
  const response = await axios.get(`${API_BASE_URL}/chapters/?survey=${surveyId}`);
  return response.data;
};

export const fetchQuestions = async (chapterId: string) => {
  const response = await axios.get(`${API_BASE_URL}/questions/?chapter=${chapterId}`);
  return response.data;
};

export const submitResponse = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/submit-response/`, data);
  return response.data;
};
