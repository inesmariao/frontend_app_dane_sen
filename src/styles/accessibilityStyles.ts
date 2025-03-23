import styled, { css } from "styled-components";

interface AccessibilityProps {
  $isContrast: boolean;
  $isExpanded?: boolean;
}

export const AccessibilityButton = styled.button<AccessibilityProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 48px;
  height: 48px;

  background: ${({ $isContrast }) => ($isContrast ? "#004aad" : "#2d8a88")};
  color: ${({ $isContrast }) => ($isContrast ? "white" : "white")};

  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: width 0.3s ease-in-out, background 0.3s, color 0.3s;
  white-space: nowrap;
  padding: 0 12px;
  overflow: hidden;
  position: relative;
  font-weight: bold;

  &:hover {
    width: 220px;
    background: ${({ $isContrast }) => ($isContrast ? "#003b82" : "#227a7a")};
    box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 24px !important;
    font-weight: bold;
    color: ${({ $isContrast }) => ($isContrast ? "white" : "white")} !important;
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

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    padding: 0px;

    svg {
      font-size: 18px !important;
      left: 8px;
    }

    span {
      font-size: 0.8rem;
      margin-left: 30px;
    }

    &:hover {
      width: 160px;
    }
  }
`;

export const AccessibilityLink = styled(AccessibilityButton).attrs({ as: "a" })<AccessibilityProps>`
  text-decoration: none;
`;

export const applyFontSize = (size: string) => {
  if (typeof window !== "undefined") {
    document.body.style.fontSize = size;
    document.documentElement.style.fontSize = size;
  }
};

export const AccessibilityBar = styled.div<AccessibilityProps>`
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 1000;
  padding: 5px;
  margin: 10px;
  gap: 8px;

  ${({ $isContrast }) =>
    $isContrast &&
    css`
      top: 50vh;
    `}

  // SOLO para móviles: barra contraíble manualmente
  @media (max-width: 480px) {
    right: 0;

    ${AccessibilityButton}, ${AccessibilityLink} {
      transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
      max-height: ${({ $isExpanded }) => ($isExpanded ? "40px" : "0")};
      opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
      transform: ${({ $isExpanded }) =>
        $isExpanded ? "translateX(0)" : "translateX(100%)"};
      pointer-events: ${({ $isExpanded }) => ($isExpanded ? "auto" : "none")};
    }
  }
`;