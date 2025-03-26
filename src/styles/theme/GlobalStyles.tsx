import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: ${({ theme }) => theme.fontSize};
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: rgba(141, 131, 183, 0.1);
    background-image: url('/assets/images/fondo_app_diversa_2276.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    min-height: 100vh;
  }

  h1, h2, h3 {
    font-weight: bold;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
`;

export default GlobalStyles;