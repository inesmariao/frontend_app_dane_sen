"use client";

import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #413087;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  height: 2.5rem;

  @media (max-width: 48rem) {
    font-size: 0.7rem;
    height: 2rem;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      &copy; {new Date().getFullYear()} DANE - SEN - App Diversa
    </FooterContainer>
  );
}
