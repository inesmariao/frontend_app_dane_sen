import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getSurvey } from "@/utils/api";
import { Survey, Question } from "@/types";
import { handleError } from "@/utils/errorHandling";

export const useSurveyData = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [, setError] = useState(false);

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        if (!id) {
          handleError("ID de la encuesta no definido.");
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

        const data = await getSurvey(id);
        if (!data) {
          handleError("No se encontraron datos para esta encuesta.");
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

  return { survey, id };
};
