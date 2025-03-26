"use client";

import React, { useState, useEffect } from "react";
import { useAccessibility } from "@/hooks/useAccessibility";
import {
  AccessibilityBar,
  AccessibilityButton,
  AccessibilityLink,
  MobileToggleButton,
  TooltipWrapper,
  TooltipText
} from "@/styles/accessibilityStyles";
import {
  AiOutlineBgColors,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineReload,
  AiOutlineMenu
} from "react-icons/ai";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";

const AccessibilityButtons = () => {
  const {
    toggleContrast,
    increaseFontSize,
    decreaseFontSize,
    resetAccessibility,
    canIncreaseFontSize,
    canDecreaseFontSize
  } = useAccessibility();

  const [isContrast, setIsContrast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      setIsExpanded(!isMobile);
    }
  }, []);

  useEffect(() => {
    setIsContrast(document.body.classList.contains("contrast"));
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <AccessibilityBar $isContrast={isContrast} $isExpanded={isExpanded}>
        <AccessibilityButton onClick={toggleContrast} $isContrast={isContrast}>
          <AiOutlineBgColors />
          <span>Alto Contraste</span>
        </AccessibilityButton>
        <AccessibilityButton
          onClick={increaseFontSize}
          $isContrast={isContrast}
          disabled={!canIncreaseFontSize}
          title={
            !canIncreaseFontSize
              ? "Tamaño máximo alcanzado en este dispositivo"
              : "Aumentar letra"
          }
        >
          <AiOutlinePlus />
          <span>Aumentar Letra</span>
        </AccessibilityButton>

        <AccessibilityButton
          onClick={decreaseFontSize}
          $isContrast={isContrast}
          disabled={!canDecreaseFontSize}
          title={
            !canDecreaseFontSize
              ? "Tamaño mínimo alcanzado en este dispositivo"
              : "Disminuir letra"
          }
        >
          <AiOutlineMinus />
          <span>Disminuir Letra</span>
        </AccessibilityButton>
        <AccessibilityButton onClick={resetAccessibility} $isContrast={isContrast}>
          <AiOutlineReload />
          <span>Restablecer</span>
        </AccessibilityButton>
        <AccessibilityLink
          href="https://centroderelevo.gov.co/632/w3-propertyvalue-15252.html"
          target="_blank"
          rel="noopener noreferrer"
          $isContrast={isContrast}
        >
          <FaAmericanSignLanguageInterpreting />
          <span>Centro de Relevo</span>
        </AccessibilityLink>
      </AccessibilityBar>

      <TooltipWrapper>
        <MobileToggleButton onClick={toggleExpand}>
          <AiOutlineMenu />
        </MobileToggleButton>
        <TooltipText>Mostrar accesibilidad</TooltipText>
      </TooltipWrapper>
    </>
  );
};

export default AccessibilityButtons;
