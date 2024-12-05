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
  height: 5rem;

  @media (max-width: 48rem) {
    height: 3rem;
    padding: 0.5rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .logo-sen {
    width: 5rem;
    height: 3rem;
    margin: 0 2.3125rem;

    @media (max-width: 48rem) {
      width: 4rem;
      height: 1.6rem;
      margin: 0 0.625rem;
    }
  }

  .logo-dane {
    width: 5rem;
    height: 3rem;
    margin: 0 0 0.1875rem 2.3125rem;

    @media (max-width: 48rem) {
      width: 4rem;
      height: 1.6rem;
      margin: 0 0.625rem;
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
  height: 1.5rem;
  width: 1.875rem;

  div {
    width: 1.875rem;
    height: 0.1875rem;
    background-color: white;

    @media (max-width: 48rem) {
      width: 1.25rem;
      height: 0.125rem;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #413087;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 0.5rem 0; /* Ajusta el padding para reducir espacio */
  display: none;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &.open {
    display: block;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem; /* Reducir padding en pantallas pequeñas */
      border-bottom: 0.0625rem solid #8269d2;

      &:last-child {
        border-bottom: none;
      }

      a, span {
        color: white;
        text-decoration: none;
        font-weight: normal;
        margin-left: 1rem;
        display: flex;
        align-items: center;
        font-size: 0.9rem; /* Tamaño base del texto */

      }

      svg {
        color: white;
        font-size: 1.2rem; /* Tamaño base de los íconos */
      }
    }
  }

  @media (max-width: 480px) {
    ul li {
      padding: 0.3rem 0.6rem; /* Más compacto en pantallas pequeñas */
      a, span {
        font-size: 0.7rem; /* Texto más pequeño */
      }
      svg {
        font-size: 1rem; /* Íconos más pequeños */
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0; /* Reducir el padding general */
    ul li {
      padding: 0.4rem 0.8rem; /* Reducir padding entre elementos */
      a, span {
        font-size: 0.7rem; /* Disminuir tamaño del texto */
      }
      svg {
        font-size: 1rem; /* Disminuir tamaño del ícono */
      }
    }
  }


`;


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Alternar el estado del menú
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest("button") // Ignorar clics en el botón del menú hamburguesa
    ) {
      setIsMenuOpen(false); // Cerrar el menú si se hace clic fuera
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
        <Image
          src="/assets/images/logo-sen.png"
          className="logo-sen"
          alt="Logo SEN"
          width={110}
          height={53}
          priority
        />
        <Image
          src="/assets/images/logo-dane.png"
          className="logo-dane"
          alt="Logo DANE"
          width={116}
          height={50}
          priority
        />
      </LogoContainer>
      <DropdownMenu ref={menuRef} className={isMenuOpen ? "open" : ""}>
        <Nav />
      </DropdownMenu>
    </HeaderContainer>
  );
}
