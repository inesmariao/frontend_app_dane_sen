"use client";

import React from "react";
import { Question } from "@/types";
import {
  ChapterTitle,
  QuestionCard,
  QuestionText,
  QuestionInstructions,
  OptionWrapper,
  OptionWrapper_Subquestions,
  OptionWrapper_Column,
  OptionLabel,
  SubQuestionColumn,
  Table,
  TableRow,
  NumericInputWrapper,
} from "@/styles/components/StyledSurvey";

// Interfaz para las propiedades del capítulo
interface ChapterProps {
  questions: Question[];
  responses: { [key: number]: string | number | number[] };
  handleOptionChange: (questionId: number, value: string | number | number[]) => void;
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
        const isNumeric = question.data_type === "integer";
        const isMultiple = question.is_multiple; // Determina si permite selección múltiple
        const subQuestions = question.subquestions || [];

        return (
          <QuestionCard key={question.id}>
            {/* Texto de la pregunta */}
            <QuestionText>{`${question.order_question} - ${question.text_question}`}</QuestionText>

            {/* Instrucciones */}
            {question.instruction && (
              <QuestionInstructions>{question.instruction}</QuestionInstructions>
            )}

            {/* Preguntas tipo numérico */}
            {isNumeric ? (
              <NumericInputWrapper>
                <input
                  type="number"
                  id={`numeric-${question.id}`}
                  name={`question-${question.id}`}
                  value={
                    Array.isArray(responses[question.id])
                      ? ((responses[question.id] as number[])[0]?.toString() || "")
                      : responses[question.id]?.toString() || ""
                  }
                  min={question.min_value || undefined}
                  max={question.max_value || undefined}
                  step="1"
                  onChange={(e) => {
                    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                    handleOptionChange(question.id, value);
                  }}
                />
              </NumericInputWrapper>
            ) : isMatrix && subQuestions.length > 0 ? (
              question.matrix_layout_type === "row" ? (
                // Diseño tipo "row" - Opciones en fila
                <Table>
                  {subQuestions.map((subQuestion) => {
                    const filteredOptions =
                      question.options?.filter(
                        (option) => option.subquestion_id === subQuestion.id
                      ) || [];

                    return (
                      <TableRow key={subQuestion.id}>
                        {/* Subpregunta */}
                        <SubQuestionColumn>
                          {subQuestion.custom_identifier
                            ? `${subQuestion.custom_identifier} - `
                            : ""}
                          {subQuestion.text_subquestion}
                          {subQuestion.instruction && (
                            <QuestionInstructions>
                              {subQuestion.instruction}
                            </QuestionInstructions>
                          )}
                        </SubQuestionColumn>
                        {/* Opciones en fila */}
                        <OptionWrapper_Subquestions>
                          {filteredOptions.map((option) => (
                            <div key={`sub-${subQuestion.id}-opt-${option.id}`}>
                              <input
                                type="radio"
                                id={`option-${subQuestion.id}-${option.id}`}
                                name={`subquestion-${subQuestion.id}`}
                                value={option.id}
                                checked={
                                  responses[subQuestion.id] === option.id
                                }
                                onChange={() =>
                                  handleOptionChange(subQuestion.id, option.id)
                                }
                              />
                              <OptionLabel
                                htmlFor={`option-${subQuestion.id}-${option.id}`}
                              >
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
                // Diseño tipo "column" - Opciones en columna
                <div>
                  {subQuestions.map((subQuestion) => {
                    const filteredOptions =
                      question.options?.filter(
                        (option) => option.subquestion_id === subQuestion.id
                      ) || [];

                    return (
                      <div key={subQuestion.id}>
                        {/* Subpregunta en formato columna */}
                        <SubQuestionColumn>
                          {subQuestion.custom_identifier
                            ? `${subQuestion.custom_identifier} - `
                            : ""}
                          {subQuestion.text_subquestion}
                        </SubQuestionColumn>

                        {subQuestion.instruction && (
                          <QuestionInstructions>
                            {subQuestion.instruction}
                          </QuestionInstructions>
                        )}

                        {/* Opciones para diseño en columna */}
                        <OptionWrapper_Column>
                          {filteredOptions.map((option) => (
                            <div key={`sub-${subQuestion.id}-opt-${option.id}`}>
                              <input
                                type="radio"
                                id={`option-${subQuestion.id}-${option.id}`}
                                name={`subquestion-${subQuestion.id}`}
                                value={option.id}
                                checked={
                                  responses[subQuestion.id] === option.id
                                }
                                onChange={() =>
                                  handleOptionChange(subQuestion.id, option.id)
                                }
                              />
                              <OptionLabel
                                htmlFor={`option-${subQuestion.id}-${option.id}`}
                              >
                                {option.text_option}
                              </OptionLabel>
                            </div>
                          ))}
                        </OptionWrapper_Column>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              // Preguntas cerradas (checkbox o radiobutton)
              question.options?.map((option) => {
                const inputType = isMultiple ? "checkbox" : "radio";

                const isChecked = isMultiple
                  ? Array.isArray(responses[question.id]) &&
                    (responses[question.id] as number[]).includes(option.id)
                  : responses[question.id] === option.id;

                return (
                  <OptionWrapper key={option.id} isCheckbox={isMultiple}>
                    <input
                      type={inputType}
                      id={`option-${option.id}`}
                      name={
                        isMultiple
                          ? `question-${question.id}-${option.id}`
                          : `question-${question.id}`
                      }
                      value={option.id}
                      checked={isChecked}
                      onChange={() => {
                        if (isMultiple) {
                          const currentSelections = Array.isArray(responses[question.id])
                            ? (responses[question.id] as number[])
                            : [];
                          const updatedSelections = isChecked
                            ? currentSelections.filter((id) => id !== option.id)
                            : [...currentSelections, option.id];
                          handleOptionChange(question.id, updatedSelections);
                        } else {
                          handleOptionChange(question.id, option.id);
                        }
                      }}
                    />
                    <OptionLabel htmlFor={`option-${option.id}`}>
                      {option.text_option}
                    </OptionLabel>
                  </OptionWrapper>
                );
              })
            )}
          </QuestionCard>
        );
      })}
    </>
  );
};

export default ChapterOne;
