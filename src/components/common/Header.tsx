"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Nav } from "./Nav";

const HeaderContainer = styled.header`
  background-color: #413087;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 116px;

  @media (max-width: 768px) {
    height: 80px;
    padding: 0.5rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .logo-sen {
    width: 110px;
    height: 53px;
    margin: 0 37px;

    @media (max-width: 768px) {
      width: 70px;
      height: 35px;
      margin: 0 10px;
    }
  }

  .logo-dane {
    width: 116px;
    height: 50px;
    margin: 0 0 3px 37px;

    @media (max-width: 768px) {
      width: 75px;
      height: 35px;
      margin: 0 10px;
    }
  }
`;


const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 24px;
  width: 30px;

  div {
    width: 30px;
    height: 3px;
    background-color: white;

    @media (max-width: 768px) {
      width: 20px;
      height: 2px;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; /* Coloca el menú justo debajo del botón hamburguesa */
  left: 0; /* Alinea el menú con el lado izquierdo del botón */
  background-color: #413087; /* Mantiene el color del Header */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 0;
  display: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para resaltar el menú */
  z-index: 1000;

  &.open {
    display: block; /* Muestra el menú cuando está abierto */
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column; /* Asegura que las opciones se apilen verticalmente */

    li a {
      display: block;
      padding: 0.75rem 1.5rem; /* Espaciado para los enlaces */
      color: white; /* Texto blanco */
      text-decoration: none;
      font-weight: bold;

      &:hover {
        background-color: #8269d2; /* Fondo más oscuro al pasar el cursor */
        text-decoration: none;
      }
    }
  }
`;


export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <MenuButton aria-label="Abrir menú de navegación" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </MenuButton>
      <LogoContainer>
        <Image src="/assets/images/logo-sen.png" className="logo-sen" alt="Logo SEN"  width={110} height={53} priority/>
        <Image src="/assets/images/logo-dane.png" className="logo-dane" alt="Logo DANE" width={116} height={50} priority/>
      </LogoContainer>
      <DropdownMenu ref={menuRef} className={isMenuOpen ? "open" : ""}>
        <Nav />
      </DropdownMenu>
    </HeaderContainer>
  );
}
