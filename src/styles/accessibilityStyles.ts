import styled, { css } from "styled-components";

interface AccessibilityProps {
  $isContrast: boolean;
}

export const AccessibilityBar = styled.div<AccessibilityProps>`
  position: fixed;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  z-index: 1000;
  padding: 5px;
  margin: 10px;
  font-size: 1rem;

  ${({ $isContrast }) =>
    $isContrast
      ? css`
          top: 50vh;
          transform: translateY(-50%);
        `
      : css`
          top: 50%;
          transform: translateY(-50%);
        `}
`;

export const AccessibilityButton = styled.button<AccessibilityProps>`
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