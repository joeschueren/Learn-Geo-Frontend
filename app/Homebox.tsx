import React from 'react';
import Link from 'next/link';

function Homebox(props: any): JSX.Element{
    return(
        <div className={`homebox ${props.size}`}>
            <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${props.code}.svg`}/>
            <h1 className="home-title">{props.title}</h1>
            <p className="home-desc">{props.desc}</p>
            <Link href={props.link} className="play-button">Play Now</Link>
        </div>
    )
}

export default Homebox;