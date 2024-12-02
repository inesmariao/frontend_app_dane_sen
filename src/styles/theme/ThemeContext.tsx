"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define los temas disponibles
type ThemeType = "light" | "dark";

// Estructura del contexto
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

// Crear el contexto con un valor por defecto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Proveedor del contexto
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Carga el tema desde localStorage si está disponible
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as ThemeType) || "light";
    }
    return "light";
  });

  // Alterna entre los temas
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Guarda en localStorage
      return newTheme;
    });
  };

  // Actualiza el atributo en el DOM para el tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
};
