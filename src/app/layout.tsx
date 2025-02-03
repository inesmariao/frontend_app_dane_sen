"use client";

import Head from "next/head";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider } from "@/styles/theme/ThemeContext";
import GlobalStyles from "@/styles/theme/GlobalStyles";
import theme from "@/styles/theme/theme";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import styled from "styled-components";
import { AuthProvider } from "@/context/AuthContext";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TitleWrapper = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #413087;
  line-height: 1;
  margin: 1.25rem 0 0.9375rem 2rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
  text-align: left;

  @media (max-width: 48rem) {
    font-size: 1.5rem;
    margin: 1.25rem 1rem;
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
              <AuthProvider>
                <GlobalStyles />
                <LayoutWrapper>
                  <Header />
                  <TitleWrapper>App Diversa</TitleWrapper>
                  <MainContent>{children}</MainContent>
                  <Footer />
                </LayoutWrapper>
              </AuthProvider>
            </StyledThemeProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
