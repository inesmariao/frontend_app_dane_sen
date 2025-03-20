import { useEffect, useState } from "react";

const fontSizeArray = ["14px", "16px", "18px", "20px", "24px"];

export function useAccessibility() {
  const [contrast, setContrast] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // Por defecto en 16px

  useEffect(() => {
    const savedContrast = localStorage.getItem("contrast") === "true";
    const savedFontSize = localStorage.getItem("fontsize")
      ? parseInt(localStorage.getItem("fontsize") as string, 10)
      : 1;

    setContrast(savedContrast);
    setFontSizeIndex(savedFontSize);

    // Aplica la clase de contraste al body
    document.body.classList.toggle("contrast", savedContrast);
  }, []);

  useEffect(() => {
    // Aplica el estilo de fuente al body
    document.body.style.fontSize = fontSizeArray[fontSizeIndex];
  }, [fontSizeIndex]);

  const toggleContrast = () => {
    const newContrast = !contrast;
    setContrast(newContrast);
    localStorage.setItem("contrast", newContrast.toString());

    // Aplica o remueve la clase de alto contraste
    document.body.classList.toggle("contrast", newContrast);
  };

  const updateFontSize = (newIndex: number) => {
    setFontSizeIndex(newIndex);
    localStorage.setItem("fontsize", newIndex.toString());
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
    setContrast(false);
    setFontSizeIndex(1);

    localStorage.setItem("contrast", "false");
    localStorage.setItem("fontsize", "1");

    document.body.classList.remove("contrast");
    document.body.style.fontSize = fontSizeArray[1];
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
