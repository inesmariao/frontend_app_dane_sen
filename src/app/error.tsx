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
    </>
  );
};

export default ErrorComponent;
