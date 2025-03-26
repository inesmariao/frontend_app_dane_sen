import React, { useState, useRef, useEffect } from "react";
import { TooltipOptionProps } from "@/types";
import {
  TooltipWrapper,
  TooltipButton,
  TooltipInfoIconWrapper,
  TooltipInfoIcon,
  TooltipContainer,
} from "@/styles/TooltipStyles";

const TooltipOption: React.FC<TooltipOptionProps> = ({ note = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [positionClass, setPositionClass] = useState("center");
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setShowTooltip((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTooltip &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const padding = 10;

      if (rect.left < padding) {
        setPositionClass("right");
      } else if (rect.right > window.innerWidth - padding) {
        setPositionClass("left");
      } else {
        setPositionClass("center");
      }
    }
  }, [showTooltip]);

  if (!note.trim()) return null;

  return (
    <TooltipWrapper>
      <TooltipButton ref={buttonRef} type="button" onClick={handleClick}>
        <TooltipInfoIconWrapper>
          <TooltipInfoIcon />
        </TooltipInfoIconWrapper>
      </TooltipButton>

      {showTooltip && (
        <TooltipContainer ref={tooltipRef} className={positionClass}>
          {note}
        </TooltipContainer>
      )}
    </TooltipWrapper>
  );
};

export default TooltipOption;
