import styled from "styled-components";

// Contenedor principal de la encuesta
export const SurveyContainer = styled.section`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Encabezado de la encuesta
export const SurveyHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

// Título de la encuesta
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

// Descripción debajo del título
export const SurveyDescriptionName = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;
  color: #000;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  text-align: left;

  @media (max-width: 985px) {
    font-size: 1rem;
  }
`;

// Título de cada capítulo
export const ChapterTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  color: #000;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Estilo de cada pregunta
export const QuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  margin: 1rem 0;
  padding: 1.5rem;
`;

// Texto de las preguntas
export const QuestionText = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
  line-height: 1.6;

  @media (max-width: 985px) {
    font-size: 1.2rem;
    line-height: 1.4;
  }
`;

// Instrucciones para responder
export const QuestionInstructions = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  color: #2d8a88;
  margin-top: 5px;
  font-style: italic;

  @media (max-width: 985px) {
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
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    /* Pantallas medianas */
    width: 90%;
    font-size: 0.9rem;
  }
`;

// Opciones de las preguntas
export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  input[type="radio"] {
    width: 1.6vw;
    height: 1.6vw;
    max-width: 2rem;
    max-height: 2rem;
    min-width: 1.25rem;
    min-height: 1.25rem;
    margin-right: 10px;
    border: 2px solid #2d8a88;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    appearance: none;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #2d8a88;
    }
  }

  input[type="checkbox"] {
  width: 1.6vw;
  height: 1.6vw;
  max-width: 2rem;
  max-height: 2rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  margin-right: 10px;
  border: 2px solid #2d8a88;
  border-radius: 0.2rem;
  aspect-ratio: 1 / 1;
  appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #2d8a88;
  }
}
`;

// Etiquetas de las opciones
export const OptionLabel = styled.label`
  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;
  color: #000;
  line-height: 1.5;
  text-align: left;

  @media (max-width: 985px) {
    font-size: 1.1rem;
    margin-top: 0.2rem;
    text-align: left;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

// Tabla para subpreguntas (matrices)

export const TableHeader = styled.div`
  font-family: "Poppins", sans-serif;
  display: table-row;
  font-weight: bold;
`;
export const Table = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: normal;
  display: table;
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 985px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;


export const TableRow = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: normal;
  display: table-row;

  @media (max-width: 985px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 0;
  }
`;

export const Column = styled.div`
  display: table-cell;
  text-align: center;
  padding: 0.5rem;

  @media (max-width: 985px) {
    display: flex;
    flex-direction: row;
    
    padding: 0;
    gap: 0.5rem;
  }
`;

export const SubQuestionColumn = styled(Column)`
  font-family: "Poppins", sans-serif;
  font-weight: normal;
  display: table-cell;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1.4rem;

  @media (max-width: 985px) {
    font-size: 1.1rem;
    line-height: 1.2;
    margin-bottom: 0;
  }
`;

export const OptionWrapper_Subquestions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;

  @media (max-width: 985px) {
    flex-direction: row;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: flex-start;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    
    @media (max-width: 985px) {
      flex-direction: column;
      gap: 0.2rem;
    }
  }

  input[type="radio"] {
    width: 1.6vw;
    height: 1.6vw;
    max-width: 2rem;
    max-height: 2rem;
    min-width: 1.25rem;
    min-height: 1.25rem;
    border: 2px solid #2d8a88;
    border-radius: 50%;
    appearance: none;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #2d8a88;
    }
  }
`;


