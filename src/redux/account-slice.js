import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        accessToken: '',
    },
    reducers: {
        login: (state, action) => {
          state.accessToken = action.payload.accessToken;
        },
        logout: (state,action) => {
          state.accessToken = '';
        }
      }
});

export const { login, logout } = tokenSlice.actions;

export default tokenSlice.reducer;