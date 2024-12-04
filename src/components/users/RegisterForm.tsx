"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { registerUser } from "@/utils/api";

const RegisterFormContainer = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding: 1.25rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 48rem) {
    margin: 0.625rem 0.9375rem 1.25rem 0.9375rem;
    padding: 0.9375rem;
  }
`;

const Instructions = styled.p`
  margin: 0.625rem 0 1.25rem;
  font-size: 1rem;
  color: #413087;
  text-align: center;

  @media (max-width: 48rem) {
    margin: 0.3125rem 0 0.9375rem;
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
    border-color: #2d8a88;
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

  &:hover {
    background-color: #56bfbd;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    background-color: #56bfbd;
    color: #ffffff;
    &:hover {
      background-color: #56bfbd;
      color: #ffffff;
    }
    &:active {
      background-color: #56bfbd;

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

const StyledButton = styled.button`
  background-color: #2d8a88;
  color: #ffffff;
  border: none;
  border-radius: 1.5625rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #56bfbd;
    color: #000;
  }

  &:focus,
  &:active {
    background-color: #88e2e0;
    outline: 0.125rem solid #ffffff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.875rem;
`;

const RegisterForm: React.FC = () => {

  const [selectedIdentifier, setSelectedIdentifier] = useState("Correo electrónico");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      const result = await registerUser(formData);
      setSuccessMessage("Usuario registrado exitosamente.");
      setFormData({
        identifier: "",
        password: "",
        name: "",
        last_name: "",
      });
    } catch (error: any) {
      setErrors(error.error || "Error al registrar el usuario.");
    }
  };

  return (
    <RegisterFormContainer>
      <Instructions>Selecciona tu identificador para el registro:</Instructions>
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
            placeholder="Escribe tu correo electrónico"
            value={formData.identifier}
            onChange={handleInputChange}
          />
        )}
        {selectedIdentifier === "Usuario" && (
          <StyledInput
            type="text"
            name="identifier"
            placeholder="Escribe tu usuario (una palabra)"
            value={formData.identifier}
            onChange={handleInputChange}
          />
        )}
        {selectedIdentifier === "Número de celular" && (
          <StyledInput
            type="tel"
            name="identifier"
            placeholder="Escribe tu número de celular"
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
    </RegisterFormContainer>
  );
};

export default RegisterForm;
