"use client";

import React, { useState, useEffect, useCallback  } from "react";
import { GeographicQuestionProps, GeographicResponse } from "@/types";
import apiClient from "@/utils/api";
import { handleError } from "@/utils/errorHandling";
import {
  GeoContainer,
  GeoLabel,
  StyledSelect,
} from "@/styles/components/StyledSurvey";

export const GeographicQuestion: React.FC<GeographicQuestionProps> = ({
  questionId,
  options,
  responses,
  handleOptionChange,
}) => {
  // Estados para almacenar datos geográficos

  // Determinar si la pregunta es la 6 o la 8
  const isQuestionSix = questionId === 6;
  const isQuestionEight = questionId === 8;

  const [departments, setDepartments] = useState<{ id: number; name: string; code: number }[]>([]);
  const [municipalities, setMunicipalities] = useState<{ id: number; name: string; code: number }[]>([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState<boolean>(false);
  const selectedResponse = responses[questionId] as GeographicResponse;
  const selectedDepartment = (responses[questionId] as GeographicResponse)?.department ?? "";
  const selectedMunicipality = (responses[questionId] as GeographicResponse)?.municipality ?? "";

  // Verificar si la opción seleccionada es "Sí" (solo para pregunta 8)
  const yesOption = options?.find((option) => option.text_option.toLowerCase() === "sí");
  const isYesSelected = (responses[questionId] as GeographicResponse)?.option_selected === yesOption?.id;

  // Determinar si se deben mostrar los selectores de departamento y municipio
  const showSelectors = isQuestionSix || (isQuestionEight && isYesSelected);

  // Manejadores de cambio en selectores
  const handleDepartmentChange = useCallback(
    (departmentId: number) => {
      const updatedResponse: GeographicResponse = {
        ...selectedResponse,
        department: departmentId,
        municipality: null,
      };
      handleOptionChange(questionId, updatedResponse);
    },
    [handleOptionChange, questionId, selectedResponse]
  );

  const handleMunicipalityChange = useCallback(
    (municipalityId: number) => {
      const updatedResponse: GeographicResponse = {
        ...selectedResponse,
        municipality: municipalityId,
      };
      handleOptionChange(questionId, updatedResponse);
    },
    [handleOptionChange, questionId, selectedResponse]
  );

  const currentResponse = responses[questionId] as GeographicResponse;

  useEffect(() => {
  const selectedOption = currentResponse?.option_selected;

  if (typeof selectedOption === "number" && !currentResponse?.country) {
    const updatedResponse: GeographicResponse = {
      ...currentResponse,
      option_selected: selectedOption,
    };
    handleOptionChange(questionId, updatedResponse);
  }
}, [handleOptionChange, questionId, currentResponse]);


  // Cargar departamentos
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await apiClient.get("/geo/departments/");
        setDepartments(res.data);
      } catch (error) {
        if (error instanceof Error) {
          handleError(error.message);
        } else {
          handleError("Error desconocido al cargar departamentos.");
        }
      }
    };

    fetchDepartments();
  }, []);

  // Cargar municipios cuando se selecciona un departamento
  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (selectedDepartment) {
        setLoadingMunicipalities(true);
        try {
          const res = await apiClient.get(
            `/geo/municipalities/by-department/${selectedDepartment}/`
          );
          setMunicipalities(res.data.municipalities ?? []);
        } catch (error) {
          if (error instanceof Error) {
            handleError(error.message);
          } else {
            handleError("Error desconocido al cargar municipios.");
          }
        } finally {
          setLoadingMunicipalities(false);
        }
      } else {
        setMunicipalities([]);
      }
    };

    fetchMunicipalities();
  }, [selectedDepartment]);







  return (
    <>
      {showSelectors && (
        <GeoContainer>
          <GeoLabel htmlFor="department-select">
            {isQuestionSix ? "6.1 - Departamento" : "8.1 - Departamento"}
          </GeoLabel>
          <StyledSelect
            id="department-select"
            value={selectedDepartment ?? ""}
            onChange={(e) => handleDepartmentChange(Number(e.target.value))}
          >
            <option value="">- Selecciona un departamento -</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </StyledSelect>

          {/* Mostrar municipios cuando haya un departamento seleccionado */}
          {selectedDepartment && (
            <>
            <label htmlFor="municipality-select">Seleccione un municipio:</label>
              {loadingMunicipalities ? (
                <p style={{ fontSize: "1rem", color: "#2d8a88" }}>Cargando municipios...</p>
              ) : (
                <StyledSelect
                  id="municipality-select"
                  value={selectedMunicipality ?? ""}
                  onChange={(e) => handleMunicipalityChange(Number(e.target.value))}
                >
                  <option value="">-- Seleccione un municipio --</option>
                  {municipalities.map((municipality) => (
                    <option key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </option>
                  ))}
                </StyledSelect>
              )}
            </>
          )}
        </GeoContainer>
      )}
    </>
  );
};
