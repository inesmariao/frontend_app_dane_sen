import axios from "axios";

export const handleError = (message: string, error?: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`❌ ${message}`, error.response.data);
    } else {
      console.error(`❌ ${message}`, error);
    }
  }
};
