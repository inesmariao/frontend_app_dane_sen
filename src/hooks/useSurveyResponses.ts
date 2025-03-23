import { useState, useCallback } from "react";
import { Responses, GeographicResponse, Question } from "@/types";

export const useSurveyResponses = (questions: Question[] = []) => {
  const [responses, setResponses] = useState<Responses>({});
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);

  const processGeographicResponse = (
    prev: Responses,
    geoValue: GeographicResponse,
    numericQuestionId: number,
    yesOptionId?: number | null
  ) => {
    const baseResponse = {
      ...(prev[numericQuestionId] as GeographicResponse ?? {}),
      option_selected: geoValue.option_selected ?? null,
      country: geoValue.country ?? undefined,
      department: geoValue.department ?? undefined,
      municipality: geoValue.municipality ?? undefined,
    };

    if (numericQuestionId === 8 && geoValue.option_selected === yesOptionId) {
      return {
        ...baseResponse,
        new_department: geoValue.new_department ?? undefined,
        new_municipality: geoValue.new_municipality ?? undefined,
      };
    }

    return baseResponse;
  };

  const processQuestion11And12 = (
    prevResponses: Responses,
    value: string | number | number[] | GeographicResponse,
    questionId: number,
    noOptionId: number | null
  ) => {
    if (typeof noOptionId === "number") {
  if (typeof value === "number") {
    return {
      ...prevResponses,
      [questionId]: value === noOptionId ? [noOptionId] : [value],
    };
  } else if (Array.isArray(value)) {
    return {
      ...prevResponses,
      [questionId]: value.includes(noOptionId)
        ? [noOptionId]
        : value.filter((id) => id !== noOptionId),
    };
  }
}
return prevResponses;
  };

  const handleOptionChange = useCallback((
    questionId: string | number,
    value: string | number | number[] | GeographicResponse
  ) => {
    setResponses((prev) => {
      const updatedResponses = { ...prev };
      const numericId = typeof questionId === "string" ? parseInt(questionId, 10) : questionId;

      if (typeof questionId === "string" && questionId.startsWith("other_")) {
        updatedResponses[questionId] = value;
        return updatedResponses;
      }

      switch (numericId) {
        case 6:
        case 8: {
          const geoValue = value as GeographicResponse;
          const yesOptionId = questions.find((q) => q.id === numericId)?.options?.find(
            (opt) => opt.text_option.toLowerCase() === "sí"
          )?.id;
          updatedResponses[numericId] = processGeographicResponse(prev, geoValue, numericId, yesOptionId);
          break;
        }
        case 11:
        case 12: {
          const noOptionText =
            numericId === 11
              ? "no presenta ningún tipo de discapacidad"
              : "no he sentido discriminación";

          const noOptionId: number | null =
          questions.find((q) => q.id === numericId)
            ?.options?.find((opt) => opt.text_option.trim().toLowerCase() === noOptionText)?.id ?? null;

          const result = processQuestion11And12(prev, value, numericId, noOptionId);
          updatedResponses[numericId] = result[numericId];
          break;
        }
        default:
          updatedResponses[numericId] = Array.isArray(value)
            ? value.filter((v) => v !== null)
            : value;
      }

      return updatedResponses;
    });
  }, [questions]);

  return {
    responses,
    setResponses,
    currentChapterIndex,
    setCurrentChapterIndex,
    showSecondQuestion,
    setShowSecondQuestion,
    handleOptionChange
  };
};
