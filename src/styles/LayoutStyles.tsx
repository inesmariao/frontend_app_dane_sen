"use client";

import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url("/assets/images/fondo_app_diversa_2276.png") no-repeat center center;
  background-size: cover;
`;

export const TitleWrapper = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: #413087;
  line-height: 1;
  margin: 20px 0 29.5px 192px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 20px 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin: 10px 1rem;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
