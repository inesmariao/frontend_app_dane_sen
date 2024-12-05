"use client";

import React from "react";
import styled from "styled-components";
import { FaHome, FaUsers, FaClipboardList, FaEnvelope } from "react-icons/fa";

const NavWrapper = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      border-bottom: 0.0625rem solid #8269d2;

      &:last-child {
        border-bottom: none;
      }

      a {
        color: white;
        text-decoration: none;
        font-weight: normal;
        margin-left: 1rem;
        display: flex;
        align-items: center;

        &:hover {
          text-decoration: underline;
          background-color: #5c4aa1;
        }
      }

      svg {
        color: white;
        font-size: 1.2rem;
      }
    }
  }
`;

export const Nav: React.FC = () => (
  <NavWrapper>
    <ul>
      <li>
        <FaHome />
        <a href="#inicio">Inicio</a>
      </li>
      <li>
        <FaUsers />
        <a href="/register">Registro de Usuarios</a>
      </li>
      <li>
        <FaClipboardList />
        <a href="#encuestas">Encuestas</a>
      </li>
      <li>
        <FaEnvelope />
        <a href="#contacto">Contacto</a>
      </li>
    </ul>
  </NavWrapper>
);
