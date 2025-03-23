import { Survey, Responses, SurveyResponse } from "@/types";
import Swal from "sweetalert2";
import { getSystemMessage, submitResponses } from "@/utils/api";
import { handleError } from "@/utils/errorHandling";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { prepareAnswersForSubmit } from "@/helpers/submitAnswers";

export const showRejection = async (key: string, router: AppRouterInstance) => {
  const message = await getSystemMessage(key);
  if (!message) return;

  Swal.fire({
    icon: "error",
    title: message.title,
    html: message.content,
    confirmButtonText: "Aceptar",
  }).then(() => router.push("/surveys"));
};

export const handleFirstQuestionSubmit = async (
  survey: Survey | null,
  responses: Responses,
  setResponses: (fn: (prev: Responses) => Responses) => void,
  setShowSecondQuestion: (value: boolean) => void,
  router: AppRouterInstance
) => {
  const firstResponse = responses[1];
  if (!survey?.id || !firstResponse) {
    Swal.fire({
      icon: "warning",
      title: "Debe responder la primera pregunta",
      text: "Por favor indique si ha vivido en Colombia antes de continuar.",
    });
    return;
  }

  if (firstResponse === 2) {
    try {
      const response = await submitResponses([
        { survey_id: survey.id, question_id: 1, option_selected: 2 },
      ]);
      if (response?.rejected) return showRejection("rejection_no_colombia", router);
    } catch {
      return showRejection("rejection_no_colombia", router);
    }
  }

  if (firstResponse === 1) {
    setResponses((prev) => ({ ...prev, 1: firstResponse }));
    setShowSecondQuestion(true);
  }
};

export const handleBirthDateSubmit = async (
  birthDate: string,
  survey: Survey | null,
  responses: Responses,
  setCurrentChapterIndex: (val: number) => void,
  router: AppRouterInstance
) => {
  if (!birthDate || !survey?.id) {
    Swal.fire({
      icon: "warning",
      title: "Fecha de nacimiento requerida",
      text: "Debe seleccionar su fecha de nacimiento antes de continuar.",
    });
    return;
  }

  const birthYear = parseInt(birthDate.split("-")[0], 10);
  const age = new Date().getFullYear() - birthYear;

  const responsesToSubmit: SurveyResponse[] = [
    {
      survey_id: survey.id,
      question_id: 1,
      option_selected: typeof responses[1] === "number" ? responses[1] : null
    },
    {
      survey_id: survey.id,
      question_id: 2,
      answer: birthDate,
    },
  ];

  if (age < 18) {
    try {
      const response = await submitResponses(responsesToSubmit);
      if (response?.rejected) return showRejection("rejection_underage", router);
    } catch {
      return showRejection("rejection_underage", router);
    }
  }

  setCurrentChapterIndex(1);
};

export const handleFinalSubmit = async (
  survey: Survey,
  responses: Responses,
  router: AppRouterInstance
) => {
  const allQuestions = survey.questions;
  const unanswered = allQuestions.filter((q) => {
    if (
      q.question_type === "matrix" &&
      Array.isArray(q.subquestions) &&
      q.subquestions.length > 0
    ) {
      return q.subquestions.some((sq) => {
        if (sq.is_other) return false;
        return responses[sq.id] === undefined || responses[sq.id] === null;
      });
    }
    const response = responses[q.id];
    return response === undefined || response === null || (Array.isArray(response) && response.length === 0);
  });

  if (unanswered.length > 0) {
    const ids = unanswered.map((q) => q.id).join(", ");
    Swal.fire({
      icon: "warning",
      title: "Faltan preguntas por responder",
      html: `Por favor, responde las siguientes preguntas antes de finalizar: <strong>${ids}</strong>`,
      confirmButtonText: "Aceptar",
    });
    return;
  }

  try {
    const formatted = prepareAnswersForSubmit(survey, responses);
    await submitResponses(formatted);
  
    const successMessage = await getSystemMessage("thank_you_message");
  
    if (successMessage) {
      Swal.fire({
        icon: "success",
        title: successMessage.title,
        html: successMessage.content,
        confirmButtonText: "Aceptar",
      }).then(() => router.push("/surveys"));
    }
  } catch (error) {
    handleError("Error al enviar respuestas:", error);
    Swal.fire("Error", "Hubo un problema al enviar las respuestas. Intente de nuevo.", "error");
  }
};
