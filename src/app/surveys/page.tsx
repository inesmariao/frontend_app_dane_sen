"use client";

import styled from "styled-components";
import Image from "next/image";

const SurveysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem;
  margin: 0;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  width: 30%;
  max-width: 488px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Asegura la separación entre imagen y contenido */
  align-items: center;
  padding: 0;

  @media (max-width: 768px) {
    width: 90%;
    aspect-ratio: auto;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  flex-grow: 1; /* Para ocupar el espacio disponible si es necesario */

  @media (max-width: 768px) {
    gap: 0.8rem;
    padding: 0.8rem;
  }
`;

const SurveyImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const SurveyTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0.5rem 0;

  @media (min-width: 1024px) {
    font-size: 1.7rem;
  }
`;

const SurveyDescription = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  color: #444;
  text-align: center;
  flex-grow: 1;
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
    background-color: #cbe9e7;
    color: #267c74;
  }

  &.closed {
    background-color: rgba(224, 224, 224, 0.8);
    color: #555;
  }

  @media (max-width: 768px) {
    width: 50%;
    font-size: 0.75rem;
  }
`;

const Button = styled.button`
  background-color: #5aaba7;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 1rem;
  text-align: center;
  width: 160px;
  max-width: 100%;
  transition: background-color 0.3s ease;


  &:hover {
    background-color: #468d8a;
  }

  &:disabled {
    background-color: #c2c2c2;
    color: #555; 
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

export default function Surveys() {
  return (
    <SurveysWrapper>
      <Title>Temas</Title>
      <CardsContainer>
        {/* Card 1 */}
        <Card>
          <SurveyImage
            src="/assets/images/tokyo-people-traveling-street.png"
            alt="Encuesta de discriminación"
            width={300}
            height={200}
          />
            <StatusLabel className="open">ABIERTA</StatusLabel>
          <CardContent>
            <SurveyTitle>Encuesta I - Discriminación</SurveyTitle>
            <SurveyDescription>
              Preguntas para la recolección de información relevante sobre las experiencias de discriminación en personas mayores.
            </SurveyDescription>
            <Button>Iniciar</Button>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <SurveyImage
            src="/assets/images/tokyo-people-traveling-street.png"
            alt="Encuesta II - Servicios Públicos"
            width={300}
            height={200}
          />
          <StatusLabel className="closed">CERRADA</StatusLabel>
          <CardContent>
            <SurveyTitle>Encuesta II - Servicios Públicos</SurveyTitle>
            <SurveyDescription>
              Preguntas relacionadas con la percepción del acceso y prestación de servicios.
            </SurveyDescription>
            <Button disabled>Próximamente</Button>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card>
          <SurveyImage
            src="/assets/images/tokyo-people-traveling-street.png"
            alt="Encuesta III - Gestión del Agua"
            width={300}
            height={200}
          />
          <StatusLabel className="closed">CERRADA</StatusLabel>
          <CardContent>
            <SurveyTitle>Encuesta III - Gestión del Agua</SurveyTitle>
            <SurveyDescription>
              Preguntas sobre gestiones y prácticas de los ciudadanos alrededor del agua.
            </SurveyDescription>
            <Button disabled>Próximamente</Button>
          </CardContent>
        </Card>
      </CardsContainer>
    </SurveysWrapper>
  );
}