import {combineReducers} from "redux";
import kinopoiskSlice from './getDataReducer'

const rootReducer = combineReducers({
    kinopoisk: kinopoiskSlice
})

export default rootReducer

