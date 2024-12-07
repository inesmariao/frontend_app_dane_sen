import styled from "styled-components";

export const SurveyContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const SurveyHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const SurveyTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #413087;
  line-height: 1.2;
  margin: 1rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
  text-align: center;

  @media (max-width: 48rem) {
    font-size: 1.5rem;
    margin: 1.25rem 1rem;
  }
`;

export const SurveyDescriptionName = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  color: #000;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  text-align: left;
`;

export const ChapterTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  color: #000;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(77, 74, 74, 0.5);

  @media (max-width: 768px) {
    /* Pantallas medianas */
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    /* Pantallas pequeñas */
    font-size: 1rem;
  }
`;

export const NumericInput = styled.input`
  width: 25%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #2d8a88;
  border-radius: 5px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  outline: none;

  &:focus {
    border-color: #2d8a88;
    box-shadow: 0 0 5px rgba(45, 138, 136, 0.5);
  }

  @media (max-width: 480px) {
    /* Pantallas pequeñas */
    width: 90%;
    font-size: 0.8rem; /* Texto más pequeño para pantallas muy pequeñas */
  }

  @media (max-width: 768px) {
    /* Pantallas medianas */
    width: 90%;
    font-size: 0.9rem; /* Ajuste del texto */
  }
`;

export const QuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  margin: 1rem 0;
  padding: 1.5rem;
`;

export const QuestionText = styled.h3`
  font-family: "Poppins", sans-serif;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: bold;
  color: #000;
  display: block;
  margin-bottom: 0.4rem;
`;

export const QuestionInstructions = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem !important;
  color: #2d8a88;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: left;
  font-style: italic;
  margin-top: 5px;
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input[type="radio"] {
    width: 2vw; /* Tamaño relativo al ancho de la ventana */
    height: 2vw; /* Igual al ancho para mantenerlo circular */
    max-width: 2.5rem; /* Tamaño máximo (equivale a ~40px si 1rem = 16px) */
    max-height: 2.5rem;
    min-width: 1.25rem; /* Tamaño mínimo (equivale a ~20px) */
    min-height: 1.25rem;
    margin-right: 10px;
    border: 2px solid #2d8a88;
    border-radius: 50%; /* Circular */
    aspect-ratio: 1 / 1; /* Mantener la proporción 1:1 */
    appearance: none;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #2d8a88;
    }

    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  label {
    font-family: "Poppins", sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5;
    color: #000000;
  }
`;

export const OptionLabel = styled.label`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  color: #000;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;