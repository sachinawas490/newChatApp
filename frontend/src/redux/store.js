import {configureStore} from "@reduxjs/toolkit"
import socketReducer from './slices/socketSlice.js'
import userReducer from "./slices/userSlice.js";
const store = configureStore({
    reducer: {
        user: userReducer,
        socket:socketReducer,
    },

     
 
})
export default store;