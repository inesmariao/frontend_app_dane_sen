"use client";

import React, { useState, useEffect } from "react";
import { ChapterProps, SubQuestion, Question, Responses, GeographicResponse } from "@/types";
import { shouldEnableOtherInput } from "@/utils/stringUtils";
import { GeographicQuestion } from "./GeographicQuestion";
import {
  ChapterTitle,
  QuestionCard,
  QuestionText,
  QuestionInstructions,
  OptionWrapper,
  OptionWrapper_Subquestions,
  OptionWrapper_Column,
  OptionLabel,
  Column,
  SubQuestionColumn,
  Table,
  TableRow,
  NumericInputWrapper,
  OtherInputWrapper
} from "@/styles/components/StyledSurvey";

const ChapterTwo: React.FC<ChapterProps> = ({
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
  }, []);

  return (
    <>
      {/* Título del capítulo */}
      <ChapterTitle>{chapterName}</ChapterTitle>

      {/* Renderizado de preguntas */}
      {questions.map((question, questionIndex) => {
        const isMatrix = question.question_type === "matrix";
        const isNumeric = question.data_type === "integer";
        const isMultiple = question.is_multiple;
        const isGeographic = question.is_geographic;
        const subQuestions: SubQuestion[] = Array.isArray(question.subquestions) ? question.subquestions : [];
        const questionKey = question.id ? `question-${question.id}` : `question-${questionIndex}`;
        const isRowLayout = question.matrix_layout_type === "row";


        return (
          <QuestionCard key={questionKey}>
            {/* Texto de la pregunta */}
            <QuestionText>{`${question.order_question} - ${question.text_question}`}</QuestionText>

            {/* Instrucciones */}
            {question.instruction && (
              <QuestionInstructions>{question.instruction}</QuestionInstructions>
            )}

            {/* Si la pregunta es de tipo geográfico, se usa el nuevo componente */}
            {isGeographic ? (
              <GeographicQuestion
                questionId={question.id}
                options={question.options ?? []}
                responses={responses}
                handleOptionChange={handleOptionChange}
              />
            ) : question.id === 7 && responses[question.id] === "Sí" ? (
              <GeographicQuestion
                questionId={question.id}
                options={question.options ?? []}
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
                  {subQuestions.map((subQuestion, subQuestionIndex) => {

                    // Aplicar el filtro a las opciones
                    const filteredOptions = question.options?.filter(
                      option => Number(option.subquestion_id) === Number(subQuestion.id) && Number(option.question_id) === Number(question.id)
                    ) || [];

                    const enableOther = shouldEnableOtherInput(subQuestion.text_subquestion);
                    const subQuestionKey = `subquestion-${question.id}-${subQuestionIndex}`;
                    const isOtherSubQuestion = subQuestion.text_subquestion.toLowerCase().includes("otro");

                    return (
                      <TableRow key={subQuestionKey}>
                        <SubQuestionColumn>
                          {subQuestion.custom_identifier ? `${subQuestion.custom_identifier} - ` : ""}
                          {subQuestion.text_subquestion}
                          {subQuestion.instruction && <QuestionInstructions>{subQuestion.instruction}</QuestionInstructions>}
                        </SubQuestionColumn>
                        <Column>
                        <OptionWrapper_Subquestions>
  {isSmallScreen ? (
    <>
      {/* Primera fila: radio-buttons */}
      <div className="radio-options">
        {filteredOptions.map((option, optionIndex) => {
          const isChecked = responses[subQuestion.id] === option.id;
          const optionKey = `option-${question.id}-sub-${subQuestion.id}-${optionIndex}`;

          return (
            <div key={optionKey} className="option-container">
              <input
                type="radio"
                id={`option-${subQuestion.id}-${option.id}`}
                name={`subquestion-${question.id}-${subQuestion.id}`}
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
        {filteredOptions.map((option, optionIndex) => (
          <OptionLabel key={`label-${optionIndex}`} htmlFor={`option-${subQuestion.id}-${option.id}`}>
            {option.text_option}
          </OptionLabel>
        ))}
      </div>
    </>
  ) : (
    /* Para pantallas medianas y grandes: Radio button y opción en la misma línea */
    filteredOptions.map((option, optionIndex) => {
      const isChecked = responses[subQuestion.id] === option.id;
      const optionKey = `option-${question.id}-sub-${subQuestion.id}-${optionIndex}`;

      return (
        <div key={optionKey} className="option-container">
          <input
            type="radio"
            id={`option-${subQuestion.id}-${option.id}`}
            name={`subquestion-${question.id}-${subQuestion.id}`}
            value={option.id}
            checked={isChecked}
            onChange={() => handleOptionChange(subQuestion.id, option.id)}
          />
          <OptionLabel htmlFor={`option-${subQuestion.id}-${option.id}`}>
            {option.text_option}
          </OptionLabel>
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
                  {subQuestions.map((subQuestion, subQuestionIndex) => {
                    const filteredOptions = question.options?.filter(option => option.subquestion_id === subQuestion.id) || [];
                    const enableOther = shouldEnableOtherInput(subQuestion.text_subquestion);
                    const subQuestionKey = `subquestion-${question.id}-${subQuestionIndex}`;

                    return (
                      <div key={subQuestionKey}>
                        <SubQuestionColumn>
                          {subQuestion.custom_identifier ? `${subQuestion.custom_identifier} - ` : ""}
                          {subQuestion.text_subquestion}
                          {subQuestion.instruction && <QuestionInstructions>{subQuestion.instruction}</QuestionInstructions>}
                        </SubQuestionColumn>
                        <OptionWrapper_Column>
                          {filteredOptions.map((option, optionIndex) => {
                            const isChecked = responses[subQuestion.id] === option.id;
                            const optionKey = `option-${question.id}-sub-${subQuestion.id}-${optionIndex}`;

                            return (
                              <div key={optionKey}>
                                <input
                                  type="radio"
                                  id={`option-${subQuestion.id}-${option.id}`}
                                  name={`subquestion-${subQuestion.id}`}
                                  value={option.id}
                                  checked={isChecked}
                                  onChange={() => handleOptionChange(subQuestion.id, option.id)}
                                />
                                <OptionLabel htmlFor={`option-${subQuestion.id}-${option.id}`}>
                                  {option.text_option}
                                </OptionLabel>
                              </div>
                            );
                          })}
                          {/* Input "Otro" para la subpregunta */}
                          {enableOther && responses[subQuestion.id] && !question.options?.find(opt => opt.id === responses[subQuestion.id])?.text_option.toLowerCase().includes("no sé") && (
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
                        </OptionWrapper_Column>
                      </div>
                    );
                  })}
                </div>
              )
            ) :
              // Preguntas cerradas (checkbox o radiobutton)
              Array.isArray(question.options) && question.options.length > 0 ? (
                question.options?.map((option, optionIndex) => {
                  if (!option || typeof option.id !== "number") return null;

                  const isChecked = isMultiple
                    ? Array.isArray(responses[question.id]) &&
                    (responses[question.id] as number[]).includes(option.id)
                    : responses[question.id] === option.id;
                  const optionKey = `option-${question.id}-${optionIndex}`;

                  return (
                    <div key={optionKey}>
                      <OptionWrapper isCheckbox={isMultiple} className="flex items-start w-full">
                        <input
                          type={isMultiple ? "checkbox" : "radio"}
                          id={`option-${option.id}`}
                          name={`question-${question.id}`}
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
                        <OptionLabel htmlFor={`option-${option.id}`}>{option.text_option}</OptionLabel>
                      </OptionWrapper>

                      {/* Input de texto "Otro" */}
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
            }
          </QuestionCard>
        );
      })}
    </>
  );
};


export default ChapterTwo;
