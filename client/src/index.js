import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jwt_decode from 'jwt-decode'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import setAuthToken from './setAuthToken'
import { logoutUser, setCurrentUser } from './redux/actions/authActions'
import store from './redux/store'


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/explore/'
  }
}

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

