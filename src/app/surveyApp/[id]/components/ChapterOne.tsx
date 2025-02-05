"use client";

import React from "react";
import { ChapterProps } from "@/types";
import { shouldEnableOtherInput } from "@/utils/stringUtils";
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
  OtherInputWrapper,
} from "@/styles/components/StyledSurvey";

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
        const isMultiple = question.is_multiple;
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

                    // Verificar si la subpregunta contiene las palabras clave para mostrar el input "Otro"
                    const enableOther = shouldEnableOtherInput(subQuestion.text_subquestion);

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
                          {filteredOptions.map((option) => {
                            const isChecked = responses[subQuestion.id] === option.id;

                            // Verificar si esta opción no es "No sé"
                            const enableOther = shouldEnableOtherInput(subQuestion.text_subquestion);

                            return (
                              <div key={`sub-${subQuestion.id}-opt-${option.id}`}>
                                <input
                                  type="radio"
                                  id={`option-${subQuestion.id}-${option.id}`}
                                  name={`subquestion-${subQuestion.id}`}
                                  value={option.id}
                                  checked={isChecked}
                                  onChange={() =>
                                    handleOptionChange(subQuestion.id, option.id)
                                  }
                                />
                                <OptionLabel htmlFor={`option-${subQuestion.id}-${option.id}`}>
                                  {option.text_option}
                                </OptionLabel>

                                {/* Mostrar el input solo si la opción no es "No sé" y es una opción válida para "Otro" */}
                                {enableOther && isChecked && !option.text_option.toLowerCase().includes("no sé") && (
                                  <OtherInputWrapper>
                                    <input
                                      type="text"
                                      id={`other-input-${subQuestion.id}`}
                                      placeholder="Otro, ¿cuál?"
                                      value={String(responses[`other_${subQuestion.id}`] || "")}
                                      onChange={(e) => handleOptionChange(`other_${subQuestion.id}`, e.target.value)}
                                    />
                                  </OtherInputWrapper>
                                )}
                              </div>
                            );
                          })}
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
                    // Verificar si la subpregunta contiene "Otro, ¿cuál?"
                    const enableOther = shouldEnableOtherInput(subQuestion.text_subquestion);
                    const isChecked = responses[subQuestion.id] !== undefined;

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
                          {filteredOptions.map((option) => {
                            const isChecked = responses[subQuestion.id] === option.id;
                            const enableOther = shouldEnableOtherInput(option.text_option);

                            return (
                              <div key={`sub-${subQuestion.id}-opt-${option.id}`}>
                                <input
                                  type="radio"
                                  id={`option-${subQuestion.id}-${option.id}`}
                                  name={`subquestion-${subQuestion.id}`}
                                  value={option.id}
                                  checked={isChecked}
                                  onChange={() =>
                                    handleOptionChange(subQuestion.id, option.id)
                                  }
                                />
                                <OptionLabel htmlFor={`option-${subQuestion.id}-${option.id}`}>
                                  {option.text_option}
                                </OptionLabel>

                                {/* Input de texto "Otro" para matrices: Se muestra el input solo si una opción está seleccionada */}
                                {enableOther && isChecked && (
                                  <OtherInputWrapper>
                                    <input
                                      type="text"
                                      id={`other-input-${subQuestion.id}`}
                                      placeholder="Otro, ¿cuál?"
                                      value={String(responses[`other_${subQuestion.id}`] || "")}
                                      onChange={(e) =>
                                        handleOptionChange(`other_${subQuestion.id}`, e.target.value)
                                      }
                                    />
                                  </OtherInputWrapper>
                                )}
                              </div>
                            );
                          })}
                        </OptionWrapper_Column>
                        {/* Mostrar input si la subpregunta requiere "Otro" y tiene alguna opción seleccionada */}
                        {enableOther && isChecked && (
                          <OtherInputWrapper>
                            <input
                              type="text"
                              id={`other-input-${subQuestion.id}`}
                              placeholder="Otro, ¿cuál?"
                              value={String(responses[`other_${subQuestion.id}`] || "")}
                              onChange={(e) =>
                                handleOptionChange(`other_${subQuestion.id}`, e.target.value)
                              }
                            />
                          </OtherInputWrapper>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              // Preguntas cerradas (checkbox o radiobutton)
              Array.isArray(question.options) && question.options.length > 0 ? (
                question.options.map((option) => {
                  if (!option || typeof option.id !== "number") return null;

                  const isChecked = isMultiple
                    ? Array.isArray(responses[question.id]) &&
                      (responses[question.id] as number[]).includes(option.id)
                    : responses[question.id] === option.id;

                  return (
                    <div key={option.id} className="w-full">
                      <OptionWrapper isCheckbox={isMultiple} className="flex items-start w-full">
                        <input
                          type={isMultiple ? "checkbox" : "radio"}
                          id={`option-${option.id}`}
                          name={`question-${question.id}`}
                          value={option.id}
                          checked={isChecked}
                          onChange={() => {
                            if (isMultiple) {
                              // Manejo de selección múltiple
                              const currentSelections = Array.isArray(responses[question.id])
                                ? (responses[question.id] as number[])
                                : [];
                              const updatedSelections = isChecked
                                ? currentSelections.filter((id) => id !== option.id)
                                : [...currentSelections, option.id];
                              handleOptionChange(question.id, updatedSelections);
                            } else {
                              // Manejo de selección única
                              handleOptionChange(question.id, option.id);
                            }
                          }}
                        />
                        <OptionLabel htmlFor={`option-${option.id}`}>
                          {option.text_option}
                        </OptionLabel>
                      </OptionWrapper>

                      {/* Input de texto "Otro" correctamente alineado */}
                      {option.is_other && isChecked && (
                        <OtherInputWrapper>
                          <input
                            type="text"
                            id={`other-input-${question.id}`}
                            placeholder="Otro, ¿cuál?"
                            value={String(responses[`other_${question.id}`] || "")}
                            onChange={(e) =>
                              handleOptionChange(`other_${question.id}`, e.target.value)
                            }
                          />
                        </OtherInputWrapper>
                      )}
                    </div>
                  );
                })
              ) : null
            )}
          </QuestionCard>
        );
      })}
    </>
  );
};

export default ChapterOne;
