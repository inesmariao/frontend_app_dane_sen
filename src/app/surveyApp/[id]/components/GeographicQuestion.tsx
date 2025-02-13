"use client";

import React, { useState, useEffect } from "react";
import apiClient from "@/utils/api";
import {
  OptionWrapper,
  OptionLabel,
  GeoContainer,
  GeoLabel,
  StyledSelect,
} from "@/styles/components/StyledSurvey";

interface GeographicQuestionProps {
  questionId: number;
  options: { id: number; text_option: string }[];
  responses: { [key: string]: number | string | number[] };
  handleOptionChange: (questionId: number | string, value: string | number | number[]) => void;
}

export const GeographicQuestion: React.FC<GeographicQuestionProps> = ({
  questionId,
  options,
  responses,
  handleOptionChange,
}) => {
  // Estados para almacenar datos geográficos
  const [countries, setCountries] = useState<{ id: number; spanish_name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: number; name: string; code: number }[]>([]);
  const [municipalities, setMunicipalities] = useState<{ code: number; name: string }[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState<boolean>(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null);

  // Encontrar las opciones de "Colombia" y "Otro país"
  const colombiaOption = options.find((option) => option.text_option.toLowerCase() === "colombia");
  const otherCountryOption = options.find((option) => option.text_option.toLowerCase() === "otro país");

  const isColombiaSelected = responses[questionId] === colombiaOption?.id;
  const isOtherCountrySelected = responses[questionId] === otherCountryOption?.id;

  // Cargar países al inicio con Axios
  useEffect(() => {
    apiClient.get("/geo/countries/")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => console.error("Error al cargar países:", error));
  }, []);

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
    if (selectedDepartment !== null) {
      setLoadingMunicipalities(true);

      const token = localStorage.getItem("authToken");

      apiClient.get(`/geo/municipalities/by-department/${selectedDepartment}/`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setMunicipalities(res.data.municipalities || []);
      })
      .catch((error) => {
        console.error("Error al cargar municipios:", error);
      })
      .finally(() => setLoadingMunicipalities(false));
    }
  }, [selectedDepartment]);

  return (
    <>
      {/* Opciones principales: Colombia / Otro País */}
      {options.map((option) => (
        <OptionWrapper key={option.id}>
          <input
            type="radio"
            id={`option-${option.id}`}
            name={`question-${questionId}`}
            value={option.id}
            checked={responses[questionId] === option.id}
            onChange={() => {
              handleOptionChange(questionId, option.id);
              setSelectedDepartment(null);
              setMunicipalities([]);
            }}
          />
          <OptionLabel htmlFor={`option-${option.id}`}>{option.text_option}</OptionLabel>
        </OptionWrapper>
      ))}

      {/* Si seleccionó Colombia, mostrar departamentos y municipios */}
      {isColombiaSelected && (
        <GeoContainer>
          <GeoLabel htmlFor="department-select">5.1 - Departamento - Municipio</GeoLabel>
          <StyledSelect
            id="department-select"
            value={selectedDepartment || ""}
            onChange={(e) => {
              const deptCode = Number(e.target.value);
              setSelectedDepartment(deptCode);
              setSelectedMunicipality(null);
              setMunicipalities([]);
              handleOptionChange("department", deptCode);
            }}
          >
            <option value="">- Selecciona un departamento -</option>
            {Array.isArray(departments) ? (
              departments.map((dept) => (
                <option key={dept.id} value={dept.code}>
                  {dept.name}
                </option>
              ))
            ) : (
              <option value="">No hay departamentos disponibles</option>
            )}
          </StyledSelect>

          {/* Mostrar municipios solo si hay un departamento seleccionado */}
          {selectedDepartment && !loadingMunicipalities ? (
            municipalities.length > 0 ? (
              <div>
                <label htmlFor="municipality">Seleccione un municipio:</label>
                <StyledSelect
                  id="municipality"
                  value={selectedMunicipality || ""}
                  onChange={(e) => {
                    const muniCode = Number(e.target.value);
                    setSelectedMunicipality(muniCode);
                    handleOptionChange("municipality", muniCode);
                  }}
                >
                  <option value="">-- Seleccione un municipio --</option>
                  {municipalities.map((municipality) => (
                    <option key={municipality.code} value={municipality.code}>{municipality.name}</option>
                  ))}
                </StyledSelect>
              </div>
            ) : (
              <p style={{ color: "red", fontSize: "1rem" }}>No hay municipios disponibles para este departamento.</p>
            )
          ) : null}

          {/* Mensaje de carga si los municipios aún no se han cargado */}
          {selectedDepartment && loadingMunicipalities && (
            <p style={{ fontSize: "1rem", color: "#2d8a88", marginTop: "0.5rem" }}>
              Cargando municipios...
            </p>
          )}
        </GeoContainer>
      )}

      {/* Si seleccionó otro país, mostrar la lista de países */}
      {isOtherCountrySelected && (
        <GeoContainer>
          <GeoLabel htmlFor="country-select">5.2 - País</GeoLabel>
          <StyledSelect
            id="country-select"
            value={typeof responses["country"] === "number" ? responses["country"] : ""}
            onChange={(e) => handleOptionChange("country", Number(e.target.value))}
          >
            <option value="">- Selecciona un país -</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.spanish_name}
              </option>
            ))}
          </StyledSelect>
        </GeoContainer>
      )}
    </>
  );
};
