declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const trackEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[GA4 Event]:", eventName, params);
    }
  }
};
