import React from 'react';

const InfoFilm = ({film, title, onClick, className= '', isMap=false}) => {
    return (
        <div onClick={onClick} className={'generator__infoFilm ' + className}>
            <div className="generator__name">{title}</div>
            {
                isMap? film.map((item, key) => {
                    return <span key={key} > {item.name},</span>
                }) :  <div className="generator__name">{film}</div>
            }
        </div>
    );
};

export default InfoFilm;