import styled from "styled-components";
import StyledButton from "./StyledButton";

// Botón variante con dimensiones personalizadas

// Small
export const SmallStyledButton = styled(StyledButton)`
  padding: 0.2rem 0.8rem;
  font-size: 0.7rem;
  width: auto;
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
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  // para el spinner
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

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

export const Spinner = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-left-color: white;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.75s linear infinite;
  vertical-align: middle;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 480px) {
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 0.4rem;
  }
`;

