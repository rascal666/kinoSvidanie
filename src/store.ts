import {createStore} from "redux";
import rootReducer from './reducers'
import {configureStore} from "@reduxjs/toolkit";


export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
