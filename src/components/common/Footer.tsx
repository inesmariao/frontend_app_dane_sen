"use client";

import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #413087;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
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