export const handleError = (message: string, error?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.error(`❌ ${message}`, error);
  }
};