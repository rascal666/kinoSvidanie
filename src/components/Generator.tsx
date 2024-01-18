import React, {useEffect, useState} from 'react';
import '../style/generator.scss';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchKinopoisk, fetchKinopoiskDataCountries, fetchKinopoiskDataGenres} from '../reducers/getDataReducer'
import InfoFilm from "./infoFilm";
import noImg from '../../public/noImg.png'

const Generator = () => {
    const dispatch = useAppDispatch()
    const {film,filterDefault, favorites} = useAppSelector(state => state.kinopoisk)

    const [heightStyle, setHeightStyle] = useState(false)

    if (heightStyle) {

    }

    useEffect( () => {
        dispatch(fetchKinopoisk({filterGet:filterDefault }))
        dispatch(fetchKinopoiskDataCountries())
        dispatch(fetchKinopoiskDataGenres())
    }, [])

    function whereTolook(){

        if(film.video === null || film.video.length < 1) {

            return <p> мы ничего не нашли</p>
        } else {
            return (
                film.video.map((item, key) => {
                    return (
                        <a key={key} className='generator__watch' target='_blank' href={item.url}>
                            <img className='generator__watchImg' src={item.logo.url} alt=""/>
                            <p>{item.name}</p>
                        </a>

                    )

                })
            )
        }
    }

    return (
        <div className='generator'>
            <div className='generator__preview' >
                <img className='generator__img' src={film.img == null? noImg: film.img } alt=""/>
                <a  target='_blank' className='generator__trailer'>
                    <p className='generator__look' >где можно посмотреть:</p>
                    {/*<div className='generator__watchFilm'>{whereTolook()}</div>*/}
                </a>
            </div>
            <div className='generator__description'>
                <p className='generator__title' >{film.name}</p>
                <div className='generator__info'>
                    <span>id - {film.id} </span>
                    <span> рейтинг -  {film.rating}</span>
                </div>
                <InfoFilm film={film.name} title='название'/>
                <InfoFilm film={film.year} title='год'/>
                <InfoFilm film={film.description} title='описание' onClick={() => setHeightStyle(heightStyle => !heightStyle)} className={heightStyle ? ' generator__infoFilm-height' : ''} />

                <InfoFilm film={film.counter} title='страна' isMap={true}/>
                <InfoFilm film={film.genres} title='жанр' isMap={true}/>

            </div>
        </div>
    );
};

export default Generator;