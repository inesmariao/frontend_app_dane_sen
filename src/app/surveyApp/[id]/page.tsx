"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSurvey, submitResponses } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';

const SurveyContainer = styled.section`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const QuestionWrapper = styled.div`
  margin-bottom: 2rem;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  .option {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    input {
      margin-right: 0.5rem;
    }
  }
`;

const StyledButton = styled.button`
  background-color: #51d0cd;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #418a89;
  }
`;

const SurveyApp: React.FC = () => {
  
  const params = useParams();
  const id = params?.id;

  console.log("Parámetros de la ruta (useParams):", params); // Debugging
  console.log("ID recibido:", id); // Debugging

  const { authData } = useAuth();
  const router = useRouter();
  const [survey, setSurvey] = useState<any>(null);
  const [responses, setResponses] = useState<{ [key: number]: number | string }>({});

  // Redirigir al login si el usuario no está autenticado
  useEffect(() => {
    const loadSurvey = async () => {
      try {
        if (id) {
          console.log("ID encontrado:", id); // Debugging
          console.log(`Fetching survey with ID: ${id}`); // Debugging
          const data = await getSurvey(Number(id));
          console.log("Survey data:", data); // Debugging
          setSurvey(data);
        }
      } catch (error: any) {
        console.error("Error al cargar la encuesta:", error.message);
      }
    };
    loadSurvey();
  }, [id]);

  if (!survey) {
    return <p>Cargando datos de la encuesta...</p>;
  }
  
  if (survey.questions && survey.questions.length === 0) {
    return <p>No hay preguntas en esta encuesta.</p>;
  }

  // Manejar cambios en las respuestas
  const handleOptionChange = (questionId: number, optionId: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Enviar respuestas al backend
  const handleSubmit = async () => {
    try {
      const response = await submitResponses(responses);
      console.log("Respuestas enviadas:", response);
    } catch (error: any) {
      console.error("Error al enviar respuestas:", error.message);
    }
  };

  if (!survey || !survey.questions) {
    return <p>No se encontraron datos para esta encuesta.</p>;
  }

  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyTitle>{survey.name}</SurveyTitle>
        <SurveyDescription>{survey.description}</SurveyDescription>
      </SurveyHeader>
      {survey.questions.map((question: any) => (
        <QuestionWrapper key={question.id}>
          <label htmlFor={`question-${question.id}`}>{question.text}</label>
          {question.options.map((option: any) => (
            <div className="option" key={option.id}>
              <input
                type="radio"
                id={`option-${option.id}`}
                name={`question-${question.id}`}
                value={option.id}
                onChange={() => handleOptionChange(question.id, option.id)}
              />
              <label htmlFor={`option-${option.id}`}>{option.text}</label>
            </div>
          ))}
        </QuestionWrapper>
      ))}
      <StyledButton onClick={handleSubmit}>Enviar respuestas</StyledButton>
    </SurveyContainer>
  );
};

export default SurveyApp;
