import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App.tsx';
import { createStore } from 'redux';
import './alertify.css'
import { Provider } from "react-redux";
import { tasks } from './redux/reducers/tasks.tsx';

const store = createStore(tasks, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
