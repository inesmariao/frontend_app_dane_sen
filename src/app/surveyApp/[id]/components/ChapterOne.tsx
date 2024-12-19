"use client";

import React from "react";
import { Question } from "@/types";
import {
  ChapterTitle,
  QuestionCard,
  QuestionText,
  QuestionInstructions,
  OptionWrapper,
  OptionLabel,
  Table,
  TableRow,
  SubQuestionColumn,
  Column,
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
                      {/* Subpregunta */}
                      <SubQuestionColumn>{subQuestion.text_subquestion}</SubQuestionColumn>

                      {/* Opciones */}
                      {filteredOptions.map((option) => (
                        <Column key={`sub-${subQuestion.id}-opt-${option.id}`}>
                          <OptionWrapper>
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
                          </OptionWrapper>
                        </Column>
                      ))}
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

export default ChapterOne;
