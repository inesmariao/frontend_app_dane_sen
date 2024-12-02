import { useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from '@/theme/ThemeContext'; // Importa el ThemeContext
import GlobalStyles from '@/theme/GlobalStyles';
import theme from '@/theme/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Configuración de ReactAxe para auditorías de accesibilidad
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
      const ReactAxe = require('@axe-core/react');
      const React = require('react');
      ReactAxe(React, window, 1000);
    }
  }, []);

  return (
    <html lang="es">
      <body>
        <ThemeProvider> {/* Proveedor del tema dinámico */}
          <StyledThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
          </StyledThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
