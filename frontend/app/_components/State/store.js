import {applyMiddleware, combineReducers, legacy_createStore} from "@reduxjs/toolkit";
import {authReducer} from "@/app/_components/State/Authentication/Reducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    auth:authReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))