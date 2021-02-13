// reducers.js

import { combineReducers } from 'redux';
import {
    ADD_DOC,
} from './actions';

const initialState = {
    docs: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DOC:
            return {
                docs: [
                    ...state.docs,
                    {
                        hdr: action.hdr,
                        txt: action.txt,
                        sec: action.sec,
                        sub: action.sub,
                    },
                ],
            };

        default:
            return state;
    }
};

export default rootReducer;



