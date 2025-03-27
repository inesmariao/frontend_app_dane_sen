"use client";

import React from "react";
import styled from "styled-components";

const ButtonWithSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SpinnerCircle = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #e0d4f6;
  border-top: 2px solid #6b21a8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerText = styled.span`
  font-size: 0.875rem;
  color: #413087;
`;

interface Props {
  withText?: boolean; // Opcional: si quieres solo el círculo
}

const FormSpinner: React.FC<Props> = ({ withText = true }) => {
  return (
    <ButtonWithSpinnerWrapper>
      <SpinnerCircle />
      {withText && <SpinnerText>Procesando datos, un momento por favor...</SpinnerText>}
    </ButtonWithSpinnerWrapper>
  );
};

export default FormSpinner;
