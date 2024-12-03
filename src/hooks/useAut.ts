import { useState } from "react";

interface Credentials {
  username: string;
  password: string;
}

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = (credentials: Credentials) => {
    // Aquí iría la lógica para verificar credenciales
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
};

export default useAuth;
