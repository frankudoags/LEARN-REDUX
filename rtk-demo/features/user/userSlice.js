const axios = require('axios');
const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;

const initialState = {
    loading: false,
    users: [],
    error: ''
};

//generates pending, fufilled, and rejected action types6
const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map((user) => user.id))
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});


module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
