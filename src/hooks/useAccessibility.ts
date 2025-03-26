import { useEffect, useState } from "react";
import { applyFontSize } from "@/styles/accessibilityStyles";

const fontSizeArray = ["14px", "16px", "18px", "20px", "24px"];

export function useAccessibility() {
  const [contrast, setContrast] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContrast = localStorage.getItem("contrast") === "true";
      const savedFontSize = localStorage.getItem("fontsize")
        ? parseInt(localStorage.getItem("fontsize") as string, 10)
        : 1;

      setContrast(savedContrast);
      setFontSizeIndex(savedFontSize);
      setIsMobile(window.innerWidth <= 768);

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
    const maxIndex = isMobile ? 3 : fontSizeArray.length - 1; // Solo 2 clics extra en móvil
    if (fontSizeIndex < maxIndex) {
      updateFontSize(fontSizeIndex + 1);
    }
  };

  const decreaseFontSize = () => {
    const minIndex = isMobile ? 1 : 0; // Solo permite bajar hasta el tamaño base en móvil
    if (fontSizeIndex > minIndex) {
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

  const canIncreaseFontSize = isMobile
    ? fontSizeIndex < 3
    : fontSizeIndex < fontSizeArray.length - 1;

  const canDecreaseFontSize = isMobile
    ? fontSizeIndex > 0
    : fontSizeIndex > 0;

  return {
    contrast,
    fontSize: fontSizeArray[fontSizeIndex],
    toggleContrast,
    increaseFontSize,
    decreaseFontSize,
    resetAccessibility,
    canIncreaseFontSize,
    canDecreaseFontSize,
  };
}
