import styled, { css } from "styled-components";

interface AccessibilityProps {
  $isContrast: boolean;
  $isExpanded?: boolean;
}

export const AccessibilityBar = styled.div<{
  $isContrast: boolean;
  $isExpanded: boolean;
}>`
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  z-index: 1000;
  padding: 5px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;

  ${({ $isContrast }) =>
    $isContrast &&
    css`
      background-color: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
    `}

  @media (max-width: 768px) {
    transform: translateY(-50%) scale(${({ $isExpanded }) => ($isExpanded ? 1 : 0)});
    opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
    pointer-events: ${({ $isExpanded }) => ($isExpanded ? "auto" : "none")};
    gap: 4px;
  }
`;

export const AccessibilityButton = styled.button<AccessibilityProps & { disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 48px;
  height: 48px;

  background: ${({ $isContrast }) => ($isContrast ? "#d39d3f" : "#2d8a88")};
  color: ${({ $isContrast }) => ($isContrast ? "black" : "white")};

  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: width 0.3s ease-in-out, background 0.3s, color 0.3s;
  white-space: nowrap;
  padding: 0 12px;
  overflow: hidden;
  position: relative;
  font-weight: bold;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};


  &:hover {
    width: 220px;
    background: ${({ $isContrast }) => ($isContrast ? "#b3812d" : "#227a7a")};
    box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 24px !important;
    font-weight: bold;
    color: ${({ $isContrast }) => ($isContrast ? "black" : "white")} !important;
    margin-right: 8px;
    flex-shrink: 0;
    position: absolute;
    left: 12px;
    visibility: visible !important;
    opacity: 1 !important;
  }

  span {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    visibility: hidden;
    margin-left: 35px;
    font-weight: bold;
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;

    &:hover {
      width: 140px;
    }

    svg {
      font-size: 16px !important;
      left: 6px;
    }

    span {
      font-size: 12px;
      margin-left: 24px;
    }
  }

`;

export const AccessibilityLink = styled(AccessibilityButton).attrs({ as: "a" })<AccessibilityProps>`
  text-decoration: none;
`;

export const MobileToggleButton = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 2000;
  background-color: rgba(0, 74, 173, 0.6);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  font-size: 20px;
  display: none;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background-color: rgba(0, 74, 173, 0.8);
  }
`;

export const applyFontSize = (size: string) => {
  if (typeof window !== "undefined") {
    document.body.style.fontSize = size;
    document.documentElement.style.fontSize = size;
  }
};

export const TooltipWrapper = styled.div`
  position: fixed;
  bottom: 60px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2000;

  &:hover span {
    opacity: 1;
    transform: translateY(-8px);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export const TooltipText = styled.span`
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  margin-top: 6px;
  opacity: 0;
  transform: translateY(0);
  transition: opacity 0.2s ease, transform 0.2s ease;
`;

