"use client";

import AccessibilityButtons from "@/components/common/AccessibilityButtons";
import Script from 'next/script';
import { useAccessibility } from "@/hooks/useAccessibility";
import "@/app/globals.css";
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
  const { fontSize } = useAccessibility();

  return (
    <html lang="es">
      <head>
        <title>AppDiversa</title>
        <meta name="description" content="App Recolección Datos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TNJW4WBV');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TNJW4WBV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <StyledThemeProvider theme={{ ...theme, fontSize: fontSize }}>
              <AuthProvider>
                <GlobalStyles />
                <LayoutWrapper>
                  <Header />
                  <TitleWrapper>AppDiversa</TitleWrapper>
                  <MainContent>{children}</MainContent>
                  <Footer />
                </LayoutWrapper>
                <AccessibilityButtons />
              </AuthProvider>
            </StyledThemeProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
