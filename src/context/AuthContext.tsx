import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/api";
import { AuthContextType, User } from "@/types";
import { handleError } from "@/utils/errorHandling";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authData, setAuthDataState] = useState<{ token: string | null; user: User } | null>(
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
      if (error instanceof Error) {
        handleError(error.message);
      } else if (typeof error === 'string') {
        handleError(error);
      } else {
        handleError("Error desconocido.");
      }
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      router.push("/login");
    }

    const handleLogout = () => {
      handleError("Evento de cierre de sesión recibido. Redirigiendo...", "warn");
      router.push("/login");
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, [router]);

  const setAuthData = (data: { token: string; user: User }) => {
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
      const response = await loginUser(credentials);
  
      if (response) { // Verificar si la respuesta no es undefined
        const { token, user } = response;
  
        // Guardar los datos de autenticación
        setAuthData({ token, user });
  
        // Redirigir al usuario después del login
        router.push("/surveys");
      } else {
        // Manejar el caso en que loginUser devuelve undefined (sesión expirada)
        handleError("Sesión expirada. Redirigiendo al login.");
        router.push("/login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error.message);
      } else {
        handleError("Error desconocido al iniciar sesión.");
      }
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
    handleError("El hook useAuth debe ser utilizado dentro de un AuthProvider.");
  }
  return context;
};