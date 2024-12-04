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
      padding: 0.75rem 1.5rem; /* Espaciado interno */
      border-bottom: 1px solid #8269d2; /* Línea de separación entre opciones */

      &:last-child {
        border-bottom: none; /* Elimina la línea de la última opción */
      }

      a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        margin-left: 1rem; /* Espacio entre el icono y el texto */
        display: flex;
        align-items: center;

        &:hover {
          text-decoration: underline; /* Subrayado al pasar el cursor */
        }
      }

      svg {
        color: white; /* Color del icono */
        font-size: 1.2rem; /* Tamaño del icono */
      }
    }
  }
`;

export const Nav: React.FC = () => (
  <NavWrapper>
    <ul>
      <li>
        <FaHome /> {/* Icono de inicio */}
        <a href="#inicio">Inicio</a>
      </li>
      <li>
        <FaUsers /> {/* Icono de registro de usuarios */}
        <a href="/register">Registro de Usuarios</a>
      </li>
      <li>
        <FaClipboardList /> {/* Icono de encuestas */}
        <a href="#encuestas">Encuestas</a>
      </li>
      <li>
        <FaEnvelope /> {/* Icono de contacto */}
        <a href="#contacto">Contacto</a>
      </li>
    </ul>
  </NavWrapper>
);