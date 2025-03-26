"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
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
        background-color: #5c4aa1;
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

export const Nav: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const auth = useAuth();
  const user = auth?.authData?.user;

  const handleLogout = () => {
    auth?.logout();
    closeMenu();
  };

  return (
    <NavWrapper>
      <ul>
        <li onClick={closeMenu}>
          <FaHome />
          <Link href="/">Inicio</Link>
        </li>
        <li onClick={closeMenu}>
          <FaUsers />
          <Link href="/register">Registro de Usuarios</Link>
        </li>
        {!user ? (
          // Mostrar la opción de Login solo si no hay un usuario autenticado
          <li onClick={closeMenu}>
            <FaSignInAlt />
            <Link href="/login">Login</Link>
          </li>
        ) : (
          // Mostrar la opción de Cerrar sesión si el usuario está autenticado
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt />
            <span style={{ marginLeft: "1rem" }}>Cerrar sesión</span>
          </li>
        )}
        <li onClick={closeMenu}>
          <FaEnvelope />
          <Link href="/contact">Contacto</Link>
        </li>
      </ul>
    </NavWrapper>
  );
};
