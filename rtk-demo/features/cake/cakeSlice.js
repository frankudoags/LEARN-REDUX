const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numOfCakes: 10
}
const cakeSlice = createSlice({
    //slice name
    name: 'cake',

    //initial state
    initialState,
    
    //reducers
    reducers: {
        //Auto-created action:  {type: 'cake/ordered, payload: undefined}
        ordered: (state) => {
            state.numOfCakes--
        },
        //Auto-created action:  {type: 'cake/restocked', payload: payload}
        restocked: (state, action) => {
            state.numOfCakes += action.payload;
        }
    }
})


/*
CreateSlice also provides the main reducer and all the actions it automatically 
creates and we export both using module.exports to use in the store
*/

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;