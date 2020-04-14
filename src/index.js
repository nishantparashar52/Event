import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Index from './components/Index';
import Equipment from './components/Equipment';
import Artist from './components/Artist';

import configureStore from './store';
const store = configureStore();

// The <Switch> component will only show the first route contained within it that matches a pattern
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/equipment" component={Equipment} />
          <Route path="/artist" component={Artist} />
          <Route path="/" component={Index} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
);
