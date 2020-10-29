import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import './assets/styles.css'

import * as serviceWorker from './serviceWorker';
import App from './App';
import allReducer from './reducers'

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#15202b",
    },
    text: {
      primary: "#ffffff"
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
