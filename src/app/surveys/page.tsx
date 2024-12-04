"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const FullHeightContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SurveysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #000;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const Card = styled.div`
  width: 30%;
  max-width: 488px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;
    aspect-ratio: auto;
  }
`;

const SurveyImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Label = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  color: #46beb9;
  margin-top: 1rem;
`;

const SurveyTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
  text-align: center;
  margin: 0.5rem 0;

  @media (min-width: 1024px) {
    font-size: 1.7rem;
  }
`;

const SurveyDescription = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  padding: 0 1rem;

  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
`;

const StatusLabel = styled.div`
  width: 30%;
  height: auto;
  margin: 0 auto;
  border-radius: 0 0 8px 8px;
  text-align: center;
  padding: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;

  &.open {
    background-color: #edf9f9;
    color: #2f9d94;
  }

  &.closed {
    background-color: rgba(224, 224, 224, 0.8);
    color: #6d6d6d;
  }

  @media (max-width: 768px) {
    width: 50%;
    font-size: 0.75rem;
  }
`;

const Button = styled.button`
  background-color: #6fc0bd;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin: auto 0 0;
  text-align: center;
  width: 160px;
  max-width: 100%;
  transition: background-color 0.3s ease;


  &:hover {
    background-color: #3aa29e;
  }

  &:disabled {
    background-color: #d9d9d9;
    color: #6d6d6d; 
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: auto;
  }
`;

export default function SurveysPage() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <FullHeightContainer>
      <main role="main">
      <SurveysWrapper>
        <Title>Temas</Title>
        <CardsContainer>
          {/* Card 1 */}
          <Card>
            <SurveyImage
              src="/images/tokyo-people-traveling-street.png"
              alt="Encuesta de discriminación"
              width={300}
              height={200}
            />
            <StatusLabel className="open">ABIERTA</StatusLabel>
            <SurveyTitle>Encuesta I - Discriminación</SurveyTitle>
            <SurveyDescription>
              Preguntas para la recolección de información relevante sobre las
              experiencias de discriminación en personas mayores.
            </SurveyDescription>
            <Button>Iniciar</Button>
          </Card>

          {/* Card 2 */}
          <Card>
            <SurveyImage
              src="/images/tokyo-people-traveling-street.png"
              alt="Encuesta II - Servicios Públicos"
              width={300}
              height={200}
            />
            <StatusLabel className="closed">CERRADA</StatusLabel>
            <SurveyTitle>Encuesta II - Servicios Públicos</SurveyTitle>
            <SurveyDescription>
              Preguntas relacionadas con la percepción del acceso y prestación de
              servicios.
            </SurveyDescription>
            <Button disabled>Próximamente</Button>
          </Card>

          {/* Card 3 */}
          <Card>
            <SurveyImage
              src="/images/tokyo-people-traveling-street.png"
              alt="Encuesta III - Gestión del Agua"
              width={300}
              height={200}
            />
            <StatusLabel className="closed">CERRADA</StatusLabel>
            <SurveyTitle>Encuesta III - Gestión del Agua</SurveyTitle>
            <SurveyDescription>
              Preguntas sobre gestiones y prácticas de los ciudadanos alrededor
              del agua.
            </SurveyDescription>
            <Button disabled>Próximamente</Button>
          </Card>
        </CardsContainer>
      </SurveysWrapper>
      </main>
    </FullHeightContainer>
  );
}
