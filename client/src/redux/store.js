import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk]

const store = createStore(
    rootReducer,
    compose(
        composeWithDevTools(applyMiddleware(...middlewares))
    )
);

export default store;