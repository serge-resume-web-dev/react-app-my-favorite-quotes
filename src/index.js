import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import App from './App'


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore( 
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    ) 
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));