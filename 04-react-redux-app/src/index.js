import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// myGlobal = 4; // this line will trigger eslint error

// function HelloWorld() {
//   // debugger;
//   // NOTE: add debugger will trigger a breakpoint automatically when inspecting browser
//   return <p>Hello World</p>;
// }

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
// ReactDOM.render(<HelloWorld />, app); // this works too
