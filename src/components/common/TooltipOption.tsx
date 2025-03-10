import React, { useState } from "react";
import { TooltipOptionProps } from "@/types";
import {
  TooltipWrapper,
  TooltipButton,
  TooltipInfoIconWrapper,
  TooltipInfoIcon,
  TooltipContainer
} from "@/styles/components/StyledSurvey";


const TooltipOption: React.FC<TooltipOptionProps> = ({ note = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Si `note` está vacío, solo mostramos el texto sin ícono ni tooltip
  if (!note.trim()) {
    return null;
  }

  return (
    <TooltipWrapper>
      <TooltipButton type="button" onClick={() => setShowTooltip(!showTooltip)}>
        <TooltipInfoIconWrapper>
          <TooltipInfoIcon />
        </TooltipInfoIconWrapper>
      </TooltipButton>

      {showTooltip && <TooltipContainer>{note}</TooltipContainer>}
    </TooltipWrapper>
  );
};

export default TooltipOption;
