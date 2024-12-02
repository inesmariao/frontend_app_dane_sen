"use client";

import React from "react";
import styled from "styled-components";

const SurveyContainer = styled.section`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Survey: React.FC = () => (
  <SurveyContainer aria-labelledby="survey-title">
    <h2 id="survey-title">Encuesta de Discriminación</h2>
    <p>Responde las preguntas relacionadas con discriminación.</p>
    {/* Contenido dinámico aquí */}
  </SurveyContainer>
);
