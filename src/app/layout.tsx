"use client";

import Head from "next/head";
import { useEffect } from "react";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider } from "@/styles/theme/ThemeContext";
import GlobalStyles from "@/styles/theme/GlobalStyles";
import theme from "@/styles/theme/theme";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TitleWrapper = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: #413087;
  line-height: 1;
  margin: 20px 0 15px 192px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 20px 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin: 10px 1rem;
  }
`;


const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* useEffect(() => {
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
      const ReactAxe = require("@axe-core/react");
      const React = require("react");
      ReactAxe(React, window, 1000);
    }
  }, []); */

  return (
    <html lang="es">
      <Head>
        <title>App Diversa</title>
        <meta name="description" content="Encuesta de App Diversa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <StyledThemeProvider theme={theme}>
              <GlobalStyles />
              <LayoutWrapper>
                <Header />
                <TitleWrapper>App Diversa</TitleWrapper>
                <MainContent>{children}</MainContent>
                <Footer />
              </LayoutWrapper>
            </StyledThemeProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
