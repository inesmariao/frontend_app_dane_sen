"use client";

import React, { useState, useEffect } from "react";
import { GeographicQuestionProps, GeographicResponse } from "@/types";
import apiClient from "@/utils/api";
import {
  OptionWrapper,
  OptionLabel,
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

  const [countries, setCountries] = useState<{ id: number; spanish_name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: number; name: string; code: number }[]>([]);
  const [municipalities, setMunicipalities] = useState<{ id: number; name: string; code: number }[]>([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState<boolean>(false);

  const selectedDepartment = isQuestionEight
  ? (responses[questionId] as GeographicResponse)?.new_department ?? ""
  : (responses[questionId] as GeographicResponse)?.department ?? "";

  const selectedMunicipality = isQuestionEight
  ? (responses[questionId] as GeographicResponse)?.new_municipality ?? ""
  : (responses[questionId] as GeographicResponse)?.municipality ?? "";

  const yesOption = options?.find((option) => option.text_option.toLowerCase() === "sí");
  const isYesSelected = (responses[questionId] as GeographicResponse)?.option_selected === yesOption?.id;

  // Mostrar el selector de departamento solo si:
  // - En la pregunta 6, la opción "Colombia" está seleccionada
  // - En la pregunta 8, la opción "Sí" está seleccionada
  const showDepartmentSelectorQS = isQuestionSix;
  const showDepartmentSelectorQE = (isQuestionEight && isYesSelected);
  


  // Cargar países al inicio
  useEffect(() => {
    apiClient.get("/geo/countries/")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => console.error("Error al cargar países:", error));
  }, []);

  // Cargar departamentos
  useEffect(() => {
    console.log(`📥 Cargando departamentos para la pregunta ${questionId}, seleccionado: ${selectedDepartment}`); // Debug

    apiClient.get("/geo/departments/")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((error) => console.error("Error al cargar departamentos:", error));
  }, []);

  // Cargar municipios cuando se selecciona un departamento
  useEffect(() => {
    console.log(`📥 Cargando municipios para la pregunta ${questionId}, departamento seleccionado: ${selectedDepartment}`); // Debug

    
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

  // Manejo del cambio de opción principal (Colombia u Otro País)
  const handleMainOptionChange = (optionId: number, optionText: string) => {

    // Lógica para la pregunta 8 (Cambio de residencia)
    if (isQuestionEight) {
      handleOptionChange(questionId, {
        option_selected: optionId,
        new_department: null,
        new_municipality: null,
      });
    }
  };

  const handleDepartmentChange = (departmentId: number) => {
    if (isQuestionSix) {
      const geographicResponse: GeographicResponse = {
        option_selected: (responses[questionId] as GeographicResponse)?.option_selected ?? 0,
        country: 572,
        department: departmentId,
        municipality: null,
      };
      handleOptionChange(questionId, geographicResponse);
    } else if (isQuestionEight) {
      const geographicResponse: GeographicResponse = {
        option_selected: (responses[questionId] as GeographicResponse)?.option_selected ?? 0,
        country: 572,
        new_department: departmentId,
        new_municipality: null,
      };
      handleOptionChange(questionId, geographicResponse);
    }
  };

  const handleMunicipalityChange = (municipalityId: number) => {
    if (isQuestionSix) {
      handleOptionChange(questionId, {
        ...(responses[questionId] as GeographicResponse),
        municipality: municipalityId ?? null,
      });
    } else if (isQuestionEight) {
      handleOptionChange(questionId, {
        ...(responses[questionId] as GeographicResponse),
        new_municipality: municipalityId ?? null,
      });
    }
  };

  console.log(`🗺 GeographicQuestion renderizada para la pregunta ${questionId}`); // Debug
  console.log("📊 Estado de responses en GeographicQuestion:", responses); // Debug


  return (
    <>
      {/* Si seleccionó Pregunta 6, mostrar departamentos y municipios */}
      {showDepartmentSelectorQS && (
        <GeoContainer>
          <GeoLabel htmlFor="department-select">6.1 - Departamento - Municipio</GeoLabel>
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
