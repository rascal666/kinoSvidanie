import React, {useState} from 'react';
import {fetchKinopoisk, filters} from '../reducers/getDataReducer'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Filter from "./filter";
import '../style/filters.scss'

const Fillters = () => {
    const dispatch = useAppDispatch()
    const {filter, year, rating, countries, genres} = useAppSelector(state => state.kinopoisk)

    function filteredFilter () {
        const filteredFilterData = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== '')
        );

        dispatch(fetchKinopoisk({filterGet: filteredFilterData}))
    }
    return (
        <div className='filters'>
            <p className='filters__title'>Фильтры</p>
            <Filter type='years' title='по годам' data={year} />
            <Filter type='rating.kp' title='по рейтингу' data={rating}/>
            <Filter type='countries.name' title='по странам' data={countries}/>
            <Filter type='genres.name' title='по жанрам' data={genres}/>
            <button className='button' onClick={() => {filteredFilter()}}> запустить поиск </button>
        </div>
    );
};

export default Fillters;