import { applyFontSize } from "@/styles/accessibilityStyles";
import { useEffect, useState } from "react";

const fontSizeArray = ["14px", "16px", "18px", "20px", "24px"];

export function useAccessibility() {
  const [contrast, setContrast] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // Por defecto en 16px

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContrast = localStorage.getItem("contrast") === "true";
      const savedFontSize = localStorage.getItem("fontsize")
        ? parseInt(localStorage.getItem("fontsize") as string, 10)
        : 1;

      setContrast(savedContrast);
      setFontSizeIndex(savedFontSize);

      document.body.classList.toggle("contrast", savedContrast);
      applyFontSize(fontSizeArray[savedFontSize]);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      applyFontSize(fontSizeArray[fontSizeIndex]);
    }
  }, [fontSizeIndex]);

  const toggleContrast = () => {
    if (typeof window !== "undefined") {
      const newContrast = !contrast;
      setContrast(newContrast);
      localStorage.setItem("contrast", newContrast.toString());
      document.body.classList.toggle("contrast", newContrast);
    }
  };

  const updateFontSize = (newIndex: number) => {
    if (typeof window !== "undefined") {
      setFontSizeIndex(newIndex);
      localStorage.setItem("fontsize", newIndex.toString());
      applyFontSize(fontSizeArray[newIndex]);
    }
  };

  const increaseFontSize = () => {
    if (fontSizeIndex < fontSizeArray.length - 1) {
      updateFontSize(fontSizeIndex + 1);
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeIndex > 0) {
      updateFontSize(fontSizeIndex - 1);
    }
  };

  const resetAccessibility = () => {
    if (typeof window !== "undefined") {
      setContrast(false);
      setFontSizeIndex(1);

      localStorage.setItem("contrast", "false");
      localStorage.setItem("fontsize", "1");

      document.body.classList.remove("contrast");
      applyFontSize(fontSizeArray[1]);
    }
  };

  return {
    contrast,
    fontSize: fontSizeArray[fontSizeIndex],
    toggleContrast,
    increaseFontSize,
    decreaseFontSize,
    resetAccessibility,
  };
}
