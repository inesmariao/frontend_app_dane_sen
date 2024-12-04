"use client";

import styled from "styled-components";
import Image from "next/image";

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

export default function Header() {
  return (
    <HeaderContainer>
      <MenuButton aria-label="Abrir menú de navegación">
        <div></div>
        <div></div>
        <div></div>
      </MenuButton>
      <LogoContainer>
        <Image src="/assets/images/logo-sen.png" className="logo-sen" alt="Logo SEN"  width={110} height={53} priority/>
        <Image src="/assets/images/logo-dane.png" className="logo-dane" alt="Logo DANE" width={116} height={50} priority/>
      </LogoContainer>
    </HeaderContainer>
  );
}
