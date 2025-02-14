"use client";

import React, { useState, useEffect } from "react";

import { getSurvey, submitResponses } from "@/utils/api";
import { useRouter, useParams } from "next/navigation";
import { LargeStyledButton } from "@/styles/components/StyledButtonVariants";
import { Survey, Chapter, Question } from "@/types";
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
  const id = params?.id;

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<{ [key: number]: number | string | number[] }>({});
  const [error, setError] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const router = useRouter();

  // Redirigir al login si el usuario no está autenticado
  useEffect(() => {
    const loadSurvey = async () => {
      try {
        if (!id) {
          console.error("ID de la encuesta no definido.");
          return;
        }

        const data = await getSurvey(Number(id));
        setSurvey(data);

      } catch (error: unknown) {
        // Validar si el error es una instancia de Error
        if (error instanceof Error) {
          console.error("Error al cargar la encuesta:", error.message);

          // Validar mensaje de error y redirigir si es necesario
          if (error.message.includes("UNAUTHORIZED")) {
            router.push("/login");
          } else {
            setError(true);
          }
        } else {
          console.error("Error desconocido al cargar la encuesta");
          setError(true);
        }
      }
    };
    loadSurvey();
  }, [id, router]);

  if (error) {
    return <p>Ocurrió un error al cargar la encuesta.</p>;
  }

  if (!survey) {
    return <p>Cargando datos de la encuesta...</p>;
  }

  const handleOptionChange = (questionId: string | number, value: string | number | number[]) => {
    setResponses((prev) => {
      const questionKey = String(questionId);

      if (questionId === 11) {
        const question11 = survey?.questions.find(q => q.id === 11);

        if (!question11 || !question11.options) return prev;

        const noDiscriminationOption = question11.options.find(option =>
          option.text_option.trim().toLowerCase() === "no he sentido discriminación"
        );

        if (!noDiscriminationOption) return prev;
        const noDiscriminationOptionId = noDiscriminationOption.id;

        let updatedSelections: number[] = Array.isArray(prev[questionId])
          ? [...(prev[questionId] as number[])]
          : [];

        if (typeof value === 'number') { // value es un número (ID de opción)
          const isNoDiscrimination = value === noDiscriminationOptionId;

          if (isNoDiscrimination) {
            // Si se selecciona "No he sentido discriminación", limpiar las demás selecciones.
            updatedSelections = [noDiscriminationOptionId];
          } else {
            // Si se selecciona otra opción y "No he sentido discriminación" está seleccionado, deseleccionarlo.
            if (updatedSelections.includes(noDiscriminationOptionId)) {
              updatedSelections = updatedSelections.filter(id => id !== noDiscriminationOptionId);
            }

            // Actualizar las selecciones normalmente.
            if (updatedSelections.includes(value)) {
              updatedSelections = updatedSelections.filter(id => id !== value);
            } else {
              updatedSelections.push(value);
            }
          }
        } else if (Array.isArray(value)) { // value es un array (selecciones múltiples)
          const noDiscriminationSelected = value.includes(noDiscriminationOptionId);

          if (noDiscriminationSelected) {
            // Si "No he sentido discriminación" está seleccionado, limpiar las demás selecciones.
            updatedSelections = [noDiscriminationOptionId];
          } else {
            // Si se deselecciona "No he sentido discriminación", se permite seleccionar otras opciones.
            updatedSelections = value.filter(id => id !== noDiscriminationOptionId);
          }
        }

        return { ...prev, [questionId]: updatedSelections };
      }

      return { ...prev, [questionId]: value };
    });
  };


  const handleNextChapter = () => {
    if (currentChapter < 3) {
      setCurrentChapter((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
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
    // Verificar si hay preguntas sin responder.
    const unansweredQuestions = survey.questions.filter((q: Question) => {
      const response = responses[q.id];
      return (
        response === undefined ||
        (Array.isArray(response) && response.length === 0)
      );
    });

    if (unansweredQuestions.length > 0) {
      alert("Por favor responde todas las preguntas.");
      return;
    }

    // Formatear las respuestas antes de enviarlas al backend.
    const formattedResponses = Object.entries(responses).map(([key, value]) => {
      const questionId = String(key); // Asegurar que questionId es un string

      if (questionId.startsWith("other_")) {
        return {
          question_id: parseInt(questionId.replace("other_", ""), 10),
          other_response: value, // Enviar respuesta de "Otro" al backend
        };
      }

      return {
        question_id: parseInt(questionId, 10),
        ...(Array.isArray(value)
          ? { options_multiple_selected: value }
          : { option_selected: value }),
      };
    });

    try {
      const response = await submitResponses(formattedResponses);
      console.log("Respuestas enviadas:", response);
    } catch (error: any) {
      console.error("Error al enviar respuestas:", error.message);
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
          <strong>Definición de "discriminación":</strong> {survey.description_name.replace('Definición de "discriminación":', '')}
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
