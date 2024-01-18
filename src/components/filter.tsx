import React from 'react';
import {filters} from "../reducers/getDataReducer";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import '../style/filter.scss'

const Filter = ({title, type, data, valueOneOption}) => {
    const dispatch = useAppDispatch()

    return (
        <div className='filter'>
            <select className='filter__select' onChange={e => {dispatch(filters({ type: type, value: e.target.value }))}}>
                <option className='filter__option' value='all'>{title}</option>
                {
                    data.map((item, key) =>{
                        return <option  className='filter__option'key={key}  value={item}>{item} </option>
                    })
                }
            </select>
        </div>
    );
};

export default Filter;