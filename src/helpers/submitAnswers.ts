import { Responses, Survey, SurveyResponse, GeographicResponse } from "@/types";

export function prepareAnswersForSubmit(survey: Survey, responses: Responses): SurveyResponse[] {
  console.log("// DEBUG - survey.questions:", survey.questions); 
  const formattedResponses: SurveyResponse[] = [];

  survey.questions.forEach((question) => {
    const response = responses[question.id];

    // Manejo de la primera pregunta y fecha de nacimiento
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
      console.log("// DEBUG - question.subquestions:", question.subquestions);
      question.subquestions.forEach((subq) => {
        console.log("// DEBUG - subq.id:", subq.id);
        const subResponse = responses[subq.id];
        console.log("// DEBUG - responses[subq.id]:", subResponse); 
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
        department: geo.department ?? null,
        municipality: geo.municipality ?? null,
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
      console.log("// DEBUG - responses[question.id]:", responses[question.id]);
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

  console.log("📌 Respuestas formateadas antes de enviar:", formattedResponses); // Debug

  return formattedResponses;
}