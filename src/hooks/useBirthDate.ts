import { useEffect, useState } from "react";
import { Responses } from "@/types";
import { handleError } from "@/utils/errorHandling";

export const useBirthDate = (responses: Responses) => {
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    const birthDateValue = responses[2];

    if (birthDateValue) {
      if (typeof birthDateValue === "string" || typeof birthDateValue === "number") {
        const formatted = new Date(birthDateValue).toISOString().split("T")[0];
        setBirthDate(formatted);
      } else {
        handleError("El valor de fecha no es válido:", birthDateValue);
        setBirthDate("");
      }
    } else {
      setBirthDate("");
    }
  }, [responses]);

  return { birthDate, setBirthDate };
};
