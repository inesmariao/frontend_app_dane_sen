"use client";

import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "@/styles/components/StyledButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import FormSpinner from "@/components/common/FormSpinner";

const LoginFormContainer = styled.div`
  max-width: 25rem;
  margin: 1rem auto;
  padding: 0.7rem 1.25rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 48rem) {
    margin: 1.5rem auto;
    padding: 0.9375rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: bold;
  color: #413087;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.625rem;
  margin-bottom: 1.25rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  font-weight: bold;
`;

const RegisterLink = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;

  a {
    color: #51d0cd;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonWithSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await auth?.login(formData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToRegister = () => {
    router.push("/register");
  };

  return (
    <LoginFormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="identifier">Identificador:</Label>
          <StyledInput
            id="identifier"
            type="text"
            name="identifier"
            placeholder="Correo electrónico, usuario o celular"
            value={formData.identifier}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Contraseña:</Label>
          <StyledInput
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithSpinnerWrapper>
          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? "Iniciando..." : "Iniciar Sesión"}
          </StyledButton>
          {isLoading && <FormSpinner withText={false}/>}
        </ButtonWithSpinnerWrapper>
      </form>
      <RegisterLink>
        ¿No tiene una cuenta?{" "}
        <a onClick={handleGoToRegister} role="button" tabIndex={0}>
          Regístrese aquí
        </a>
      </RegisterLink>
    </LoginFormContainer>
  );
};

export default LoginForm;
