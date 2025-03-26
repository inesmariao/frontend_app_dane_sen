import { Responses, Survey, SurveyResponse, GeographicResponse } from "@/types";

export function prepareAnswersForSubmit(survey: Survey, responses: Responses): SurveyResponse[] {
  const formattedResponses: SurveyResponse[] = [];

  survey.questions.forEach((question) => {
    const response = responses[question.id];

    if (question.id === 1) {
      formattedResponses.push({
        survey_id: survey.id,
        question_id: 1,
        option_selected: typeof response === "number" ? response : null,
      });
    } else if (question.id === 2) {
      formattedResponses.push({
        survey_id: survey.id,
        question_id: 2,
        answer: typeof response === "string" ? response : null,
      });
    } else if (question.id === 6) {
      const geo = (response as GeographicResponse) ?? {};
      formattedResponses.push({
        survey_id: survey.id,
        question_id: 6,
        option_selected: 135,
        country: 572,
        department: typeof geo.department === "number" ? geo.department : null,
        municipality: typeof geo.municipality === "number" ? geo.municipality : null,
      });
    } else if (question.id === 8) {
      const geo = (response as GeographicResponse) ?? {};
      const selectedOption = geo.option_selected;

      const base = {
        survey_id: survey.id,
        question_id: 8,
        option_selected: typeof selectedOption === "number" ? selectedOption : null,
      };

      if (selectedOption === 20) {
        formattedResponses.push({
          ...base,
          country: 572,
          department: typeof geo.department === "number" ? geo.department : null,
          municipality: typeof geo.municipality === "number" ? geo.municipality : null,
        });
      } else {
        formattedResponses.push(base);
      }
    } else if (question.question_type === "matrix" && question.subquestions?.length) {
      question.subquestions.forEach((subq) => {
        const subResponse = responses[subq.id];
        let otherText = responses[`other_${subq.id}`] ?? "";
        if (typeof otherText !== "string") {
          otherText = otherText?.toString() ?? "";
        }

        let processedOtherText = "";
        if (subq.is_other) {
          processedOtherText = otherText.trim()
            ? otherText.trim()
            : "Opción Otro sin responder";
        }

        formattedResponses.push({
          survey_id: survey.id,
          question_id: question.id,
          subquestion_id: subq.id,
          option_selected: typeof subResponse === "number" ? subResponse : null,
          other_text: subq.is_other ? processedOtherText : "",
        });
      });
    } else if (question.question_type === "open") {
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        answer: typeof response === "string" ? response : response?.toString() ?? "",
      });
    } else if (question.question_type === "closed" && question.is_multiple) {
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        options_multiple_selected: Array.isArray(response)
          ? response.filter((id) => typeof id === "number")
          : [],
      });
    } else if (question.question_type === "closed" && !question.is_multiple) {
      const otherTextRaw = responses[`other_${question.id}`] ?? "";
      const otherText = typeof otherTextRaw === "string" ? otherTextRaw : otherTextRaw?.toString() ?? "";
      const processedOtherText = otherText.trim() ? otherText.trim() : "Opción Otro sin responder";

      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        option_selected: typeof response === "number" ? response : null,
        other_text: processedOtherText,
      });
    }
  });

  return formattedResponses;
}
