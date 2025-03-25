import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const TooltipWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const TooltipOptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TooltipButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const TooltipInfoIconWrapper = styled.div`
  width: 1.5rem;
  height: 1.8rem;
  border-radius: 0.3rem;
  background-color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TooltipInfoIcon = styled(AiOutlineInfoCircle)`
  width: 1.2rem;
  height: 1.2rem;
  color: white;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  padding: 0.75rem;
  background-color: #1d4ed8;
  color: white;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;

  /* Mobile (por defecto) */
  max-width: 90vw;
  min-width: 60vw;

  /* Web (más ancho) */
  @media (min-width: 768px) {
    max-width: 600px;
    min-width: 300px;
    font-size: 1.3rem;
  }

  /* Posicionamiento responsivo para bordes */
  &.left {
    left: auto;
    right: 0;
  }

  &.right {
    left: 0;
    right: auto;
  }

  &.center {
    left: 0;
    right: auto;
  }
`;


