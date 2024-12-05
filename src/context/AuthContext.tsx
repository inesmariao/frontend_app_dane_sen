import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/api";

interface AuthContextType {
  authData: { token: string | null; user: any } | null;
  setAuthData: (data: { token: string; user: any }) => void;
  logout: () => void;
  login: (credentials: { identifier: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authData, setAuthDataState] = useState<{ token: string | null; user: any } | null>(
    null
  );
  const router = useRouter(); // Hook de redirección

  useEffect(() => {
    // Cargar datos de autenticación desde localStorage al iniciar
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
  
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user); // Intenta analizar solo si el valor existe
        setAuthDataState({ token, user: parsedUser });
      } catch (error) {
        console.error("Error al analizar el usuario desde localStorage. Se limpiará el estado:", error);
        localStorage.removeItem("authToken"); // Limpia localStorage si está corrupto
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const setAuthData = (data: { token: string; user: any }) => {
    if (!data.token || !data.user) {
      console.error("Intento de guardar datos inválidos en localStorage");
      return;
    }
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authUser", JSON.stringify(data.user));
    setAuthDataState(data);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setAuthDataState(null);
    router.push("/login"); // Redirigir al login al cerrar sesión
  };

  const login = async (credentials: { identifier: string; password: string }) => {
    try {
      const { token, user } = await loginUser(credentials);
  
      // Guardar los datos de autenticación
      setAuthData({ token, user });
  
      // Redirigir al usuario después del login
      router.push("/surveys");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      throw error; // Devolver el error para manejarlo en el componente
    }
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El hook useAuth debe ser utilizado dentro de un AuthProvider.");
  }
  return context;
};