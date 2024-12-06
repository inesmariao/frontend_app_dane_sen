// src/styles/components/StyledButtonVariants.ts
import styled from "styled-components";
import StyledButton from "./StyledButton"; // Asegúrate de usar la ruta correcta

// Botón variante con dimensiones personalizadas

// Small
export const SmallStyledButton = styled(StyledButton)`
  padding: 0.2rem 0.8rem;
  font-size: 0.7rem;
  width: auto; // Ajusta según tu necesidad
  border-radius: 10px;
  background-color: #4a90e2;

  &:hover {
    background-color: #367bc2;
  }
`;

// Large
export const LargeStyledButton = styled(StyledButton)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  width: 15rem;
  border-radius: 20px;
  background-color: #2d8a88;
  

  &:hover {
    background-color: #1f5e5e;
  }

  @media (max-width: 768px) {
    /* Ajuste para pantallas pequeñas */
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    width: 12rem;
  }

  @media (max-width: 480px) {
    /* Ajuste para pantallas extra pequeñas */
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    width: 10rem;
  }
`;
