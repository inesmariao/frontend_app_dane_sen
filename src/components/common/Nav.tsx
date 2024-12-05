"use client";

import React from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

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

      &:hover {
        text-decoration: none;
        background-color: #5c4aa1; /* Color de fondo en hover */
      }

      a, span {
        color: white;
        text-decoration: none;
        font-weight: normal;
        margin-left: 1rem;
        display: flex;
        align-items: center;
        width: 100%;

        &:hover {
          text-decoration: none;
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

export const Nav: React.FC = () => {
  const { authData, logout } = useAuth(); // Obtenemos authData en lugar de user
  const user = authData?.user; // Extraemos el usuario de authData si existe

  return (
    <NavWrapper>
      <ul>
        <li>
          <FaHome />
          <a href="/surveys">Inicio</a>
        </li>
        <li>
          <FaUsers />
          <a href="/register">Registro de Usuarios</a>
        </li>
        {!user ? (
          // Mostrar la opción de Login solo si no hay un usuario autenticado
          <li>
            <FaSignInAlt />
            <a href="/login">Login</a>
          </li>
        ) : (
          // Mostrar la opción de Cerrar sesión si el usuario está autenticado
          <li onClick={logout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt />
            <span style={{ marginLeft: "1rem" }}>Cerrar sesión</span>
          </li>
        )}
        <li>
          <FaEnvelope />
          <a href="#contacto">Contacto</a>
        </li>
      </ul>
    </NavWrapper>
  );
};
