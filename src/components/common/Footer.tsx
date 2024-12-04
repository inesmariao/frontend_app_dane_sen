"use client";

import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FooterContainer = styled.footer`
  background-color: #413087;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
    padding: 1rem;
  }

  @media (min-width: 1440px) {
    font-size: 1.2rem;
    padding: 1.5rem;
  }
`;

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <FooterContainer {...props}>
      <p>&copy; {new Date().getFullYear()} App Diversa - DANE - SEN. Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;