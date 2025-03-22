"use client";

import React, { useState, useEffect, memo  } from "react";
import { useParams, useRouter } from "next/navigation";
import { handleError } from "@/utils/errorHandling";
import Swal from "sweetalert2";
import { getSystemMessage } from "@/utils/api";
import { getSurvey, submitResponses } from "@/utils/api";
import { prepareAnswersForSubmit } from "@/helpers/submitAnswers";
import Chapter from "./components/Chapter";
import { Survey, Question, SubQuestion, Responses, GeographicResponse, SurveyResponse } from "@/types";
import {
  SurveyContainer,
  SurveyHeader,
  SurveyTitle,
  SurveyDescriptionName,
} from "@/styles/components/StyledSurvey";


const SurveyApp = memo(() => {

  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Responses>({});
  const [, setError] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [birthDate, setBirthDate] = useState<string>("");


  // Redirigir al login si el usuario no está autenticado
  useEffect(() => {
    const loadSurvey = async () => {
      try {
        if (!id) {
          handleError(
            "ID de la encuesta no definido. Es posible que el usuario no esté autenticado."
          );
  
          Swal.fire({
            icon: "warning",
            title: "Sesión requerida",
            text: "Debe iniciar sesión para acceder a la encuesta.",
            confirmButtonText: "Ir al login",
          }).then(() => {
            router.push("/login");
          });
  
          return;
        }
  
        const data = await getSurvey(Number(id));
        if (!data) {
          handleError(
            "No se encontraron datos para esta encuesta. Es posible que el usuario no esté autenticado."
          );
  
          Swal.fire({
            icon: "warning",
            title: "Sesión requerida",
            text: "Debe iniciar sesión para acceder a la encuesta.",
            confirmButtonText: "Ir al login",
          }).then(() => {
            router.push("/login");
          });
  
          return;
        }
  
        // Procesar encuesta con subpreguntas
        const surveyWithSubquestions = {
          ...data,
          questions: data.questions.map((q: Question) => ({
            ...q,
            subquestions: q.subquestions ?? [],
          })),
        };
  
        setSurvey(surveyWithSubquestions);
      } catch (error) {
        handleError("Error al cargar la encuesta:", error);
        setError(true);
      }
    };
  
    loadSurvey();
  }, [id, router]);

  if (!survey) return <p>Cargando datos de la encuesta...</p>;

  const currentChapter = (survey.chapters && currentChapterIndex < survey.chapters.length)
  ? survey.chapters[currentChapterIndex]
  : null;


  if (!currentChapter) {
    handleError("Error: currentChapter es null o undefined");

    Swal.fire({
      icon: "error",
      title: "Error al cargar el capítulo",
      text: "No se pudo cargar el capítulo. Por favor, recarga la página.",
      confirmButtonText: "Aceptar"
    }).then(() => {
      router.push("/surveys");
    });
  
    return null;
  }

  let chapterQuestions: Question[] = [];

  if (survey?.questions && currentChapter?.id) {
    try {
      chapterQuestions = survey.questions.filter((q: Question) => q.chapter === currentChapter.id);
    } catch (error) {
      handleError("Error al filtrar preguntas por capítulo:", error);
    }
  }


  const handleOptionChange = (
    questionId: string | number,
    value: string | number | number[] | GeographicResponse
  ) => {
    setResponses((prev: Responses) => {

      const numericQuestionId = typeof questionId === "string" ? parseInt(questionId, 10) : questionId;

      // Manejo especial para las respuestas tipo "Otro"
      if (typeof questionId === "string" && questionId.startsWith("other_")) {
        return {
          ...prev,
          [questionId]: value,
        };
      }

      if (questionId === 2) {
        if (typeof value === "string" || typeof value === "number") {
          const formattedDate = new Date(value).toISOString().split("T")[0];
          setBirthDate(formattedDate);
        } else {
          handleError("Error: El valor recibido para la fecha no es válido:", value);
        }
      }

      switch (numericQuestionId) {
        case 6: {
          const geoValue = value as GeographicResponse;
          return {
            ...prev,
            [numericQuestionId]: {
              ...(prev[numericQuestionId] as GeographicResponse ?? {}),
              option_selected: geoValue.option_selected ?? null,
              country: geoValue.country ?? null,
              department: geoValue.department ?? null,
              municipality: geoValue.municipality ?? null,
            } as GeographicResponse,
          };
        }

        case 8: {
          const geoValue = value as GeographicResponse;
          // Buscar la opción "Sí" en las opciones de la pregunta 8
          const yesOption = survey?.questions.find(q => q.id === 8)?.options?.find(opt => opt.text_option.toLowerCase() === "sí");
          const yesOptionId = yesOption ? yesOption.id : null;

          return {
            ...prev,
            [numericQuestionId]: {
              ...(prev[numericQuestionId] as GeographicResponse ?? {}),
              option_selected: geoValue.option_selected ?? null,
              // Solo agregar si la opción seleccionada es "Sí"
              ...(geoValue.option_selected === yesOptionId
                ? {
                  new_department: geoValue.new_department ?? null,
                  new_municipality: geoValue.new_municipality ?? null
                }
                : {})
            } as GeographicResponse
          };
        }

        case 11:
          return handleQuestion11Logic(prev, value);

        case 12:
          return handleQuestion12Logic(prev, value);

        default:
          if (Array.isArray(value)) {
            // Preguntas con selección múltiple (checkbox)
            return {
              ...prev,
              [numericQuestionId]: value.filter((v) => v !== null),
            };
          } else {
            // Preguntas de selección única (radio buttons)
            return {
              ...prev,
              [numericQuestionId]: value,
            };
          }
      }
    });
  };

  const handleFirstQuestionSubmit = async () => {
    // Captura la respuesta de la pregunta 1
    const firstQuestionResponse = responses[1];

    if (!survey?.id) {
      handleError("No se encontró el ID de la encuesta.");
      Swal.fire("Error", "No se pudo obtener la encuesta. Intente recargar la página.", "error");
      return;
    }

    if (!firstQuestionResponse) {
      Swal.fire({
        icon: "warning",
        title: "Debe responder la primera pregunta",
        text: "Por favor indique si ha vivido en Colombia antes de continuar.",
      });
      return;
    }

    if (firstQuestionResponse === 2) {
      try {
        // Guardar intento en la BD antes de mostrar la alerta
        const response = await submitResponses([
          {
            survey_id: survey.id,
            question_id: 1,
            option_selected: 2
          }
        ]);

        if (response?.rejected) {
          showRejectionNoColombia();
          return;
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        showRejectionNoColombia();
        return;
      }
    }

    if (firstQuestionResponse === 1) {

      // Guardar en el estado para enviarlo junto con la segunda pregunta
      setResponses((prev) => ({
        ...prev,
        1: firstQuestionResponse,
      }));

      // Si responde SÍ, mostrar la pregunta de fecha de nacimiento
      setShowSecondQuestion(true);
    }
  };

  // Método para mostrar el mensaje de rechazo para la pregunta 1 y redirigir
  const showRejectionNoColombia = async () => {
    const message = await getSystemMessage("rejection_no_colombia");
  
    if (!message) return;
  
    Swal.fire({
      icon: "error",
      title: message.title,
      html: message.content,
      confirmButtonText: "Aceptar",
    }).then(() => {
      router.push("/surveys");
    });
  };


  const handleBirthDateSubmit = async () => {
    if (!birthDate) {
      Swal.fire({
        icon: "warning",
        title: "Fecha de nacimiento requerida",
        text: "Debe seleccionar su fecha de nacimiento antes de continuar.",
      });
      return;
    }

    if (!survey?.id) {
      handleError("Error: No se encontró el ID de la encuesta.");
      Swal.fire("Error", "No se pudo obtener la encuesta. Intente recargar la página.", "error");
      return;
    }

    // Calcular la edad
    const birthYear = parseInt(birthDate.split("-")[0], 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    // Asegurar que la respuesta de la pregunta 1 se incluya
    const firstQuestionResponse = responses[1];

    if (!firstQuestionResponse) {
      handleError("Error: La pregunta 1 no tiene respuesta registrada.");
      Swal.fire("Error", "Debe responder si ha vivido en Colombia antes de continuar.", "error");
      return;
    }

    // Enviar ambas respuestas al backend
    const responsesToSubmit = [
      {
        survey_id: survey.id,
        question_id: 1,
        option_selected: typeof responses[1] === "number" ? responses[1] : null,
      },
      {
        survey_id: survey.id,
        question_id: 2,
        answer: birthDate,
      },
    ] as SurveyResponse[];

    if (age < 18) {
      try {
        const response = await submitResponses(responsesToSubmit);

        if (response?.rejected) {
          showRejectionUnderage();
          return;
        }
      } catch (error) {
        handleError("Error al registrar intento de encuesta:", error);
        showRejectionUnderage();
        return;
      }
    }

    // Solo avanza si la edad es >= 18
    setCurrentChapterIndex(1);
  };

  const showRejectionUnderage = async () => {
    const message = await getSystemMessage("rejection_underage");

    if (!message) return;

    Swal.fire({
      icon: "error",
      title: message.title,
      html: message.content,
      confirmButtonText: "Aceptar",
    }).then(() => {
      router.push("/surveys");
    });
  };

  const handleQuestion12Logic = (
    prevResponses: Responses,
    value: string | number | number[] | GeographicResponse
  ) => {
    const question12 = survey?.questions.find(q => q.id === 12);

    if (!question12 || !question12.options) return prevResponses;

    const noDiscriminationOption = question12.options.find(option =>
      option.text_option.trim().toLowerCase() === "no he sentido discriminación"
    );

    if (!noDiscriminationOption) return prevResponses;

    const noDiscriminationOptionId = noDiscriminationOption.id;

    if (typeof value === "number") {
      return {
        ...prevResponses,
        "12": value === noDiscriminationOptionId ? [noDiscriminationOptionId] : [value],
      };
    } else if (Array.isArray(value)) {
      return {
        ...prevResponses,
        "12": value.includes(noDiscriminationOptionId)
          ? [noDiscriminationOptionId]
          : value.filter(id => id !== noDiscriminationOptionId),
      };
    }

    return prevResponses;
  };

  const handleQuestion11Logic = (
    prevResponses: Responses,
    value: string | number | number[] | GeographicResponse
  ) => {
    const questionId = 11;
    const question11 = survey?.questions.find(q => q.id === questionId);

    if (!question11 || !question11.options) return prevResponses;

    const noDisabilityOption = question11.options.find(option =>
      option.text_option.trim().toLowerCase() === "no presenta ningún tipo de discapacidad"
    );

    if (!noDisabilityOption) return prevResponses;

    const noDisabilityOptionId = noDisabilityOption.id;

    // Si se selecciona "No presenta ningún tipo de discapacidad", se eliminan las demás opciones
    if (typeof value === "number") {
      return {
        ...prevResponses,
        [questionId]: value === noDisabilityOptionId ? [noDisabilityOptionId] : [value],
      };
    } else if (Array.isArray(value)) {
      return {
        ...prevResponses,
        [questionId]: value.includes(noDisabilityOptionId)
          ? [noDisabilityOptionId]
          : value.filter(id => id !== noDisabilityOptionId),
      };
    }

    return prevResponses;
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < survey.chapters.length - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      handleSubmit();
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 1) {
      setCurrentChapterIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const handleSubmit = async () => {

    if (!survey) {
      Swal.fire("Error", "No se pudo obtener la encuesta. Intente recargar la página.", "error");
      return;
    }

    // Obtener todas las preguntas de la encuesta
    const allQuestions = survey.questions;

    // Usar el helper para formatear las respuestas correctamente
    const formattedResponses = prepareAnswersForSubmit(survey, responses);

    // Identificar preguntas sin responder
    const unansweredQuestions = allQuestions.filter((q) => {
      if (q.question_type === "matrix" && Array.isArray(q.subquestions) && q.subquestions.length > 0) {
        // Verificar que todas las subpreguntas tengan respuestas
        return q.subquestions.some((sq: SubQuestion) => {

          // Ignora campos "Otro" opcionales (usando is_other)
          if (sq.is_other) {
            return false;
          }
          const response = responses[sq.id];

          return response === undefined || response === null;
        });
      } else {
        // Para preguntas normales, verifica la pregunta principal
        const response = responses[q.id];

        return response === undefined || response === null || (Array.isArray(response) && response.length === 0);
      }
    });

    // Si hay preguntas sin responder, mostrar un SweetAlert2 en lugar de error
    if (unansweredQuestions.length > 0) {
      const unansweredNumbers = unansweredQuestions.map(q => q.id).join(", ");

      Swal.fire({
        icon: "warning",
        title: "Faltan preguntas por responder",
        html: `Por favor, responde las siguientes preguntas antes de finalizar: <strong>${unansweredNumbers}</strong>`,
        confirmButtonText: "Aceptar",
      });

      return;
    }

    // Enviar respuestas al backend si todo está completo
    try {
      await submitResponses(formattedResponses);
      Swal.fire({
        icon: "success",
        title: "¡Gracias por hacer parte de App Diversa!",
        html: `
          <p style="text-align: justify;">
            Su participación es fundamental para generar un impacto positivo en la lucha contra la discriminación.
            Con sus respuestas, podremos identificar los desafíos que enfrentan diferentes grupos y trabajar en soluciones
            que hagan de nuestra sociedad un lugar más justo e inclusivo para todos.
          </p>
          <br>
          <p style="text-align: justify;">
            Si tiene algún comentario adicional o quiere seguir siendo parte de esta iniciativa, no dude en contactarnos.
          </p>
        `,
        confirmButtonText: "Aceptar",
      }).then(() => {
        router.push("/surveys");
      });
    } catch (error) {
      handleError("Error al enviar respuestas:", error);
      Swal.fire("Error", "Hubo un problema al enviar las respuestas. Intente de nuevo.", "error");
    }
  };

  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyTitle>{survey.name}</SurveyTitle>
        <SurveyDescriptionName className="space-y-2">
          <span className="block font-bold">{survey.description_title}</span>
        </SurveyDescriptionName>
        <SurveyDescriptionName className="space-y-2">
        <span>
          <strong>Definición de &quot;discriminación&quot;:</strong>
          {survey.description_name.replace(/Definición de\s*["“”]*discriminación["“”]*:\s*/i, '')}
        </span>
        </SurveyDescriptionName>
      </SurveyHeader>

      {/* Pregunta 1 - Residencia en Colombia */}
      {currentChapterIndex === 0 && !showSecondQuestion && currentChapter && (
        <Chapter
          chapter={currentChapter}
          questions={survey.questions.filter((q) => q.id === 1)}
          responses={responses}
          handleOptionChange={handleOptionChange}
          handleNextChapter={handleFirstQuestionSubmit}
          handlePrevChapter={handlePrevChapter}
          isFirstChapter={true}
          isLastChapter={false}
        />
      )}

      {/* Pregunta 2 - Fecha de nacimiento */}
      {currentChapterIndex === 0 && showSecondQuestion && currentChapter && (
        <Chapter
          chapter={currentChapter}
          questions={survey.questions.filter((q) => q.id === 2)}
          responses={responses}
          handleOptionChange={handleOptionChange}
          handleNextChapter={handleBirthDateSubmit}
          handlePrevChapter={handlePrevChapter}
          isFirstChapter={true}
          isLastChapter={false}
        />
      )}

      {/* Resto de capítulos */}
      {currentChapterIndex > 0 &&  currentChapter && (
        <Chapter
          chapter={currentChapter}
          questions={chapterQuestions}
          responses={responses}
          handleOptionChange={handleOptionChange}
          handleNextChapter={handleNextChapter}
          handlePrevChapter={handlePrevChapter}
          isFirstChapter={currentChapterIndex === 1}
          isLastChapter={currentChapterIndex === survey.chapters.length - 1}
        />
      )}
    </SurveyContainer>
  );
});

SurveyApp.displayName = "SurveyApp";

export default SurveyApp;
