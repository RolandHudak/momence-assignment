import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: "Roboto Mono", monospace;
        font-size: 16px;
    }

    * {
        box-sizing: border-box;
    }
`;
