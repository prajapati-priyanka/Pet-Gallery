import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; }
  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #FAFAF9;
    color: #1A1A1A;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }
  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; font-family: inherit; }
  img { display: block; max-width: 100%; }
`;
