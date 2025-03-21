import { Responses, Survey, SurveyResponse, GeographicResponse } from "@/types";

export function prepareAnswersForSubmit(survey: Survey, responses: Responses): SurveyResponse[] {
  const formattedResponses: SurveyResponse[] = [];

  survey.questions.forEach((question) => {
    const response = responses[question.id];

    if (question.question_type === "matrix" && question.subquestions?.length) {
      question.subquestions.forEach((subq) => {
        const subResponse = responses[subq.id];
        const otherText = responses[`other_${subq.id}`] ?? undefined;

        if (typeof subResponse === "number") {
          formattedResponses.push({
            survey_id: survey.id,
            question_id: question.id,
            subquestion_id: subq.id,
            option_selected: subResponse,
            other_text: otherText ?? undefined,
          } as SurveyResponse);
        }
      });
    } else if (question.id === 8) {
      const geo = response as GeographicResponse ?? {};
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        option_selected: geo.option_selected ?? null,
        new_department: geo.new_department ?? null,
        new_municipality: geo.new_municipality ?? null,
      });
    } else if (question.is_geographic && typeof response === "object" && response !== null) {
      const geo = response as GeographicResponse;
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        option_selected: geo.option_selected ?? null,
        country: geo.country ?? null,
        department: geo.department ?? null,
        municipality: geo.municipality ?? null,
      });
    } else if (question.question_type === "open") {
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        answer: typeof response === "string" ? response : response?.toString() ?? null,
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
      const otherText = responses[`other_${question.id}`] ?? undefined;
      formattedResponses.push({
        survey_id: survey.id,
        question_id: question.id,
        option_selected: typeof response === "number" ? response : null,
        other_text: otherText ?? undefined,
      } as SurveyResponse);
    }
  });

  return formattedResponses;
}