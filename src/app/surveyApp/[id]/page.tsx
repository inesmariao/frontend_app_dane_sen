"use client";

import React, { useState, useEffect } from "react";

import { getSurvey, submitResponses } from "@/utils/api";
import { useParams } from "next/navigation";
import { LargeStyledButton } from "@/styles/components/StyledButtonVariants";
import { Survey, Chapter, Question, Responses, GeographicResponse, SurveyResponse } from "@/types";
import {
  SurveyContainer,
  SurveyHeader,
  SurveyTitle,
  SurveyDescriptionName,
  ButtonContainer
} from "@/styles/components/StyledSurvey";
import ChapterOne from "@/app/surveyApp/[id]/components/ChapterOne";
import ChapterTwo from "@/app/surveyApp/[id]/components/ChapterTwo";
import ChapterThree from "@/app/surveyApp/[id]/components/ChapterThree";



const SurveyApp: React.FC = () => {

  const params = useParams();
  const id = params?.id ? Number(params.id) : null;


  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Responses>({});
  const [error, setError] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);

  // Redirigir al login si el usuario no está autenticado
  useEffect(() => {
    const loadSurvey = async () => {
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

  if (error) {
    return <p>Ocurrió un error al cargar la encuesta.</p>;
  }

  if (!survey) {
    return <p>Cargando datos de la encuesta...</p>;
  }

  const handleOptionChange = (
    questionId: string | number,
    value: string | number | number[] | GeographicResponse
  ) => {
    setResponses((prev: Responses) => {
      const numericQuestionId = typeof questionId === "string" ? parseInt(questionId, 10) : questionId;
  
      switch (numericQuestionId) {
        case 5: {
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
  
        case 7: {
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
  
        case 10:
          return handleQuestion10Logic(prev, value);
  
        case 11:
          return handleQuestion11Logic(prev, value);
  
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


  const handleQuestion11Logic = (
    prevResponses: Responses,
    value: string | number | number[] | GeographicResponse
  ) => {
    const question11 = survey?.questions.find(q => q.id === 11);

    if (!question11 || !question11.options) return prevResponses;

    const noDiscriminationOption = question11.options.find(option =>
      option.text_option.trim().toLowerCase() === "no he sentido discriminación"
    );

    if (!noDiscriminationOption) return prevResponses;

    const noDiscriminationOptionId = noDiscriminationOption.id;

    // Debug
    /*let updatedSelections: number[] = Array.isArray(prevResponses["11"])
      ? [...(prevResponses["11"] as number[])]
      : [];*/

      if (typeof value === "number") {
        return {
          ...prevResponses,
          "11": value === noDiscriminationOptionId ? [noDiscriminationOptionId] : [value],
        };
      } else if (Array.isArray(value)) {
        return {
          ...prevResponses,
          "11": value.includes(noDiscriminationOptionId)
            ? [noDiscriminationOptionId]
            : value.filter(id => id !== noDiscriminationOptionId),
        };
      }

    return prevResponses;
  };

  const handleQuestion10Logic = (
    prevResponses: Responses,
    value: string | number | number[] | GeographicResponse
  ) => {
    const question10 = survey?.questions.find(q => q.id === 10);

    if (!question10 || !question10.options) return prevResponses;

    const noDisabilityOption = question10.options.find(option =>
      option.text_option.trim().toLowerCase() === "no presento ningún tipo de discapacidad"
    );

    if (!noDisabilityOption) return prevResponses;

    const noDisabilityOptionId = noDisabilityOption.id;

    // Debug
    /*let updatedSelections: number[] = Array.isArray(prevResponses["10"])
      ? [...(prevResponses["10"] as number[])]
      : [];*/

      if (typeof value === "number") {
        return {
          ...prevResponses,
          "10": value === noDisabilityOptionId ? [noDisabilityOptionId] : [value],
        };
      } else if (Array.isArray(value)) {
        return {
          ...prevResponses,
          "10": value.includes(noDisabilityOptionId)
            ? [noDisabilityOptionId]
            : value.filter(id => id !== noDisabilityOptionId),
        };
      }

    return prevResponses;
  };

  const handleNextChapter = () => {
    if (currentChapter < 3) {
      setCurrentChapter((prev) => prev + 1);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      handleSubmit();
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const handleSubmit = async () => {
    console.log("📌 Estado actual de respuestas:", responses); // Debug

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

      // Asegura que la pregunta 7 envíe "new_department" y "new_municipality"
      if (question.id === 7) {
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
        const response = await submitResponses(formattedResponses); // Llama a la API con las respuestas formateadas
        console.log("✅ Respuestas enviadas con éxito:", response);
        alert("Respuestas enviadas correctamente. ¡Gracias por completar la encuesta!");
    } catch (error: unknown) {
        console.error("Error al enviar respuestas:", error);
        alert("Hubo un error al enviar las respuestas. Por favor, intenta de nuevo.");
    }
};

  const chapterOneQuestions = survey.questions.filter(
    (q: Question) => q.chapter === 1
  );
  const chapterTwoQuestions = survey.questions.filter(
    (q: Question) => q.chapter === 2
  );
  const chapterThreeQuestions = survey.questions.filter(
    (q: Question) => q.chapter === 3
  );


  const chapterWithIdOne = (survey.chapters as Chapter[]).find(
    (chapter) => chapter.id === 1
  );
  const chapterWithIdTwo = (survey.chapters as Chapter[]).find(
    (chapter) => chapter.id === 2
  );
  const chapterWithIdThree = (survey.chapters as Chapter[]).find(
    (chapter) => chapter.id === 3
  );

  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyTitle>{survey.name}</SurveyTitle>
        <SurveyDescriptionName>
        <strong>Definición de &quot;discriminación&quot;:</strong> {survey.description_name.replace(/Definición de\s?&quot;discriminación&quot;:/i, '')}
        </SurveyDescriptionName>
      </SurveyHeader>

      {currentChapter === 1 && (
        <ChapterOne
          questions={chapterOneQuestions}
          responses={responses}
          handleOptionChange={handleOptionChange}
          chapterName={chapterWithIdOne?.name || "Capítulo 1"}
        />
      )}
      {currentChapter === 2 && (
        <ChapterTwo
          questions={chapterTwoQuestions}
          responses={responses}
          handleOptionChange={handleOptionChange}
          chapterName={chapterWithIdTwo?.name || "Capítulo 2"}
        />
      )}
      {currentChapter === 3 && (
        <ChapterThree
          questions={chapterThreeQuestions}
          responses={responses}
          handleOptionChange={handleOptionChange}
          chapterName={chapterWithIdThree?.name || "Capítulo 3"}
        />
      )}

      <ButtonContainer>
        {currentChapter > 1 && (
          <LargeStyledButton onClick={handlePrevChapter} style={{ marginRight: "1rem" }} >
            ← Retroceder
          </LargeStyledButton>
        )}

        <LargeStyledButton onClick={handleNextChapter}>
          {currentChapter < 3 ? "Siguiente →" : "Enviar y Finalizar"}
        </LargeStyledButton>
      </ButtonContainer>
    </SurveyContainer>
  );
};

export default SurveyApp;
