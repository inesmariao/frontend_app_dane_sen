"use client";

import React from "react";
import ChapterQuestions from "./ChapterQuestions";
import { ChapterProps } from "@/types";
import { ChapterTitle, ButtonContainer } from "@/styles/components/StyledSurvey";
import { LargeStyledButton, Spinner } from "@/styles/components/StyledButtonVariants";

const Chapter: React.FC<ChapterProps> = ({
  chapter,
  questions,
  responses,
  handleOptionChange,
  handleNextChapter,
  handlePrevChapter,
  isLastChapter,
  chapterIndex,
  isLoading,
}) => {

  return (
    <>
      <ChapterTitle>{chapter?.name}</ChapterTitle>

      {/* Renderizar las preguntas del capítulo */}
      <ChapterQuestions
        questions={questions}
        responses={responses}
        handleOptionChange={handleOptionChange}
      />

      {/* Botones de navegación entre capítulos */}
      <ButtonContainer>
        {chapterIndex > 1 && (
          <LargeStyledButton onClick={handlePrevChapter} style={{ marginRight: "1rem" }}>
            ← Retroceder
          </LargeStyledButton>
        )}

      <LargeStyledButton onClick={handleNextChapter} disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner />
            Cargando...
          </>
        ) : (
          isLastChapter ? "Enviar y Finalizar" : "Siguiente →"
        )}
      </LargeStyledButton>
      </ButtonContainer>
    </>
  );
};

export default Chapter;
