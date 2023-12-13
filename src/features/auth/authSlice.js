import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        username : null,
        token : null
    },
    reducers : {
        setCredentials : (state, action) => {
            state.username = action.payload.username
            state.token = action.payload.accessToken
        },
        logOut : (state, action) => {
            state.user = null
            state.token = null
        }
    }
})

export const {
    setCredentials,
    logOut
} = authSlice.actions

export default authSlice.reducer

export const selectUser = (state) => state.auth.username
export const selectToken = (state) => state.auth.token