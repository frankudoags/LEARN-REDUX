const produce = require('immer').produce;
const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

const orderCake = (qty = 1) => {
    return {
        type: CAKE_ORDERED,
        payload: qty
    }
}

const restockCake = (qty = 1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,

    }
}
const orderIceCream = (qty = 1) => {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

const restockIceceam = (qty = 1) => {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,

    }
}

const initialCakeState = {
    numOfCakes: 10,
};
const initialIceCreamState = {
    numOfIceCream: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            //using immer to directly mutate state without errors
            return produce(state, (draft) => {
                draft.numOfCakes = state.numOfCakes -action.payload;
            })
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
            default:
                return state;
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - action.payload,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload,
            }
            default:
                return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})
const store = createStore(rootReducer, applyMiddleware(logger)); 
console.log("initial State", store.getState());
const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceceam }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceceam(3);


unsubscribe();