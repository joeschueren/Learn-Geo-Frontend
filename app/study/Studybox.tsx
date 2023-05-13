import React from "react";

function Studybox(props: any): JSX.Element{
    return(
        <div className="col-12 col-lg-3 col-md-4 col-sm-12">
            <div className="study-container">
                <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${props.code}.svg`}/>
                <p className="study-text study-name">{props.name}</p>
                <p className="study-text">Capital: {props.capital}</p>
                <p className="study-text">Population: {props.population}</p>
                <p className="study-text">Latitude: {props.latitude}</p>
                <p className="study-text">Longitude: {props.longitude}</p>
                <p className="study-text">{props.continent}</p>
            </div>
        </div>);
}

export default Studybox;