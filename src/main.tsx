import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './style/header.scss'
import "./assets/MontserratAltern/stylesheet.scss";
import {Provider} from "react-redux";
const store = setupStore()
import {setupStore} from "./store";
import Loading from "./components/loading";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Loading/>
        <App />
    </Provider>
)
