import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto sans KR", serif',
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider
    store={createStoreWithMiddleware(Reducer,
       window.__REDUX_DEVTOOLS_EXTENSION__ &&
       window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <MuiThemeProvider theme={theme}>
        <App /> 
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();