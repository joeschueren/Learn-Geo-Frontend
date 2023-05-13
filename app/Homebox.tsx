import React from 'react';

function Homebox(props: any): JSX.Element{
    return(
        <div className={`homebox ${props.size}`}>
            <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${props.code}.svg`}/>
            <h1 className="home-title">{props.title}</h1>
            <p className="home-desc">{props.desc}</p>
            <a href={props.link} className="play-button">Play Now</a>
        </div>
    )
}

export default Homebox;