"use client";

import React from "react";
import styled from "styled-components";
import LoginForm from "@/components/users/LoginForm";
import Head from "next/head";

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(77, 74, 74, 0.5);

  @media (max-width: 768px) {
    margin-bottom: 6px;
    font-size: 1.2rem;
  }
`;

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Iniciar Sesión - AppDiversa</title>
        <meta name="description" content="Iniciar Sesión - AppDiversa" />
      </Head>
      <Title>Iniciar Sesión</Title>
      <LoginForm />
    </>
  );
};

export default LoginPage;
