import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import reportWebVitals from './reportWebVitals';
import Game from "./tic_tac_toe"

ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById('root')
);
ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("doc-example")
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
