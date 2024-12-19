"use client";

import React from "react";
import { Survey, Chapter, Question, SubQuestion, Option } from "@/types";
import styled from "styled-components";
import {
  ChapterTitle,
  QuestionCard,
  QuestionText,
  QuestionInstructions,
  OptionWrapper,
  OptionWrapper_Subquestions,
  OptionLabel,
  SubQuestionColumn,
  Table,
  TableRow,
  Column,
} from "@/styles/components/StyledSurvey";

interface ChapterProps {
  questions: Question[];
  responses: { [key: number]: number | string };
  handleOptionChange: (questionId: number, value: number | string) => void;
  chapterName: string;
}

const ChapterTwo: React.FC<ChapterProps> = ({
  questions,
  responses,
  handleOptionChange,
  chapterName,
}) => {
  return (
    <>
      {/* Título del capítulo */}
      <ChapterTitle>{chapterName}</ChapterTitle>

      {/* Renderizado de preguntas */}
      {questions.map((question) => {
        const isMatrix = question.question_type === "matrix";
        const subQuestions = question.subquestions || [];

        return (
          <QuestionCard key={question.id}>
            {/* Texto de la pregunta */}
            <QuestionText>{`${question.order_question} - ${question.text_question}`}</QuestionText>

            {/* Instrucciones de la pregunta */}
            {question.instruction && (
              <QuestionInstructions>{question.instruction}</QuestionInstructions>
            )}

            {/* Pregunta tipo "matrix" */}
            {isMatrix && subQuestions.length > 0 ? (
              <Table>

                {/* Filas de la tabla */}
                {subQuestions.map((subQuestion) => {
                  const filteredOptions =
                    question.options?.filter(
                      (option) => option.subquestion_id === subQuestion.id
                    ) || [];

                  return (
                    <TableRow key={subQuestion.id}>
                      {/* Subpregunta en una fila */}
                      <SubQuestionColumn>{subQuestion.text_subquestion}</SubQuestionColumn>

                      {/* Opciones en la fila siguiente */}
                      <OptionWrapper_Subquestions>
                        {filteredOptions.map((option) => (
                          <div key={`sub-${subQuestion.id}-opt-${option.id}`}>
                            <input
                              type="radio"
                              id={`option-${subQuestion.id}-${option.id}`}
                              name={`subquestion-${subQuestion.id}`}
                              value={option.id}
                              checked={responses[subQuestion.id] === option.id}
                              onChange={() =>
                                handleOptionChange(subQuestion.id, option.id)
                              }
                            />
                            <OptionLabel htmlFor={`option-${subQuestion.id}-${option.id}`}>
                              {option.text_option}
                            </OptionLabel>
                          </div>
                        ))}
                      </OptionWrapper_Subquestions>
                    </TableRow>
                  );
                })}
              </Table>
            ) : (
              // Pregunta normal
              question.options?.map((option) => (
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
              ))
            )}
          </QuestionCard>
        );
      })}
    </>
  );
};


export default ChapterTwo;
