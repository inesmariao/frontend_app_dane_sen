import styled from "styled-components";

interface OptionWrapperProps {
  isCheckbox?: boolean;
}

// Contenedor principal de la encuesta
export const SurveyContainer = styled.section`
  width: 70%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
  padding-bottom: 2rem;

  @media (max-width: 768px) {
    width: 95%;
    padding-bottom: 4rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0 1.2rem;
    padding-bottom: 4rem;
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
  font-size: 2rem;
  font-weight: bold;
  color: #413087;
  line-height: 1.2;
  margin: 0.5rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
  text-align: center;

  @media (max-width: 48rem) {
    font-size: 1.3rem;
    margin: 0.5rem;
  }
`;

// Descripción debajo del título
export const SurveyDescriptionName = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 1rem;
  margin-top: 1rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
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
  margin: 0.5rem 0;
  padding: 1rem;
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

export const NumericInputWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  outline: none;
  display: flex;
  justify-content: flex-start;

  input[type="number"] {
    width: 25%;
    padding: 0.8rem;
    font-size: 1.2rem;
    border: 2px solid #2d8a88;
    border-radius: 5px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
    outline: none;
    appearance: textfield;

    -o-appearance: number-input;
    -moz-appearance: number-input;
    -webkit-appearance: number-input;
    appearance: number-input;

    &:focus {
      border-color: #2d8a88;
      box-shadow: 0 0 5px rgba(45, 138, 136, 0.5);
    }
  }

  /* Diseño responsivo */
  @media (max-width: 480px) {
    input[type="number"] {
      width: 80%;
      font-size: 1rem;
      height: 2.8rem;
    }
  }

  @media (max-width: 768px) {
    input[type="number"] {
      width: 50%;
      font-size: 1.1rem;
      height: 2.8rem;
    }

  @media (min-width: 769px) {
    width: 25%;
  }
  }
`;

// Opciones de las preguntas
export const OptionWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isCheckbox",
})<OptionWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 0.5rem;

  ${({ isCheckbox }) =>
    isCheckbox &&
    `
      border-radius: 5px;
    `}

  input {
    min-width: 1.9rem;
    min-height: 1.9rem;
    max-width: 1.9rem;
    max-height: 1.9rem;
    margin-right: 10px;
    border: 2px solid #2d8a88;
    vertical-align: middle;

    /* Asegura que los checkboxes sean cuadrados */
    ${({ isCheckbox }) =>
      isCheckbox
        ? "border-radius: 5px;"
        : "border-radius: 50%;"}

    aspect-ratio: 1 / 1;
    appearance: none;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #2d8a88;
    }

    label {
    display: inline-flex;
    align-items: center;
    font-size: 1.4rem;
    cursor: pointer;
  }

  }

  
`;

// Estilos para la opción "Otro"
export const OtherInputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.5rem;

  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1.2rem;
    border: 2px solid #2d8a88;
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    outline: none;

    &:focus {
      border-color: #2d8a88;
      box-shadow: 0 0 8px rgba(45, 138, 136, 0.5);
    }
  }

  /* Para pantallas pequeñas, ocupa toda la fila */
  &.mobile-full-width {
    @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    input {
      width: 100%;
    }
  }
}
`;

// Opciones de las preguntas tipo matrix con matrix_layout_type = column
export const OptionWrapper_Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 8px;

  input[type="radio"] {
    min-width: 1.9rem;
    min-height: 1.9rem;
    max-width: 1.9rem;
    max-height: 1.9rem;
    margin-right: 10px;
    border: 2px solid #2d8a88;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    appearance: none;
    outline: none;
    cursor: pointer;
    vertical-align: middle;

    &:checked {
      background-color: #2d8a88;
    }
  }

  /* Para pantallas pequeñas */
  @media (max-width: 768px) {
    gap: 12px;
  }
`;


// Etiquetas de las opciones
export const OptionLabel = styled.label`
  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;
  color: #000;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
  vertical-align: middle;

  /* Pantallas medianas */
  @media (max-width: 985px) {
    font-size: 1.1rem;
    margin-top: 0.2rem;
    text-align: left;
  }

  /* Pantallas pequeñas */
  &.matrix-label {
    @media (max-width: 767px) {
      font-size: 0.95rem;
      text-align: center;
    }
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

  /* Solo pantallas pequeñas */
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;


export const TableRow = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: normal;
  display: table-row;

  /* Solo pantallas pequeñas */
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 0;
  }
`;

export const Column = styled.div`
  display: table-cell;
  text-align: left;
  padding: 0.5rem;

  /* Estilos responsivos */
  @media (max-width: 985px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
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
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0.5rem 0;
  flex-wrap: wrap;

   /* Para pantallas medianas y grandes */
   @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    .radio-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }

    .option-container {
      display: flex;
      align-items: center;
      gap: 0.3rem; /* Asegura que cada radio tenga su etiqueta alineada */
    }
  }

  /* Para pantallas pequeñas */
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;

    .radio-options {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      justify-items: center;
      gap: 0.8rem;
    }

    .labels {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      justify-items: center;
      gap: 0.4rem;
    }
  }

  input[type="radio"] {
    min-width: 1.9rem;
    min-height: 1.9rem;
    max-width: 1.9rem;
    max-height: 1.9rem;
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

// Contenedor del bloque de selección geográfica
export const GeoContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

// Título para el select de Departamento - Municipio y País
export const GeoLabel = styled.label`
  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;  // Ajustado para igualar la fuente de las opciones
  font-weight: bold;
  color: #2d8a88;
  margin-bottom: 0.5rem;
  display: block;

  @media (max-width: 985px) {
    font-size: 1.1rem;
  }
`;

// Estilos para los selects
export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #2d8a88;
  border-radius: 5px;
  font-size: 1.4rem;  // Igualando el tamaño de la fuente de las opciones
  font-family: "Poppins", sans-serif;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: #1a6563;
    outline: none;
    box-shadow: 0 0 5px rgba(45, 138, 136, 0.5);
  }

  @media (max-width: 985px) {
    font-size: 1.1rem;
  }
`;

// Estilos para el selector de la Fecha

// Estilos para los selects
export const DateSelectWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const DateStyledSelect = styled.select`
  width: 100%;
  max-width: 120px;
  padding: 0.8rem;
  border: 2px solid #2d8a88;
  border-radius: 8px;
  font-size: 1.4rem;
  font-family: "Poppins", sans-serif;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: #1a6563;
    outline: none;
    box-shadow: 0 0 5px rgba(45, 138, 136, 0.5);
  }

  @media (max-width: 768px) {
    max-width: 100px;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    max-width: 90px;
    font-size: 1rem;
  }
`;
