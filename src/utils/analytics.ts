declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export const trackEvent = (
  eventName: string,
  params: Record<string, unknown> = {}
) => {
  if (
    typeof window !== "undefined" &&
    Array.isArray(window.dataLayer)
  ) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[GA4 Event]:", eventName, params);
    }
  } else {
    if (process.env.NODE_ENV === "development") {
      console.warn("dataLayer no está definido o no es un arreglo.");
    }
  }
};
