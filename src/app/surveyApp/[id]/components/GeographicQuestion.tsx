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

  // Determinar si la pregunta es la 5 o la 7
  const isQuestionFive = questionId === 5;
  const isQuestionSeven = questionId === 7;

  const [countries, setCountries] = useState<{ id: number; spanish_name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: number; name: string; code: number }[]>([]);
  const [municipalities, setMunicipalities] = useState<{ id: number; name: string; code: number }[]>([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState<boolean>(false);

  const selectedCountry = (responses[questionId] as GeographicResponse)?.country ?? "";

  const selectedDepartment = isQuestionSeven
  ? (responses[questionId] as GeographicResponse)?.new_department ?? ""
  : (responses[questionId] as GeographicResponse)?.department ?? "";

  const selectedMunicipality = isQuestionSeven
  ? (responses[questionId] as GeographicResponse)?.new_municipality ?? ""
  : (responses[questionId] as GeographicResponse)?.municipality ?? "";

  // Encontrar las opciones de "Colombia" y "Otro país"
  const colombiaOption = options.find((option) => option.text_option.toLowerCase() === "colombia");
  const otherCountryOption = options.find((option) => option.text_option.toLowerCase() === "otro país");
  const yesOption = options.find((option) => option.text_option.toLowerCase() === "sí");

  const isColombiaSelected = (responses[questionId] as GeographicResponse)?.option_selected === colombiaOption?.id;
  const isOtherCountrySelected = (responses[questionId] as GeographicResponse)?.option_selected === otherCountryOption?.id;
  const isYesSelected = (responses[questionId] as GeographicResponse)?.option_selected === yesOption?.id;

  // Mostrar el selector de departamento solo si:
  // - En la pregunta 5, la opción "Colombia" está seleccionada
  // - En la pregunta 7, la opción "Sí" está seleccionada
  const showDepartmentSelector =
    (isQuestionFive && isColombiaSelected) || (isQuestionSeven && isYesSelected);

  // Mostrar el selector de país solo si:
  // - En la pregunta 5, la opción "Otro País" está seleccionada
  const showCountrySelector = isQuestionFive && isOtherCountrySelected;


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

  // Manejo del cambio de opción principal (Colombia u Otro País)
  const handleMainOptionChange = (optionId: number, optionText: string) => {
    let countryId: number | undefined = undefined;

    // Lógica para la pregunta 5 (Residencia actual)
    if (isQuestionFive) {
      if (optionText.toLowerCase() === "colombia") {
        const colombiaCountry = countries.find((c) => c.spanish_name.toLowerCase() === "colombia");
        countryId = colombiaCountry ? colombiaCountry.id : 0;

        handleOptionChange(questionId, {
          option_selected: optionId,
          country: countryId,
          department: undefined,
          municipality: undefined,
        });
      } else if (optionText.toLowerCase() === "otro país") {
        handleOptionChange(questionId, {
          option_selected: optionId,
          country: undefined,
          department: undefined,
          municipality: undefined,
        });
      }
    }

    // Lógica para la pregunta 7 (Cambio de residencia)
    if (isQuestionSeven) {
      handleOptionChange(questionId, {
        option_selected: optionId,
        new_department: null,
        new_municipality: null,
      });
    }

  };

  const handleDepartmentChange = (departmentId: number) => {
    if (isQuestionFive) {
      handleOptionChange(questionId, {
        option_selected: colombiaOption?.id ?? 0,
        country: countries.find((c) => c.spanish_name.toLowerCase() === "colombia")?.id,
        department: departmentId,
        municipality: undefined,
      });
    }

    if (isQuestionSeven) {
      handleOptionChange(questionId, {
        ...(responses[questionId] as GeographicResponse),
        new_department: departmentId,
        new_municipality: null,
      });
    }
  };

  const handleMunicipalityChange = (municipalityId: number) => {
    if (isQuestionFive) {
      handleOptionChange(questionId, {
        ...(responses[questionId] as GeographicResponse),
        municipality: municipalityId ?? null,
      });
    }

    if (isQuestionSeven) {
      handleOptionChange(questionId, {
        ...(responses[questionId] as GeographicResponse),
        new_municipality: municipalityId ?? null,
      });
    }
  };

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
            checked={(responses[questionId] as GeographicResponse)?.option_selected === option.id}
            onChange={() => handleMainOptionChange(option.id, option.text_option)}
          />
          <OptionLabel htmlFor={`option-${option.id}`}>{option.text_option}</OptionLabel>
        </OptionWrapper>
      ))}

      {/* Si seleccionó Colombia, mostrar departamentos y municipios */}
      {showDepartmentSelector && (
        <GeoContainer>
          <GeoLabel htmlFor="department-select">5.1 - Departamento - Municipio</GeoLabel>
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

            <label htmlFor="municipality">Seleccione un municipio:</label>
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


      {/* Si seleccionó otro país, mostrar la lista de países */}
      {showCountrySelector && (
        <GeoContainer>
          <GeoLabel htmlFor="country-select">5.2 - País</GeoLabel>
          <StyledSelect
            id="country-select"
            value={selectedCountry}
            onChange={(e) => {
              const countryId = Number(e.target.value);
              handleOptionChange(questionId, {
                option_selected: otherCountryOption?.id ?? 0,
                country: countryId,
                department: undefined,
                municipality: undefined,
              });
            }}
          >
            <option value="">- Selecciona un país -</option>
            {countries
              .filter((country) => !(isOtherCountrySelected && country.spanish_name.toLowerCase() === "colombia")) // Excluye a Colombia
              .map((country) => (
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
