import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "./redux/account-slice";

export default configureStore({
    reducer: {
        authToken: TokenReducer,
    }
});