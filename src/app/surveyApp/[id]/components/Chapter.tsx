"use client";

import React from "react";
import ChapterQuestions from "./ChapterQuestions";
import { ChapterProps } from "@/types";
import { ChapterTitle, ButtonContainer } from "@/styles/components/StyledSurvey";
import { LargeStyledButton } from "@/styles/components/StyledButtonVariants";

const Chapter: React.FC<ChapterProps> = ({
  chapter,
  questions,
  responses,
  handleOptionChange,
  handleNextChapter,
  handlePrevChapter,
  isLastChapter,
  isFirstChapter,
}) => {

  return (
    <>
      <ChapterTitle>{chapter?.name}</ChapterTitle>

      {/* Renderizar las preguntas del capítulo */}
      <ChapterQuestions
        chapter={chapter}
        questions={questions}
        responses={responses}
        handleOptionChange={handleOptionChange}
        chapterName={chapter?.name}
        handleNextChapter={handleNextChapter}
        handlePrevChapter={handlePrevChapter}
        isFirstChapter={isFirstChapter}
        isLastChapter={isLastChapter}
      />

      {/* Botones de navegación entre capítulos */}
      <ButtonContainer>
        {!isFirstChapter && (
          <LargeStyledButton onClick={handlePrevChapter} style={{ marginRight: "1rem" }}>
            ← Retroceder
          </LargeStyledButton>
        )}

        <LargeStyledButton onClick={handleNextChapter}>
          {isLastChapter ? "Enviar y Finalizar" : "Siguiente →"}
        </LargeStyledButton>
      </ButtonContainer>
    </>
  );
};

export default Chapter;
