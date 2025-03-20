"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getSurvey, submitResponses } from "@/utils/api";
import Chapter from "./components/Chapter";
import { Survey, Question, Responses, GeographicResponse, SurveyResponse } from "@/types";
import {
  SurveyContainer,
  SurveyHeader,
  SurveyTitle,
  SurveyDescriptionName,
} from "@/styles/components/StyledSurvey";


const SurveyApp: React.FC = () => {

  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Responses>({});
  const [error, setError] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [birthDate, setBirthDate] = useState<string>("");

  // Redirigir al login si el usuario no está autenticado
  useEffect(() => {
    const loadSurvey = async () => {

      console.log("📊 Encuesta cargada:", survey); // Debug


      try {
        if (!id) {
          throw new Error("ID de la encuesta no definido.");
        }

        const data = await getSurvey(Number(id));
        if (!data) {
          throw new Error("No se encontraron datos para esta encuesta.");
        }

        const surveyWithSubquestions = {
          ...data,
          questions: data.questions.map((q: Question) => ({
            ...q,
            subquestions: q.subquestions ?? []
          }))
        };

        setSurvey(surveyWithSubquestions);

      } catch (error) {
        console.error("Error al cargar la encuesta:", error);
        setError(true);
      }
    };
    loadSurvey();
  }, [id]);

  if (error) return <p>Ocurrió un error al cargar la encuesta.</p>;

  if (!survey) return <p>Cargando datos de la encuesta...</p>;

  const handleOptionChange = (
    questionId: string | number,
    value: string | number | number[] | GeographicResponse
  ) => {
    setResponses((prev: Responses) => {
      const numericQuestionId = typeof questionId === "string" ? parseInt(questionId, 10) : questionId;
      console.log(`✅ Guardando respuesta para pregunta ${questionId}:`, value); // Debug


      // Manejo especial para las respuestas tipo "Otro"
      if (typeof questionId === "string" && questionId.startsWith("other_")) {
        return {
          ...prev,
          [questionId]: value,
        };
      }

      if (questionId === 2) {
        console.log("📌 Respuesta de la pregunta 2 (antes de formatear):", value); // Debug
        if (typeof value === "string" || typeof value === "number") {
          const formattedDate = new Date(value).toISOString().split("T")[0];
          console.log(`📆 Fecha formateada en 'handleOptionChange':`, formattedDate); // Debug
          setBirthDate(formattedDate);
        } else {
          console.error("❌ Error: El valor recibido para la fecha no es válido:", value); // Debug
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
          return {
            ...prev,
            [numericQuestionId]: {
              ...(prev[numericQuestionId] as GeographicResponse ?? {}),
              option_selected: geoValue.option_selected ?? null,
              new_department: geoValue.new_department ?? null,
              new_municipality: geoValue.new_municipality ?? null,
            } as GeographicResponse,
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
        console.error("Error: No se encontró el ID de la encuesta.");
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
                showRejectionMessage1();
                return;
            }

        } catch (error) {
            showRejectionMessage1();
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
const showRejectionMessage1 = () => {
    Swal.fire({
        icon: "error",
        title: "No puede continuar",
        html: `
        <p style="text-align: justify;">
            Agradecemos su interés en participar en esta encuesta, sin embargo, hemos notado que no cumple con el perfil, ya que la encuesta está dirigida a personas que residan en Colombia en los últimos 5 años.
        </p>
        <br>
        <p style="text-align: justify;">
            Le invitamos a participar en futuras encuestas que puedan ser de su interés.
        </p>
        <br>
        <p><strong>Gracias por su comprensión.</strong></p>
        `,
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
      console.error("Error: No se encontró el ID de la encuesta.");
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
    console.error("Error: La pregunta 1 no tiene respuesta registrada.");
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
            showRejectionMessage2();
            return;
        }

    } catch (error) {
        console.error("Error al registrar intento de encuesta:", error);
        showRejectionMessage2();
        return;
    }
  }

  // Solo avanza si la edad es >= 18
  setCurrentChapterIndex(1);
};



const showRejectionMessage2 = () => {
  Swal.fire({
      icon: "error",
      title: "No puede continuar",
      html: `
      <p style="text-align: justify;">
          Agradecemos su interés en participar en esta encuesta, sin embargo, hemos notado que no cumple con el perfil, ya que la encuesta está dirigida a personas mayores de 18 años que residan en Colombia en los últimos 5 años.
      </p>
      <br>
      <p style="text-align: justify;">
          Le invitamos a participar en futuras encuestas que puedan ser de su interés.
      </p>
      <br>
      <p><strong>Gracias por su comprensión.</strong></p>
      `,
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
    const question11 = survey?.questions.find(q => q.id === 11);

    if (!question11 || !question11.options) return prevResponses;

    const noDisabilityOption = question11.options.find(option =>
      option.text_option.trim().toLowerCase() === "no presento ningún tipo de discapacidad"
    );

    if (!noDisabilityOption) return prevResponses;

    const noDisabilityOptionId = noDisabilityOption.id;

    if (typeof value === "number") {
      return {
        ...prevResponses,
        "11": value === noDisabilityOptionId ? [noDisabilityOptionId] : [value],
      };
    } else if (Array.isArray(value)) {
      return {
        ...prevResponses,
        "11": value.includes(noDisabilityOptionId)
          ? [noDisabilityOptionId]
          : value.filter(id => id !== noDisabilityOptionId),
      };
    }

    return prevResponses;
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < survey.chapters.length) {
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
    console.log("📌 Enviando respuestas:", responses); // Debug

    // Obtener todas las preguntas y subpreguntas
    const allQuestions = survey.questions.flatMap(q => {
      if (q.question_type === "matrix" && q.subquestions) {
        return [q, ...q.subquestions]; // Incluir la pregunta matriz y sus subpreguntas
      }
      return q;
    });

    // Identificar preguntas sin responder
    const unansweredQuestions = allQuestions.filter((q) => {
      if ("subquestions" in q && q.subquestions?.length) {
        return q.subquestions.some(sq => {
          const response = responses[sq.id];
          return response === undefined || (Array.isArray(response) && response.length === 0);
        });
      } else {
        const response = responses[q.id];
        return response === undefined || (Array.isArray(response) && response.length === 0);
      }
    });

    if (unansweredQuestions.length > 0) {
      alert("Por favor responde todas las preguntas antes de continuar.");
      // Debug
      console.log("❌ Preguntas sin responder:",
        unansweredQuestions.map(q => "text_question" in q ? q.text_question : q.text_subquestion)
      );
      return;
    }

    // Formateo de respuestas
    const formattedResponses: SurveyResponse[] = survey.questions.map((question) => {
      const response = responses[question.id];

      // Preguntas tipo matriz (con subpreguntas)
      if (question.question_type === "matrix" && question.subquestions?.length) {
        return {
          question_id: question.id,
          subquestions: question.subquestions.map((subq) => ({
            subquestion_id: subq.id,
            option_selected: responses[subq.id] ?? null,
          })),
        };
      }

      // Asegura que la pregunta 8 envíe "new_department" y "new_municipality"
      if (question.id === 8) {
        const geoResponse = response as GeographicResponse ?? {};
        return {
          question_id: question.id,
          option_selected: geoResponse.option_selected ?? null,
          new_department: geoResponse.new_department ?? null,
          new_municipality: geoResponse.new_municipality ?? null,
        };
      }

      // Preguntas geográficas (con campos especiales como "country")
      if (question.is_geographic && typeof response === "object" && !Array.isArray(response)) {
        const geoResponse = response as GeographicResponse ?? {};
        return {
          question_id: question.id,
          option_selected: typeof geoResponse.option_selected === "number" ? geoResponse.option_selected : null,
          country: geoResponse.country ?? null,
          department: geoResponse.department ?? null,
          municipality: geoResponse.municipality ?? null,
        };
      }

      // Preguntas abiertas
      if (question.question_type === "open") {
        return {
          question_id: question.id,
          answer: typeof response === "string" ? response : response?.toString() ?? null,
        };
      }

      // Preguntas cerradas de selección múltiple
      if (question.question_type === "closed" && question.is_multiple) {
        return {
          question_id: question.id,
          options_multiple_selected: Array.isArray(response)
            ? response.filter((id) => typeof id === "number")
            : [],
        };
      }

      // Preguntas cerradas de selección única
      if (question.question_type === "closed" && !question.is_multiple) {
        return {
          question_id: question.id,
          option_selected: typeof response === "number" ? response : null,
        };
      }

      return { question_id: question.id, option_selected: null };
    });

    // ✅ Debug: Mostrar resumen antes de enviar
    console.log("📌 Resumen de respuestas a enviar:", formattedResponses);
    alert("Respuestas guardadas correctamente. Revisa la consola para ver el resumen.");
    // ✅ Debug
    console.log("✅ Datos a enviar:", JSON.stringify(formattedResponses, null, 2));

    // Enviar respuestas
    try {
      await submitResponses(formattedResponses);
      Swal.fire("¡Gracias!", "Tus respuestas han sido enviadas con éxito.", "success").then(() =>
        router.push("/surveys")
      );
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
      Swal.fire("Error", "Hubo un problema al enviar tus respuestas. Intenta de nuevo.", "error");
    }
  };

  const currentChapter = survey.chapters?.[currentChapterIndex] ?? null;
  const chapterQuestions = survey.questions.filter((q) => q.chapter === currentChapter.id);


  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyTitle>{survey.name}</SurveyTitle>
        <SurveyDescriptionName className="space-y-2">
          <span className="block font-bold">{survey.description_title}</span>
        </SurveyDescriptionName>
        <SurveyDescriptionName className="space-y-2">
          <span>
            <strong>Definición de "discriminación":</strong>
            {survey.description_name.replace(/Definición de\s?[“”"]?discriminación[“”"]?:/i, '')}
          </span>
        </SurveyDescriptionName>
      </SurveyHeader>

      {/* Pregunta 1 - Residencia en Colombia */}
      {currentChapterIndex === 0 && !showSecondQuestion && (
        <Chapter
          chapter={currentChapter}
          chapterName={currentChapter.name}
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
      {currentChapterIndex === 0 && showSecondQuestion && (
        <Chapter
          chapter={currentChapter}
          chapterName={currentChapter.name}
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
      {currentChapterIndex > 0 && (
        <Chapter
          chapter={currentChapter}
          chapterName={currentChapter.name}
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
};

export default SurveyApp;