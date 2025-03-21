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
    } else if (question.question_type === "matrix" && question.subquestions?.length) {
      question.subquestions.forEach((subq) => {
        const subResponse = responses[subq.id];
        let otherText = responses[`other_${subq.id}`] ?? "";
        if (typeof otherText !== "string") {
          otherText = otherText?.toString() ?? "";
        }
        if (subq.is_other) {
          formattedResponses.push({
            survey_id: survey.id,
            question_id: question.id,
            subquestion_id: subq.id,
            other_text: otherText || "Is_Other",
          });
        } else {
          formattedResponses.push({
            survey_id: survey.id,
            question_id: question.id,
            subquestion_id: subq.id,
            option_selected: typeof subResponse === "number" ? subResponse : null,
            other_text: otherText || "",
          });
        }
      });
    } else if (question.id === 6 || question.id === 8) {
      const geo = response as GeographicResponse ?? {};
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        option_selected: geo.option_selected ?? null,
        country: geo.country ?? null,
        department: typeof geo.department === "number" ? geo.department : null,
        municipality: geo.municipality ?? null,
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
      const otherText = responses[`other_${question.id}`] ?? "";
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        option_selected: typeof response === "number" ? response : null,
        other_text: otherText,
      } as SurveyResponse);
    }
  });

  return formattedResponses;
}