"use client";

import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider } from "@/styles/theme/ThemeContext";
import GlobalStyles from "@/styles/theme/GlobalStyles";
import theme from "@/styles/theme/theme";
import React from "react";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <StyledThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </StyledThemeProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
