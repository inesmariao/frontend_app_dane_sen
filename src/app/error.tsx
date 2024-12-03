"use client";

import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <>
      <div>
        <h1>Ocurrió un error:</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Intentar de nuevo</button>
      </div>
    </>
  );
};

export default ErrorComponent;
