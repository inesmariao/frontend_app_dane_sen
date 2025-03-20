import React, { useState, useRef, useEffect } from "react";
import { TooltipOptionProps } from "@/types";
import {
  TooltipWrapper,
  TooltipButton,
  TooltipInfoIconWrapper,
  TooltipInfoIcon,
  TooltipContainer,
} from "@/styles/components/StyledSurvey";

const TooltipOption: React.FC<TooltipOptionProps> = ({ note = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setShowTooltip(!showTooltip);
  };

  const handleClickOutside = (event: MouseEvent) => { //Cambio aqui
    if (
      showTooltip &&
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    if (showTooltip) {
      document.addEventListener("click", handleClickOutside); //Cambio aqui
    } else {
      document.removeEventListener("click", handleClickOutside); //Cambio aqui
    }

    return () => {
      document.removeEventListener("click", handleClickOutside); //Cambio aqui
    };
  }, [showTooltip]);

  // Si `note` está vacío, solo mostramos el texto sin ícono ni tooltip
  if (!note.trim()) {
    return null;
  }

  return (
    <TooltipWrapper>
      <TooltipButton type="button" onClick={handleClick}>
        <TooltipInfoIconWrapper>
          <TooltipInfoIcon />
        </TooltipInfoIconWrapper>
      </TooltipButton>

      {showTooltip && (
        <TooltipContainer ref={tooltipRef}>
          {note}
        </TooltipContainer>
      )}
    </TooltipWrapper>
  );
};

export default TooltipOption;