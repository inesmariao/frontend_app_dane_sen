"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSurvey, submitResponses } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { LargeStyledButton } from "@/styles/components/StyledButtonVariants";

interface Question {
  id: number;
  text: string;
  order: number;
  instruction: string;
  question_type: "open" | "closed";
  min_value?: number;
  max_value?: number;
  options?: Option[];
}

interface Option {
  id: number;
  text: string;
}

interface Survey {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}

const SurveyContainer = styled.section`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const SurveyHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SurveyTitle = styled.h2`
  font-size: 2rem;
  color: #413087;
`;

const SurveyDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const NumericInput = styled.input`
  width: 25%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  outline: none;

  &:focus {
    border-color: #2d8a88;
    box-shadow: 0 0 5px rgba(45, 138, 136, 0.5);
  }
`;

const QuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  margin: 1rem 0;
  padding: 1.5rem;
`;

const QuestionText = styled.h3`
  font-family: "Poppins", sans-serif;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: bold;
  color: #000;
  display: block;
  margin-bottom: 0.4rem;
`;

const QuestionInstructions = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem !important;
  color: #2d8a88;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: left;
  font-style: italic;
  margin-top: 5px;
`;

const OptionWrapper = styled.div`
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

const OptionLabel = styled.label`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  color: #000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;


const SurveyApp: React.FC = () => {

  const params = useParams();
  const id = params?.id;

  const [survey, setSurvey] = useState<any>(null);
  const [responses, setResponses] = useState<{ [key: number]: number | string }>({});
  const [error, setError] = useState(false);
  const router = useRouter();

  // Redirigir al login si el usuario no está autenticado
  useEffect(() => {
    const loadSurvey = async () => {
      try {
        if (id) {
          const data = await getSurvey(Number(id));
          setSurvey(data);
        }
      } catch (error: any) {
        console.error("Error al cargar la encuesta:", error.message);

        if (error.message.includes("UNAUTHORIZED") || error.response?.status === 401) {
          router.push("/login");
        } else {
          setError(true);
        }
      }
    };

    loadSurvey();
  }, [id]);

  if (error) {
    return <p>Ocurrió un error al cargar la encuesta.</p>;
  }

  if (!survey) {
    return <p>Cargando datos de la encuesta...</p>;
  }

  // Ordenar preguntas por el campo `order`
  const sortedQuestions = survey.questions.sort((a: Question, b: Question) => a.order - b.order);

  // Manejar cambios en las respuestas
  const handleOptionChange = (questionId: number, optionId: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Enviar respuestas al backend
  const handleSubmit = async () => {
    const unansweredQuestions = survey.questions.filter(
      (q: any) => !responses[q.id]
    );

    if (unansweredQuestions.length > 0) {
      alert("Por favor responde todas las preguntas.");
      return;
    }

    try {
      const response = await submitResponses(responses);
      console.log("Respuestas enviadas:", response);
    } catch (error: any) {
      console.error("Error al enviar respuestas:", error.message);
    }
  };

  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyTitle>{survey.name}</SurveyTitle>
        <SurveyDescription>{survey.description}</SurveyDescription>
      </SurveyHeader>
      {sortedQuestions.map((question: Question) => (
        <QuestionCard key={question.id}>
          <QuestionText>{`${question.order} - ${question.text}`}</QuestionText>
          <QuestionInstructions>{question.instruction}</QuestionInstructions>

          {question.question_type === "open" && question.min_value != null && question.max_value != null && (
            <NumericInput
              type="number"
              min={question.min_value}
              max={question.max_value}
              value={responses[question.id] || ""}
              onChange={(e) => handleOptionChange(question.id, Number(e.target.value))}
              placeholder="Ingrese su edad"
            />
          )}

          {question.question_type === "closed" && Array.isArray(question.options) &&
            question.options.map((option: Option) => (
              <OptionWrapper key={option.id}>
                <input
                  type="radio"
                  id={`option-${option.id}`}
                  name={`question-${question.id}`}
                  value={option.id}
                  aria-labelledby={`option-label-${option.id}`}
                  onChange={() => handleOptionChange(question.id, option.id)}
                />
                <OptionLabel id={`option-label-${option.id}`} htmlFor={`option-${option.id}`}>
                  {option.text}
                </OptionLabel>
              </OptionWrapper>))}
        </QuestionCard>
        ))}
      <ButtonContainer>
        <LargeStyledButton onClick={handleSubmit}>Siguiente</LargeStyledButton>
      </ButtonContainer>
    </SurveyContainer>
  );
};

export default SurveyApp;
