import React, { useState, useEffect } from "react";
import { DateSelectorProps } from "@/types";
import { DateSelectWrapper, DateStyledSelect } from "@/styles/components/StyledSurvey";

const DateSelector: React.FC<DateSelectorProps> = ({ questionId, onChange }) => {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const months = [
    { name: "Enero", value: "01" },
    { name: "Febrero", value: "02" },
    { name: "Marzo", value: "03" },
    { name: "Abril", value: "04" },
    { name: "Mayo", value: "05" },
    { name: "Junio", value: "06" },
    { name: "Julio", value: "07" },
    { name: "Agosto", value: "08" },
    { name: "Septiembre", value: "09" },
    { name: "Octubre", value: "10" },
    { name: "Noviembre", value: "11" },
    { name: "Diciembre", value: "12" }
  ];

  // Generar años desde 110 años atrás hasta el actual
  const years = Array.from({ length: 111 }, (_, i) => (currentYear - i).toString());

  // Filtrar los meses si el usuario selecciona el año actual
  const availableMonths = year === currentYear.toString()
    ? months.slice(0, currentMonth) // Solo los meses transcurridos
    : months;

  // Actualizar los días disponibles cuando se cambia el año o el mes
  useEffect(() => {
    if (year && month) {
      let daysInSelectedMonth = new Date(Number(year), Number(month), 0).getDate();

      // Si el usuario selecciona el año y mes actual, solo mostrar los días pasados
      if (year === currentYear.toString() && Number(month) === currentMonth) {
        daysInSelectedMonth = currentDay;
      }

      setDaysInMonth(Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1));
      setDay(""); // Importante: Resetear el día al cambiar año o mes


    }
  }, [year, month]);

  // Formatear y enviar la fecha cuando los tres valores están seleccionados
  useEffect(() => {
    if (year && month && day) {
      const formattedDate = `${year}-${month}-${day.padStart(2, "0")}`;

      onChange(questionId, formattedDate);
    }
  }, [year, month, day]);

  return (
    <DateSelectWrapper>
      {/* Selector de Año (Primero) */}
      <DateStyledSelect
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          setMonth(""); // Resetear el mes al cambiar el año
          setDay("");   // Resetear el día al cambiar el año
        }}
      >
        <option value="">Año</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </DateStyledSelect>

      {/* Selector de Mes (Segundo, habilitado solo si hay año) */}
      <DateStyledSelect
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
          setDay(""); // Resetear el día al cambiar el mes
        }}
        disabled={!year}
      >
        <option value="">Mes</option>
        {availableMonths.map((m) => (
          <option key={m.value} value={m.value}>{m.name}</option>
        ))}
      </DateStyledSelect>

      {/* Selector de Día (Tercero, habilitado solo si hay año y mes) */}
      <DateStyledSelect value={day} onChange={(e) => setDay(e.target.value)} disabled={!year || !month}>
        <option value="">Día</option>
        {daysInMonth.map((d) => (
          <option key={d} value={d.toString()}>{d}</option>
        ))}
      </DateStyledSelect>
    </DateSelectWrapper>
  );
};

export default DateSelector;
