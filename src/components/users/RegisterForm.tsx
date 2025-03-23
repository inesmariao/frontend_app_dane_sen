"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/api";
import StyledButton from "@/styles/components/StyledButton";

const RegisterFormContainer = styled.div`
  max-width: 25rem;
  margin: 0.625rem 1rem;
  padding: 0.7rem 1.25rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;

  /* Ajuste para pantallas medianas y grandes */
  @media (min-width: 769px) and (max-width: 1023px) {
    margin: 0 auto; /* Espacio más equilibrado */
    max-width: 22rem; /* Reduce ligeramente el ancho */
    padding: 1rem; /* Aumenta un poco el padding */
  }

  /* Ajuste adicional para pantallas grandes */
  @media (min-width: 1024px) {
      margin: 1rem auto; /* Mayor separación en pantallas grandes */
      max-width: 26rem; /* Reduce el ancho para pantallas grandes */
    }
`;

const Instructions = styled.p`
  margin: 0 0 1.25rem;
  font-size: 1rem;
  color: #413087;
  text-align: center;

  @media (max-width: 48rem) {
    margin: 0.3rem 0 0.9375rem;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 0.9375rem;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 0.625rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  background-color: #ffffff;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  appearance: none;

  &:invalid {
    box-shadow: none;
  }

  &:focus {
    border-color: #51d0cd;
    outline: none;
  }

  &::after {
    content: "▼";
    position: absolute;
    right: 0.9375rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.75rem;
    color: #413087;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  width: 100%;
  background-color: #ffffff;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 1000;

  @media (max-width: 768px) {
    background-color: #f5f5f5;
  }
`;

const DropdownMenuItem = styled.li`
  padding: 0.625rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;

  &:hover {
    background-color: #51d0cd;
    color: #000000;
  }

  @media (max-width: 768px) {
    background-color: #d3f5f4;
    color: #000000;
    border-bottom: 1px solid #56bfbd;

    &:hover {
      background-color: #56bfbd;
      color: #ffffff;
    }
    &:active {
      background-color: #56bfbd;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

const LoginLink = styled.p`
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

const StyledInput = styled.input`
  width: 100%;
  padding: 0.625rem;
  margin-bottom: 0.9375rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.875rem;
  font-weight: bold;
`;

const RegisterForm: React.FC = () => {

  const [selectedIdentifier, setSelectedIdentifier] = useState("Correo electrónico");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    name: "",
    last_name: "",
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedIdentifier(option);
    setIsDropdownOpen(false);
    setFormData({ ...formData, identifier: "" });
  };

  const options = [
    { label: "Correo electrónico", value: "email" },
    { label: "Usuario", value: "username" },
    { label: "Número de celular", value: "phone_number" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setSuccessMessage(null);

    if (!formData.identifier) {
      setErrors("Por favor selecciona un identificador y completa el campo correspondiente.");
      return;
    }

    try {
      await registerUser(formData);
      setSuccessMessage("Usuario registrado exitosamente. Redirigiendo...");

      setTimeout(() => {
        router.push("/login");
      }, 2000); // Espera de 2 segundos para mostrar el mensaje
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors(err.message);
      } else {
        setErrors("Error al registrar usuario.");
      }
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <RegisterFormContainer>
      <Instructions>Seleccione su identificador para el registro:</Instructions>
      <form onSubmit={handleSubmit}>
        <DropdownContainer ref={dropdownRef}>
          <DropdownButton onClick={toggleDropdown}>
            {selectedIdentifier}
          </DropdownButton>
          {isDropdownOpen && (
            <DropdownMenu>
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleOptionSelect(option.label)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          )}
        </DropdownContainer>
        {selectedIdentifier === "Correo electrónico" && (
          <StyledInput
            type="email"
            name="identifier"
            placeholder="Escriba su correo electrónico"
            value={formData.identifier}
            onChange={handleInputChange}
          />
        )}
        {selectedIdentifier === "Usuario" && (
          <StyledInput
            type="text"
            name="identifier"
            placeholder="Escriba su usuario (una palabra)"
            value={formData.identifier}
            onChange={handleInputChange}
          />
        )}
        {selectedIdentifier === "Número de celular" && (
          <StyledInput
            type="tel"
            name="identifier"
            placeholder="Escriba su número de celular"
            value={formData.identifier}
            onChange={handleInputChange}
          />
        )}
        <StyledInput
          type="text"
          name="name"
          placeholder="Nombres (opcional)"
          value={formData.name}
          onChange={handleInputChange}
          autoComplete="given-name"
        />
        <StyledInput
          type="text"
          name="last_name"
          placeholder="Apellidos (opcional)"
          value={formData.last_name}
          onChange={handleInputChange}
          autoComplete="family-name"
        />
        <StyledInput
          type="password"
          name="password"
          placeholder="Contraseña (obligatoria)"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        {errors && <ErrorMessage>{errors}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <StyledButton type="submit">Registrarse</StyledButton>
      </form>
      <LoginLink>
        ¿Ya tienes una cuenta?{" "}
        <a onClick={handleLoginRedirect} role="button" tabIndex={0}>
          Inicie sesión aquí
        </a>
      </LoginLink>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
