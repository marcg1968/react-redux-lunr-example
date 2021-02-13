// redux/actions.js

export const ADD_DOC = 'ADD_DOC';

export const addDoc = (hdr, txt, sec, sub) => {
    return {
        type: ADD_DOC,
        hdr: hdr,
        txt: txt,
        sec: sec,
        sub: sub,
    }
};


