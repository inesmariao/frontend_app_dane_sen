"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StyledButton from "@/styles/components/StyledButton";

const SurveysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  margin: 0;

  @media (max-width: 48rem) {
    padding: 1rem;
    gap: 0.5rem;
  }

  @media (min-width: 49rem) and (max-width: 64rem) {
    gap: 0.5rem;
  }
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #000;
  margin: 0;
  padding: 0;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(77, 74, 74, 0.5);

  @media (max-width: 48rem) {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    font-size: 1.5rem;
    text-align: left;
    margin-left: 1rem;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 48rem) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    justify-content: center;
    align-content: space-between;
  }

  @media (min-width: 1024px) {
    justify-content: space-between;
  }
`;

const Card = styled.div`
  flex: 1;
  max-width: 28rem;
  aspect-ratio: 1 / 1.3;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.12);
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin-bottom: 1rem;

  @media (max-width: 48rem) {
    flex: 1 1 90%;
    aspect-ratio: auto;
  }

  /* Entre 769px y 1023px */
  @media (min-width: 769px) and (max-width: 1023px) {
    max-height: 30rem;
  }

  /* Desde 1024px: Una sola fila */
  @media (min-width: 1024px) {
    flex: 1;
    max-height: 22rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  flex-grow: 1;

  @media (max-width: 48rem) {
    padding: 0.5rem;
  }
`;

const SurveyImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const SurveyTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0.3rem 0;

  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const SurveyDescription = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  color: #444;
  text-align: center;
  flex-grow: 1;
  margin: 0.4rem 0.8rem;
  padding: 0;
  max-width: 17rem;
  max-height: 8rem;
  line-height: 1.2rem;

  @media (max-width: 768px) {
    margin: 0.1rem 0;
    font-size: 0.7rem;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    margin: 0.1rem 0;
    font-size: 0.85rem;
  }

  @media (min-width: 1024px) {
    font-size: 0.85rem;
    max-height: 8rem;
  }
`;

const StatusLabel = styled.div`
  width: 8.375rem;
  height: auto;
  margin: 0 auto;
  border-radius: 0 0 0.5rem 0.5rem;
  text-align: center;
  padding: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 0.7rem;

  &.open {
    background-color: #cbe9e7;
    color: #267c74;
  }

  &.closed {
    background-color: rgba(224, 224, 224, 0.8);
    color: #555;
  }

  @media (max-width: 48rem) {
    font-size: 0.7rem;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.7rem;
  }
`;

const StyledButtonWrapper = styled.div`
  margin-top: 0;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: 769px) and (max-width: 1023px) {
    margin-top: 0.3rem;
}
`;

export default function Surveys() {

  const router = useRouter(); 

  const handleStartSurvey = (surveyId: number) => {
    router.push(`/surveyApp/${surveyId}`);
  };

  return (
    <SurveysWrapper>
      <Title>Temas</Title>
      <CardsContainer>
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
              Preguntas para la recolección de información relevante sobre las
              experiencias de discriminación en personas mayores de edad.
            </SurveyDescription>
            <StyledButtonWrapper>
            <StyledButton onClick={() => handleStartSurvey(1)}>Iniciar</StyledButton>
            </StyledButtonWrapper>
          </CardContent>
        </Card>
        <Card>
          <SurveyImage
            src="/assets/images/tokyo-people-traveling-street.png"
            alt="Encuesta II - Servicios Públicos"
            width={300}
            height={200}
          />
          <StatusLabel className="closed">CERRADA</StatusLabel>
          <CardContent>
            <SurveyTitle>Encuesta II - Violencia de Género</SurveyTitle>
            <SurveyDescription>
              Preguntas relacionadas con la violencia de género.
            </SurveyDescription>
            <StyledButtonWrapper>
              <StyledButton disabled>Próximamente</StyledButton>
            </StyledButtonWrapper>
          </CardContent>
        </Card>
        <Card>
          <SurveyImage
            src="/assets/images/tokyo-people-traveling-street.png"
            alt="Encuesta III - Gestión del Agua"
            width={300}
            height={200}
          />
          <StatusLabel className="closed">CERRADA</StatusLabel>
          <CardContent>
            <SurveyTitle>Encuesta III - Acceso y Prestación de Servicios</SurveyTitle>
            <SurveyDescription>
              Preguntas sobre el acceso y prestación de servicios de salud, educación, notariado y registro.
            </SurveyDescription>
            <StyledButtonWrapper>
              <StyledButton disabled>Próximamente</StyledButton>
            </StyledButtonWrapper>
          </CardContent>
        </Card>
      </CardsContainer>
    </SurveysWrapper>
  );
}
