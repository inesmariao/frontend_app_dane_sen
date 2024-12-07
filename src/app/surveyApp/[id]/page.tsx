"use client";

import React, { useState, useEffect } from "react";

import { getSurvey, submitResponses } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { LargeStyledButton } from "@/styles/components/StyledButtonVariants";
import { Survey, Chapter, Question, Option } from "@/types";
import {
  SurveyContainer,
  SurveyHeader,
  SurveyTitle,
  SurveyDescriptionName,
  ButtonContainer
} from "@/styles/components/StyledSurvey";
import ChapterOne from "@/app/surveyApp/[id]/components/ChapterOne";
import ChapterTwo from "@/app/surveyApp/[id]/components/ChapterTwo";
import ChapterThree from "@/app/surveyApp/[id]/components/ChapterThree";

interface ChapterProps {
  questions: Question[];
  responses: { [key: number]: number | string };
  handleOptionChange: (questionId: number, value: number | string) => void;
  chapterName: string;
}


const SurveyApp: React.FC = () => {

  const params = useParams();
  const id = params?.id;

  const [survey, setSurvey] = useState<any>(null);
  const [responses, setResponses] = useState<{ [key: number]: number | string }>({});
  const [error, setError] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
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

  const handleOptionChange = (questionId: number, value: number | string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextChapter = () => {
    if (currentChapter < 3) {
      setCurrentChapter((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const unansweredQuestions = survey.questions.filter((q: Question) => !responses[q.id]);
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

  const chapterOneQuestions = survey.questions.filter(
    (q: Question) => q.chapter === 1
  );
  const chapterTwoQuestions = survey.questions.filter(
    (q: Question) => q.chapter === 1
  );
  const chapterThreeQuestions = survey.questions.filter(
    (q: Question) => q.chapter === 1
  );


  const chapterWithIdOne = (survey.chapters as Chapter[]).find(
    (chapter) => chapter.id === 1
  );
  const chapterWithIdTwo = (survey.chapters as Chapter[]).find(
    (chapter) => chapter.id === 2
  );
  const chapterWithIdThree = (survey.chapters as Chapter[]).find(
    (chapter) => chapter.id === 3
  );

  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyTitle>{survey.name}</SurveyTitle>
        <SurveyDescriptionName>{survey.description_name}</SurveyDescriptionName>
      </SurveyHeader>

      {currentChapter === 1 && (
        <ChapterOne
          questions={chapterOneQuestions}
          responses={responses}
          handleOptionChange={handleOptionChange}
          chapterName={chapterWithIdOne?.name|| "Capítulo 1"}
        />
      )}
      {currentChapter === 2 && (
        <ChapterTwo
          questions={chapterTwoQuestions}
          responses={responses}
          handleOptionChange={handleOptionChange}
          chapterName={chapterWithIdTwo?.name || "Capítulo 2"}
        />
      )}
      {currentChapter === 3 && (
        <ChapterThree
          questions={chapterThreeQuestions}
          responses={responses}
          handleOptionChange={handleOptionChange}
          chapterName={chapterWithIdThree?.name || "Capítulo 3"}
        />
      )}

      <ButtonContainer>
        <LargeStyledButton onClick={handleNextChapter}>
          {currentChapter < 3 ? "Siguiente" : "Enviar y Finalizar"}
        </LargeStyledButton>
      </ButtonContainer>
    </SurveyContainer>
  );
};

export default SurveyApp;
