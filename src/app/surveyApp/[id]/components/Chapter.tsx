"use client";

import React from "react";
import styled from "styled-components";
import ChapterQuestions from "./ChapterQuestions";
import { ChapterProps } from "@/types";
import { ChapterTitle, ButtonContainer } from "@/styles/components/StyledSurvey";
import { LargeStyledButton } from "@/styles/components/StyledButtonVariants";
import FormSpinner from "@/components/common/FormSpinner";

const ButtonWithSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Chapter: React.FC<ChapterProps> = ({
  chapter,
  questions,
  responses,
  handleOptionChange,
  handleNextChapter,
  handlePrevChapter,
  isLastChapter,
  chapterIndex,
  isLoading
}) => {

  return (
    <>
      <ChapterTitle>{chapter?.name}</ChapterTitle>

      <ChapterQuestions
        questions={questions}
        responses={responses}
        handleOptionChange={handleOptionChange}
      />

      <ButtonContainer>
        {chapterIndex > 1 && (
          <LargeStyledButton onClick={handlePrevChapter} style={{ marginRight: "1rem" }}>
            ← Retroceder
          </LargeStyledButton>
        )}

        <ButtonWithSpinnerWrapper>
          <LargeStyledButton onClick={handleNextChapter} disabled={isLoading}>
            {isLoading
              ? isLastChapter
                ? "Enviando..."
                : "Cargando..."
              : isLastChapter
              ? "Enviar y Finalizar"
              : "Siguiente →"}
          </LargeStyledButton>
          {isLoading && isLastChapter && <FormSpinner withText={false} />}
        </ButtonWithSpinnerWrapper>

      </ButtonContainer>
    </>
  );
};

export default Chapter;
