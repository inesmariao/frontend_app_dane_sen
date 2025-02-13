"use client";

import React from 'react';
import styled from "styled-components";
import RegisterForm from '@/components/users/RegisterForm';
import Head from "next/head";

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(77, 74, 74, 0.5);

  @media (max-width: 768px) {
    margin-bottom: 6px;
    font-size: 1.2rem; /* Título más pequeño en pantallas pequeñas */
  }
`;

const RegisterPage: React.FC = () => {
  return (
    <>
      <Head>
          <title>Registro de Usuarios</title>
          <meta name="description" content="Registro de Usuarios" />
      </Head>
      <Title>Registro de Usuarios</Title>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
