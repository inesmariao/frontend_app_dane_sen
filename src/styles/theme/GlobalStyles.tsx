import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.5;
    color: #333;
    background-color: rgba(141, 131, 183, 0.1);
    background-image: url('/images/fondo_app_diversa_2276.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  h1, h2, h3 {
    font-weight: bold;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyles;
