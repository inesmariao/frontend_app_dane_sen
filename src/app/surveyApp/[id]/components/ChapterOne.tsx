"use client";

import React from "react";
import { Survey, Chapter, Question, Option } from "@/types";
import styled from "styled-components";
import {
  ChapterTitle,
  NumericInput,
  QuestionCard,
  QuestionText,
  QuestionInstructions,
  OptionWrapper,
  OptionLabel
} from "@/styles/components/StyledSurvey";

interface ChapterProps {
  questions: Question[];
  responses: { [key: number]: number | string };
  handleOptionChange: (questionId: number, value: number | string) => void;
  chapterName: string;
}


const ChapterOne: React.FC<ChapterProps> = ({
  questions,
  responses,
  handleOptionChange,
  chapterName,
}) => {
  return (
  <>
    <ChapterTitle>{chapterName}</ChapterTitle>
      <>
        {questions.map((question) => (
          <QuestionCard key={question.id}>
            <QuestionText>{`${question.order_question} - ${question.text_question}`}</QuestionText>
            <QuestionInstructions>{question.instruction}</QuestionInstructions>
            {question.question_type === "open" &&
              question.min_value != null &&
              question.max_value != null && (
                <NumericInput
                  type="number"
                  min={question.min_value}
                  max={question.max_value}
                  value={responses[question.id] || ""}
                  onChange={(e) =>
                    handleOptionChange(question.id, Number(e.target.value))
                  }
                  placeholder="Ingrese su respuesta"
                />
              )}
            {question.question_type === "closed" &&
              Array.isArray(question.options) &&
              question.options.map((option) => (
                <OptionWrapper key={option.id}>
                  <input
                    type="radio"
                    id={`option-${option.id}`}
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={responses[question.id] === option.id}
                    onChange={() => handleOptionChange(question.id, option.id)}
                  />
                  <OptionLabel htmlFor={`option-${option.id}`}>
                    {option.text_option}
                  </OptionLabel>
                </OptionWrapper>
              ))}
          </QuestionCard>
        ))}
        </>
  </>
  );
};

export default ChapterOne;
