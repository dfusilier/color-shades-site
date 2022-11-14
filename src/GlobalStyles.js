import { createGlobalStyle } from 'styled-components';
import cssTheme from './utils/makeTheme';

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    body {
        --color-bg: #121212;
        --color-bg-tinted: rgba(255, 255, 255, 0.08);
        --color-fg: white;
        --color-fg-subdued: rgba(255, 255, 255, 0.75);
        --color-fg-subdued-non-text: rgba(255, 255, 255, 0.5);
        --color-fg-subdued-decorative: rgba(255, 255, 255, 0.04);
        ${({bg}) => bg ? cssTheme(bg) : ""}

        --font-size-00: 0.75rem;
        --line-height-00: 1.5;
        
        --font-size-0: 1rem;
        --line-height-0: 1.5;
        
        --font-size-1: 1.25rem;
        --line-height-1: 1.4;
        
        --font-size-2: 1.5rem;
        --line-height-2: 1.3;
        
        --font-size-3: 1.75rem;
        --line-height-3: 1.2;
        
        --font-size-4: 2rem;
        --line-height-4: 1.1;

        --font-size-5: 3rem;
        --line-height-5: 1.0;
        
        background: var(--color-bg);
        color: var(--color-fg);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: var(--font-size-0);
        line-height: var(--line-height-0);
        padding: 0;
        margin: 0 auto;

        @media (min-width: 768px) {
            --font-size-4: 3rem;
            --line-height-4: 1.0;

            --font-size-5: 5rem;
            --line-height-5: 1.0;
        }
    }

    .type-size-00 {
        font-size: var(--font-size-00);
        line-height: var(--line-height-00);
    }

    .type-size-0 {
        font-size: var(--font-size-0);
        line-height: var(--line-height-00);
    }

    .type-size-1 {
        font-size: var(--font-size-1);
        line-height: var(--line-height-1);
    }

    .type-size-2 {
        font-size: var(--font-size-2);
        line-height: var(--line-height-2);
    }

    .type-size-3 {
        font-size: var(--font-size-3);
        line-height: var(--line-height-3);
    }

    .type-size-4 {
        font-size: var(--font-size-4);
        line-height: var(--line-height-4);
    }

    .type-size-5 {
        font-size: var(--font-size-5);
        line-height: var(--line-height-5);
    }

    .type-size-6 {
        font-size: var(--font-size-6);
        line-height: var(--line-height-6);
    }

    .font-weight-bold {
        font-weight: bold;
    }

    .font-variant-tabular {
        font-variant-numeric: tabular-nums;
    }

    p, h1, h2, h3, h4, h5, h6, ul, ol, li {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    ul, ol {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding-inline-start: 1.25rem;
    }

    .stack-000 > * + * {
        margin-block-start: 0.5rem;
    }
    .stack-00 > * + * {
        margin-block-start: 0.75rem;
    }
    .stack-0 > * + * {
        margin-block-start: 1rem;
    }
    .stack-1 > * + * {
        margin-block-start: 1.25rem;
    }
    .stack-2 > * + * {
        margin-block-start: 1.5rem;
    }
    .stack-3 > * + * {
        margin-block-start: 1.75rem;
    }
    .stack-4 > * + * {
        margin-block-start: 2rem;
    }
    .stack-5 > * + * {
        margin-block-start: 3rem;
    }
    .stack-6 > * + * {
        margin-block-start: 4rem;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .flex-align-stretch {
        align-items: stretch;
    }

    .flex-align-center {
        align-items: center;
    }

    .flex-justify-center {
        justify-content: center;
    }

    .gap-000    { gap: 0.5rem; }
    .gap-00     { gap: 0.75rem; }
    .gap-0      { gap: 1rem; }
    .gap-1      { gap: 1.25rem; }
    .gap-2      { gap: 1.5rem; }
    .gap-3      { gap: 1.75rem; }
    .gap-4      { gap: 2rem; }
    .gap-5      { gap: 3rem; }
    .gap-6      { gap: 4rem; }

    .flex-shrink { flex-shrink: 1; }
    .flex-no-shrink { flex-shrink: 0; }
    .flex-grow { flex-grow: 1; }
    .flex-no-grow { flex-grow: 0; }
    .flex-basis-min-content { flex-basis: min-content; }

    .flex-fit-y {
        height: auto;
        flex: 0 0 auto;
    }
    .flex-fit-x {
        width: auto;
        flex: 0 0 auto;
    }
    .flex-fill-x {
        flex: 1 1 100%;
    }
    .flex-fill-y {
        flex: 1 1 100%;
    }

    .grid-columns {
        display: grid;
        grid-auto-flow: row;
        grid-auto-rows: minmax(min-content, 1fr);
    }
    .grid-rows {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(min-content, 1fr);
    }

    legend {
        padding: 0;
        display: table;
    }
    fieldset {
        border: 0;
        padding: 0.01em 0 0 0;
        margin: 0;
        min-width: 0;
    }
    body:not(:-moz-handler-blocked) fieldset {
        display: table-cell;
    }


`

export default GlobalStyles;