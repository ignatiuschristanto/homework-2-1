import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        accessToken: '',
        isLogin: false,
    },
    reducers: {
        login: (state, action) => {
          state.accessToken = action.payload.accessToken;
          state.isLogin = true;
        },
        logout: (state,action) => {
          state.accessToken = '';
          state.isLogin = false;
        }
      }
});

export const { login, logout } = tokenSlice.actions;

export default tokenSlice.reducer;