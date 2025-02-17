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
  const router = useRouter();

  useEffect(() => {
    // Cargar datos de autenticación desde localStorage al iniciar
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
  
    if (!token || !user) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      setAuthDataState({ token, user: parsedUser });
    } catch (error) {
      console.error("Error en localStorage. Redirigiendo al login...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      router.push("/login");
    }

    const handleLogout = () => {
      console.warn("Evento de cierre de sesión recibido. Redirigiendo...");
      router.push("/login");
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  const setAuthData = (data: { token: string; user: any }) => {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authUser", JSON.stringify(data.user));
    setAuthDataState(data);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setAuthDataState(null);
    router.push("/login");
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