"use client";

import React, { useState, useEffect } from "react";
import { ChapterProps, GeographicResponse } from "@/types";
import DateSelector from "@/components/common/DateSelector";
import { shouldEnableOtherInput } from "@/utils/stringUtils";
import { GeographicQuestion } from "./GeographicQuestion";
import TooltipOption from "@/components/common/TooltipOption";
import {
  QuestionCard,
  QuestionText,
  QuestionInstructions,
  OptionWrapper,
  OptionWrapper_Subquestions,
  OptionWrapper_Column,
  OptionLabel,
  SubQuestionColumn,
  Column,
  Table,
  TableRow,
  NumericInputWrapper,
  OtherInputWrapper,
  TooltipOptionContainer
} from "@/styles/components/StyledSurvey";

const ChapterQuestions: React.FC<ChapterProps> = ({
  questions,
  responses,
  handleOptionChange,
  chapterName,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },);

  return (
    <>
      {/* Título del capítulo */}
      

      {/* Renderizado de preguntas */}
      {questions.map((question, questionIndex) => {
        const isMatrix = question.question_type === "matrix";
        const isNumeric = question.data_type === "integer";
        const isMultiple = question.is_multiple;
        const isGeographic = question.is_geographic;
        const subQuestions = Array.isArray(question.subquestions) ? question.subquestions : [];
        const questionKey = question.id ? `question-${question.id}` : `question-${questionIndex}`;
        const isRowLayout = question.matrix_layout_type === "row";
        const yesOption = question.options?.find((option) => option.text_option.toLowerCase() === "sí");

        return (
          <QuestionCard key={questionKey}>

            {/* Contenedor para la pregunta y el tooltip en la misma fila */}
            <TooltipOptionContainer>
              <QuestionText>{`${question.order_question} - ${question.text_question}`}</QuestionText>
              {question.note && (
                <TooltipOption note={question.note} />
              )}
            </TooltipOptionContainer>

            {/* Instrucciones */}
            {question.instruction && (
              <QuestionInstructions>{question.instruction}</QuestionInstructions>
            )}

            {question.question_type === "birth_date" ? (
              <DateSelector
                questionId={question.id}
                onChange={handleOptionChange}
              />
            ) : isGeographic || (question.id === 7 && yesOption && (responses[question.id] as GeographicResponse)?.option_selected === yesOption.id) ? (
              <GeographicQuestion
                questionId={question.id}
                options={question.options ??[]}
                responses={responses}
                handleOptionChange={handleOptionChange}
              />
            ) : isNumeric ? (
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
            ) : null}

            {/* Renderizado de preguntas tipo matrix */}
            {isMatrix && subQuestions?.length > 0 ? (
              isRowLayout ? ( // Renderizado para "row"
                <Table>
                  {subQuestions.map((subQuestion) => {
                    const filteredOptions = question.options?.filter(
                      option => Number(option.subquestion_id) === Number(subQuestion.id) && Number(option.question_id) === Number(question.id)
                    ) || [];

                    const subQuestionKey = `subquestion-${question.id}-${subQuestion.id}`;
                    const isOtherSubQuestion = subQuestion.text_subquestion.toLowerCase().includes("otro");

                    return (
                      <TableRow key={subQuestionKey}>
                        {/* Subpregunta en formato columna */}
                        <SubQuestionColumn>
                          {/* Contenedor para la subpregunta y el tooltip en la misma fila */}
                          <TooltipOptionContainer key={`tooltip-${subQuestionKey}`}>
                            {subQuestion.custom_identifier
                              ? `${subQuestion.custom_identifier} - `
                              : ""}
                            {subQuestion.text_subquestion}

                            {/* Tooltip para la subpregunta si tiene una nota */}
                            {subQuestion.note && (
                              <TooltipOption note={subQuestion.note} />
                            )}
                          </TooltipOptionContainer>

                          {subQuestion.instruction && <QuestionInstructions>{subQuestion.instruction}</QuestionInstructions>}
                        </SubQuestionColumn>
                        <Column>
                          <OptionWrapper_Subquestions>
                            {isSmallScreen ? (
                              <>
                                {/* Primera fila: radio-buttons */}
                                <div className="radio-options">
                                  {filteredOptions.map((option) => {
                                    const isChecked = responses[subQuestion.id] === option.id;
                                    const optionKey = `option-q-${question.id}-sq-${subQuestion.id}-opt-${option.id}`;

                                    return (
                                      <div key={optionKey} className="flex items-center space-x-3">
                                        {/* Radio button */}
                                        <input
                                          type="radio"
                                          id={`option-${subQuestion.id}-opt-${option.id}`}
                                          name={`subquestion-q-${question.id}-sq-${subQuestion.id}`}
                                          value={option.id}
                                          checked={isChecked}
                                          onChange={() => handleOptionChange(subQuestion.id, option.id)}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Segunda fila: etiquetas debajo de los radio-buttons */}
                                <div className="labels">
                                  {filteredOptions.map((option) => (
                                      <TooltipOptionContainer key={`label-${question.id}-${subQuestion.id}-${option.id}`}>
                                        <OptionLabel htmlFor={`option-${subQuestion.id}-${option.id}`}>
                                          {option.text_option}
                                        </OptionLabel>
                                        {option.note && <TooltipOption note={option.note} />}
                                      </TooltipOptionContainer>
                                  ))}
                                </div>
                              </>
                            ) : (
                              /* Para pantallas medianas y grandes: Radio button y opción en la misma línea */
                              filteredOptions.map((option) => {
                                const isChecked = responses[subQuestion.id] === option.id;
                                const optionKey = `option-q-${question.id}-sq-${subQuestion.id}-opt-${option.id}`;
                                const isNumberOption = ["1", "2", "3", "4", "5"].includes(option.text_option);

                                return (
                                  <div key={optionKey} className="option-container">
                                    <input
                                      type="radio"
                                      id={`option-sq-${subQuestion.id}-opt-${option.id}`}
                                      name={`subquestion-q-${question.id}-sq-${subQuestion.id}`}
                                      value={option.id}
                                      checked={isChecked}
                                      onChange={() => handleOptionChange(subQuestion.id, option.id)}
                                    />

                                    {/* Contenedor para el texto y el tooltip */}
                                    <TooltipOptionContainer key={`tooltip-q-${question.id}-sq-${subQuestion.id}-opt-${option.id}`}>
                                      <OptionLabel htmlFor={`option-sq-${subQuestion.id}-opt-${option.id}`}>
                                        {option.text_option}
                                      </OptionLabel>
                                      {option.note && <TooltipOption note={option.note} />}

                                      {/* Mostrar input solo si es la subpregunta "Otro, ¿cuál?" y la opción es un número (1-5) */}
                                      {isOtherSubQuestion && isNumberOption && isChecked && (
                                        <OtherInputWrapper>
                                          <input
                                            type="text"
                                            id={`other-input-sq-${subQuestion.id}`}
                                            placeholder="Otro, ¿cuál?"
                                            value={String(responses[`other_${subQuestion.id}`] || "")}
                                            onChange={(e) => handleOptionChange(`other_${subQuestion.id}`, e.target.value)}
                                          />
                                        </OtherInputWrapper>
                                      )}
                                    </TooltipOptionContainer>
                                  </div>
                                );
                              })
                            )}

                            {/* Tercera fila: Input "Otro, ¿cuál?" */}
                            {isOtherSubQuestion &&
                              responses[subQuestion.id] &&
                              !filteredOptions.some(
                                (option) => option.id === responses[subQuestion.id] && option.text_option.toLowerCase().includes("no sé")
                              ) && (
                                <div className="other-input">
                                  <OtherInputWrapper>
                                    <input
                                      type="text"
                                      id={`other-input-${subQuestion.id}`}
                                      placeholder="Otro, ¿cuál?"
                                      value={String(responses[`other_${subQuestion.id}`] || "")}
                                      onChange={(e) => handleOptionChange(`other_${subQuestion.id}`, e.target.value)}
                                    />
                                  </OtherInputWrapper>
                                </div>
                              )}
                          </OptionWrapper_Subquestions>
                        </Column>
                      </TableRow>
                    );
                  })}
                </Table>
              ) : ( // Renderizado para "column"
                <div>
                  {subQuestions.map((subQuestion) => {

                    console.log("Subpregunta:", subQuestion.text_subquestion, "Note:", subQuestion.note); // Debug

                    const filteredOptions = question.options?.filter(option => option.subquestion_id === subQuestion.id) || [];
                    const enableOther = shouldEnableOtherInput(subQuestion.text_subquestion);
                    const subQuestionKey = `subquestion-q-${question.id}-sq-${subQuestion.id}`;

                    return (
                      <div key={subQuestionKey}>
                        <SubQuestionColumn>

                          {/* Contenedor para la subpregunta y el tooltip en la misma fila */}
                          <TooltipOptionContainer key={`tooltip-${subQuestionKey}`}>
                            {subQuestion.custom_identifier
                              ? `${subQuestion.custom_identifier} - `
                              : ""}
                            {subQuestion.text_subquestion}

                            {/* Tooltip para la subpregunta si tiene una nota */}
                            {subQuestion.note && (
                                <TooltipOption note={subQuestion.note} />
                            )}
                          </TooltipOptionContainer>

                          {subQuestion.instruction && <QuestionInstructions>{subQuestion.instruction}</QuestionInstructions>}
                        </SubQuestionColumn>
                        <OptionWrapper_Column>
                          {filteredOptions.map((option) => {
                            const isChecked = responses[subQuestion.id] === option.id;
                            const optionKey = `option-q-${question.id}-sq-${subQuestion.id}-opt-${option.id}`;

                            return (
                              <TooltipOptionContainer key={optionKey}>
                                <input
                                  type="radio"
                                  id={`option-sq-${subQuestion.id}-opt-${option.id}`}
                                  name={`subquestion-q-${question.id}-sq-${subQuestion.id}`}
                                  value={option.id}
                                  checked={isChecked}
                                  onChange={() => handleOptionChange(subQuestion.id, option.id)}
                                />
                                <OptionLabel htmlFor={`option-sq-${subQuestion.id}-opt-${option.id}`}>
                                  {option.text_option}
                                </OptionLabel>
                                {option.note && <TooltipOption note={option.note} />}
                              </TooltipOptionContainer>
                            );
                          })}
                          {/* Input "Otro" para la subpregunta */}
                          {enableOther && responses[subQuestion.id] && !question.options?.find(opt => opt.id === responses[subQuestion.id])?.text_option.toLowerCase().includes("no sé") && (
                            <OtherInputWrapper>
                              <input
                                type="text"
                                id={`other-input-sq-${subQuestion.id}`}
                                placeholder="Otro, ¿cuál?"
                                value={String(responses[`other_${subQuestion.id}`] || "")}
                                onChange={(e) => handleOptionChange(`other_${subQuestion.id}`, e.target.value)}
                              />
                            </OtherInputWrapper>
                          )}
                        </OptionWrapper_Column>
                      </div>
                    );
                  })}
                </div>
              )
            ) :
              // Preguntas cerradas (checkbox o radiobutton)
              Array.isArray(question.options) && question.options.length > 0 ? (
                question.options?.map((option) => {
                  if (!option || typeof option.id !== "number") return null;

                  const isChecked = isMultiple
                    ? Array.isArray(responses[question.id]) &&
                    (responses[question.id] as number[]).includes(option.id)
                    : responses[question.id] === option.id;
                    const optionKey = `option-q-${question.id}-opt-${option.id}`;


                  return (
                    <TooltipOptionContainer key={optionKey}>
                      <OptionWrapper isCheckbox={isMultiple} className="flex items-start w-full">
                        <input
                          type={isMultiple ? "checkbox" : "radio"}
                          id={`option-q-${question.id}-opt-${option.id}`}
                          name={`question-q-${question.id}`}
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
                        <OptionLabel htmlFor={`option-q-${question.id}-opt-${option.id}`} className="flex items-center">
                          {option.text_option}
                        </OptionLabel>
                        {option.note && <TooltipOption note={option.note} />}
                      </OptionWrapper>

                      {/* Input de texto "Otro" */}
                      {option.is_other && isChecked && (
                        <OtherInputWrapper>
                          <input
                            type="text"
                            id={`other-input-q-${question.id}`}
                            placeholder="Otro, ¿cuál?"
                            value={String(responses[`other_${question.id}`] || "")}
                            onChange={(e) =>
                              handleOptionChange(`other_${question.id}`, e.target.value)
                            }
                          />
                        </OtherInputWrapper>
                      )}
                    </TooltipOptionContainer>
                  );
                })
              ) : null
            }
          </QuestionCard>
        );
      })}
    </>
  );
};

export default ChapterQuestions;