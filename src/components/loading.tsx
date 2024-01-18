import React from 'react';
import {useAppSelector} from "../hooks/redux";
import '../style/loading.scss'

const Loading = () => {
    const {isLoading} = useAppSelector(state => state.kinopoisk)

    return (
        <div className={isLoading?'loader': 'loaderDefault '}>
            <span className='loader__spinner'></span>
        </div>
    );
};

export default Loading;