"use client";

import React from 'react';
import styled from "styled-components";
import RegisterForm from '@/components/users/RegisterForm';
import Head from "next/head";

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 6px;
    font-size: 1.5rem; /* Título más pequeño en pantallas pequeñas */
  }
`;

const RegisterPage: React.FC = () => {
  return (
    <>
      <Head>
          <title>Registro de Usuarios - AppDiversa</title>
          <meta name="description" content="Registro de Usuarios - AppDiversa" />
      </Head>
      <Title>Registro de Usuarios</Title>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
