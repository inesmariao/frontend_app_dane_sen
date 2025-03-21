"use client";

import React, { useState, useEffect } from "react";
import { GeographicQuestionProps, GeographicResponse } from "@/types";
import apiClient from "@/utils/api";
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

  const selectedDepartment = isQuestionEight
  ? (responses[questionId] as GeographicResponse)?.new_department ?? ""
  : (responses[questionId] as GeographicResponse)?.department ?? "";

  const selectedMunicipality = isQuestionEight
  ? (responses[questionId] as GeographicResponse)?.new_municipality ?? ""
  : (responses[questionId] as GeographicResponse)?.municipality ?? "";

  // Verificar si la opción seleccionada es "Sí" (solo para pregunta 8)
  const yesOption = options?.find((option) => option.text_option.toLowerCase() === "sí");
  const isYesSelected = (responses[questionId] as GeographicResponse)?.option_selected === yesOption?.id;

  // Determinar si se deben mostrar los selectores de departamento y municipio
  const showSelectors = isQuestionSix || (isQuestionEight && isYesSelected);

  // Cargar departamentos
  useEffect(() => {
    apiClient.get("/geo/departments/")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((error) => console.error("Error al cargar departamentos:", error));
  }, []);

  // Cargar municipios cuando se selecciona un departamento
  useEffect(() => {
    if (selectedDepartment) {
      setLoadingMunicipalities(true); // Mostrar "Cargando..." mientras se obtienen municipios
      apiClient.get(`/geo/municipalities/by-department/${selectedDepartment}/`)
        .then((res) => setMunicipalities(res.data.municipalities ?? []))
        .catch((error) => console.error("Error al cargar municipios:", error))
        .finally(() => setLoadingMunicipalities(false));
    } else {
      setMunicipalities([]);
    }
  }, [selectedDepartment]);

  // Manejadores de cambio en selectores
  const handleDepartmentChange = (departmentId: number) => {
    const updatedResponse: GeographicResponse = {
      ...(responses[questionId] as GeographicResponse),
      department: isQuestionSix ? departmentId : undefined,
      municipality: null,
      new_department: isQuestionEight ? departmentId : undefined,
      new_municipality: null,
    };
    handleOptionChange(questionId, updatedResponse);
  };

  const handleMunicipalityChange = (municipalityId: number) => {
    const updatedResponse: GeographicResponse = {
      ...(responses[questionId] as GeographicResponse),
      municipality: isQuestionSix ? municipalityId : undefined,
      new_municipality: isQuestionEight ? municipalityId : undefined,
    };
    handleOptionChange(questionId, updatedResponse);
  };

  return (
    <>
      {showSelectors && (
        <GeoContainer>
          <GeoLabel htmlFor="department-select">
            {isQuestionSix ? "6.1 - Departamento" : "8.1 - Nuevo Departamento"}
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
