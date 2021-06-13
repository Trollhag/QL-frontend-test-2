import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import 'core-js/features/array/fill';

const Styles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 18px;
    font-family: 'Roboto', --apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  body {
    position: relative;
    margin: 0;
    background-color: peachpuff;
    height: 100%;
    min-height: 100vh;
  }
  #root {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 100vh;
  }
  img {
    max-width: 100%;
  }
`

ReactDOM.render(
  <>
    <Styles />
    <App />
  </>,
  document.getElementById('root')
);

