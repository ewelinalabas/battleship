import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { gameReducer } from './reducers/gameReducer';
import { Game } from './components/Game';
import { Instructions } from './components/Instructions';
import { Navbar } from './components/Navigation';

const store = createStore(
  gameReducer,
  undefined,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

const routing = (
  <Router>
    <Navbar />
    <div className="container">
      <Route exact path="/" component={App} />
      <Route path="/game" component={Game} />
      <Route path="/instructions" component={Instructions} />
    </div>
  </Router>
)

ReactDOM.render(
  <StoreProvider store={store}>
    {routing}
  </StoreProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
