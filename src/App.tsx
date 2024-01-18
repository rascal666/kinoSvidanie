import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import Header from "./components/Header";
import Fillters from "./components/Fillters";
import Generator from "./components/Generator";
import {useSelector} from "react-redux";
import { filters} from './reducers/getDataReducer'
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import ErrorFetchFilm from "./components/error";



function App() {
    const dispatch = useAppDispatch()
    const {error} = useAppSelector(state => state.kinopoisk)
    const handleClick = (e) => {
        const buttons = document.querySelectorAll('.app__kinoTypeButton');

        buttons.forEach((button) => {
            if (button.classList.contains('app__kinoTypeButton-active')){
                button.classList.remove('app__kinoTypeButton-active')
            }
        })

        if (e.target.classList.contains('app__kinoTypeButton')){
            e.target.classList.add('app__kinoTypeButton-active')
            if (e.target.getAttribute('data-type') =='type')
            dispatch(filters({ type: 'type', value: e.target.getAttribute('data-name') }))
        }
    };
    return (
        <div className='app'>

            <Header/>
            <div onClick={(e) => handleClick(e)} className='app__kinoType'>
                <div className='app__kinoTypeButton app__kinoTypeButton-active' data-type='type' data-name='movie'> фильмы</div>
                <div className='app__kinoTypeButton' data-type='type' data-name='tv-series'> сериалы</div>
                <div className='app__kinoTypeButton' data-type='type' data-name='anime'> аниме</div>
                {/*<div className='app__kinoTypeButton'> избранное</div>*/}
            </div>
            <div className='content'>
                <Fillters/>
                {
                    error == 'reject'? <div><ErrorFetchFilm/></div>: <Generator/>
                }

            </div>

        </div>
    );
}

export default App
