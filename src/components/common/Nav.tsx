import React from "react";
import styled from "styled-components";

const NavWrapper = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    padding: 0;
    margin: 0;

    li a {
      color: white;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Nav: React.FC = () => (
  <NavWrapper aria-label="Barra de navegación">
    <ul>
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#encuestas">Encuestas</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </NavWrapper>
);
