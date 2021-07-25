import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NewNotificationProvider } from './Context/NewNotificationProvider';
import { LoggedUserProvider } from './Context/LoggedUserProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <LoggedUserProvider>
          <NewNotificationProvider>
            <App />
          </NewNotificationProvider>
        </LoggedUserProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
