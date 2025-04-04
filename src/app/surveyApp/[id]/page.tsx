"use client";

import React, { useState, memo } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Chapter from "./components/Chapter";
import {
  SurveyContainer,
  SurveyHeader,
  SurveyTitle,
  SurveyDescriptionName,
} from "@/styles/components/StyledSurvey";
import SurveyProgressBar from "@/components/common/SurveyProgressBar";

import {
  handleBirthDateSubmit,
  handleFinalSubmit,
  handleFirstQuestionSubmit,
} from "@/helpers/surveyHelpers";

import { useSurveyData } from "@/hooks/useSurveyData";
import { useSurveyResponses } from "@/hooks/useSurveyResponses";
import { useBirthDate } from "@/hooks/useBirthDate";
import Spinner from "@/components/common/Spinner";


const SurveyApp = memo(() => {
  const router = useRouter();
  const { survey } = useSurveyData();
  const [chapterStep, setChapterStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const {
    responses,
    setResponses,
    currentChapterIndex,
    setCurrentChapterIndex,
    showSecondQuestion,
    setShowSecondQuestion,
    handleOptionChange,
  } = useSurveyResponses(survey?.questions);

  const { birthDate } = useBirthDate(responses);

  if (!survey) return <Spinner />;

  const currentChapter =
    survey.chapters && currentChapterIndex < survey.chapters.length
      ? survey.chapters[currentChapterIndex]
      : null;

  if (!currentChapter) {
    const showChapterError = () => {
      Swal.fire({
        icon: "error",
        title: "Error al cargar el capítulo",
        text: "No se pudo cargar el capítulo. Por favor, recarga la página.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        router.push("/surveys");
      });
    };

    showChapterError();
    return null;
  }

  const handleChapterNext = async () => {
    setIsLoading(true);

    try {
      if (currentChapterIndex === 0) {
        if (showSecondQuestion) {
          await handleBirthDateSubmit(birthDate, survey, responses, setCurrentChapterIndex, router);
        } else {
          await handleFirstQuestionSubmit(survey, responses, setResponses, setShowSecondQuestion, router);
        }
      } else if (currentChapterIndex === 2) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const responseQ12 = responses[12];

        if (chapterStep === 0) {
          setChapterStep(1);
          window.scrollTo({ top: 0 });
          return;
        }

        setCurrentChapterIndex((prev) => prev + 1);
        setChapterStep(0);
        window.scrollTo({ top: 0 });
        return;
      } else {
        if (currentChapterIndex < survey.chapters.length - 1) {
          setCurrentChapterIndex((prev) => prev + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          await handleFinalSubmit(survey, responses, router, currentChapterIndex, chapterStep);
        }
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };



  const handlePrevChapter = () => {
    if (currentChapterIndex > 1) {
      setCurrentChapterIndex((prev) => prev - 1);
      window.scrollTo({ top: 0 });
    }
  };

  const questionsToRender =
    currentChapterIndex === 0
      ? survey.questions.filter((q) =>
        showSecondQuestion ? q.id === 2 : q.id === 1
      )
      : currentChapter.id === 3
        ? survey.questions.filter((q) => {
          if (chapterStep === 0) {
            return q.id === 12; // solo mostrar la Q12
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const responseQ12 = responses[12];
            const noDiscriminacion = Array.isArray(responseQ12) && responseQ12.includes(65);
            return noDiscriminacion
              ? [14, 15].includes(q.id) // solo Q14 y Q15
              : [13, 14, 15].includes(q.id); // Q13, Q14, Q15
          }
        })
        : survey.questions.filter((q) => q.chapter === currentChapter?.id);

  // Verificar si hay una opción seleccionada para la subpregunta 1606
  const isFinalQuestionAnswered =
    currentChapterIndex === survey.chapters.length - 1 &&
    typeof responses[1606] === "number";

  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyTitle>{survey.name}</SurveyTitle>
        <SurveyDescriptionName className="space-y-2">
          <span className="block font-bold">{survey.description_title}</span>
        </SurveyDescriptionName>
        <SurveyDescriptionName className="space-y-2">
          <span>
            <strong>Definición de &quot;discriminación&quot;:</strong>
            {survey.description_name.replace(
              /Definición de\s*["“”]*discriminación["“”]*:\s*/i,
              ""
            )}
          </span>
        </SurveyDescriptionName>
      </SurveyHeader>
      {currentChapter && questionsToRender.length > 0 && (
        <>
          <SurveyProgressBar
            currentChapter={currentChapterIndex + 1}
            totalChapters={survey.chapters.length}
            isFinalQuestionAnswered={isFinalQuestionAnswered}
          />
          <Chapter
            chapter={currentChapter}
            questions={questionsToRender}
            responses={responses}
            handleOptionChange={handleOptionChange}
            handleNextChapter={handleChapterNext}
            handlePrevChapter={handlePrevChapter}
            isFirstChapter={currentChapterIndex === 0}
            isLastChapter={currentChapterIndex === survey.chapters.length - 1}
            chapterIndex={currentChapterIndex}
            isLoading={isLoading}
          />
        </>
      )}
    </SurveyContainer>
  );
});

SurveyApp.displayName = "SurveyApp";
export default SurveyApp;