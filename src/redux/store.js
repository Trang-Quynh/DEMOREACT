import {applyMiddleware, createStore} from "redux";
import productReducer from "./products/productSlice";
import userReducer from "./user/userSlice"
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

// export const store = createStore(StudentReducer, applyMiddleware(thunk))
const store = configureStore({
    reducer:{
        products: productReducer,
        user: userReducer
    }})
export default store;



// Sử dụng khi projetc có nhiều reducer
// const rootReducer = combineReducers({
//     products: studentReducer,
//     classes: classReducer
// });
//
// const store = configureStore({ reducer: rootReducer });
