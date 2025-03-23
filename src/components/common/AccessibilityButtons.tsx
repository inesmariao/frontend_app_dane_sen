import React, { useState, useEffect } from "react";
import { useAccessibility } from "@/hooks/useAccessibility";
import {
  AccessibilityBar,
  AccessibilityButton,
  AccessibilityLink,
} from "@/styles/accessibilityStyles";
import {
  AiOutlineBgColors,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineReload,
} from "react-icons/ai";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";

const AccessibilityButtons = () => {
  const { toggleContrast, increaseFontSize, decreaseFontSize, resetAccessibility } =
    useAccessibility();

  const [isContrast, setIsContrast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Detecta cambios en la clase "contrast" y actualiza el estado
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth <= 480);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const updateContrastState = () => {
      setIsContrast(document.body.classList.contains("contrast"));
    };

    updateContrastState();
    const observer = new MutationObserver(updateContrastState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <AccessibilityBar $isContrast={isContrast} $isExpanded={isExpanded}>
      {isMobile && (
        <AccessibilityButton
          onClick={toggleExpand}
          $isContrast={isContrast}
          style={{ zIndex: 1001 }}
        >
          {isExpanded ? "✕" : "☰"}
        </AccessibilityButton>
      )}
      <AccessibilityButton onClick={toggleContrast} $isContrast={isContrast}>
        <AiOutlineBgColors />
        <span>Alto Contraste</span>
      </AccessibilityButton>
      <AccessibilityButton onClick={increaseFontSize} $isContrast={isContrast}>
        <AiOutlinePlus />
        <span>Aumentar Letra</span>
      </AccessibilityButton>
      <AccessibilityButton onClick={decreaseFontSize} $isContrast={isContrast}>
        <AiOutlineMinus />
        <span>Disminuir Letra</span>
      </AccessibilityButton>
      <AccessibilityButton onClick={resetAccessibility} $isContrast={isContrast}>
        <AiOutlineReload />
        <span>Restablecer Cambios</span>
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
  );
};

export default AccessibilityButtons;