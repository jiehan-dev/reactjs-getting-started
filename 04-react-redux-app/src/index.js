import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

// myGlobal = 4; // this line will trigger eslint error when npm start

// function HelloWorld() {
//   // debugger;
//   // NOTE: add debugger will trigger a breakpoint automatically when inspecting browser
//   return <p>Hello World</p>;
// }

// it can be useful to pass initial state into the store here
// if you're server rendering or initializing Redux store with data from localstorage
const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
// ReactDOM.render(<HelloWorld />, app); // this works too
