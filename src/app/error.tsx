"use client";

import React from "react";
import Head from "next/head";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="Se produjo un error en la aplicación." />
      </Head>
      <div>
        <h1>Ocurrió un error:</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Intentar de nuevo</button>
      </div>
    </>
  );
};

export default ErrorComponent;
