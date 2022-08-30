const redux = require('redux');
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;


const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_REQUESTED = 'FETCH_REQUESTED';
const FETCH_SUCCESSFUL = 'FETCH_SUCCESSFUL';
const FETCH_FAILED = 'FETCH_FAILED';

const fetchUsersRequest = () => {
    return {
        type: FETCH_REQUESTED
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_SUCCESSFUL,
        payload: users
    }
}
const fetchUsersFailure = (message) => {
    return {
        type: FETCH_FAILED,
        payload: message
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_REQUESTED:
            return {
                ...state,
                loading: false
            }
        case FETCH_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case FETCH_FAILED: 
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            //res.data is the users
            const users = res.data.map((user) => user.id);
            dispatch(fetchUsersSuccess(users));
        })
        .catch((error) => {
            //error.message is the error message
            dispatch(fetchUsersFailure(error.message));
        })
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

const unsubscribe = store.subscribe(() => { console.log(store.getState()) } );

store.dispatch(fetchUsers());
