// redux/store.js

import { createStore } from 'redux';
import reducers from './reducers';

let initialState = {
    docs: [
    ],
    visibility: 'AWESOME_TAG',
};

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
