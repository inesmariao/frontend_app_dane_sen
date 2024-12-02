import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default GlobalStyles;
