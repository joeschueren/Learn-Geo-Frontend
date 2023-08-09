'use client';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import Studybox from './Studybox';

function StudyPage(): JSX.Element{
    const [region, setRegion]: [string, any] = useState("na");
    const [countries, setCountries]: [any[], any] = useState([undefined]);

    useEffect(() =>{
        console.log("inside");
        async function getCountries(): Promise<void>{
            const res = await fetch(`http://192.168.0.238:5000/${region}`);
            const data = await res.json();
            setCountries(data);
        }
        getCountries()

    }, [region])

    function handleChange(event: any): void{
        const regions = ["na", "sa", "eu", "as", "af", "oc"]
        setRegion(regions[event.target.selectedIndex]);
    }
    let componentsArray: any[] = [];

    for(let i=0; i< countries.length; i += 4)
    {
        componentsArray.push(<div className="row">
            {countries[i] && (
            <Studybox
                key={i}
                name={countries[i].name}
                capital={countries[i].capital}
                population={countries[i].population.toLocaleString()}
                latitude={countries[i].latitude}
                longitude={countries[i].longitude}
                continent={countries[i].continent}
                code={countries[i].code}
            ></Studybox>
            )}
            {countries[i+1] && (
            <Studybox
                key={i+1}
                name={countries[i+1].name}
                capital={countries[i+1].capital}
                population={countries[i+1].population.toLocaleString()}
                latitude={countries[i+1].latitude}
                longitude={countries[i+1].longitude}
                continent={countries[i+1].continent}
                code={countries[i+1].code}
            ></Studybox>
            )}
            {countries[i+2] && (
            <Studybox
                key={i+2}
                name={countries[i+2].name}
                capital={countries[i+2].capital}
                population={countries[i+2].population.toLocaleString()}
                latitude={countries[i+2].latitude}
                longitude={countries[i+2].longitude}
                continent={countries[i+2].continent}
                code={countries[i+2].code}
            ></Studybox>
            )}
            {countries[i+3] && (
            <Studybox
                key={i+3}
                name={countries[i+3].name}
                capital={countries[i+3].capital}
                population={countries[i+3].population.toLocaleString()}
                latitude={countries[i+3].latitude}
                longitude={countries[i+3].longitude}
                continent={countries[i+3].continent}
                code={countries[i+3].code}
            ></Studybox>
            )}
        </div>)
    }

    return(countries[0] === undefined ? <h1>loading</h1> : <div className="container-fluid">
        <div className="filter-container">
            <p className="filter filter-text">Filter By:</p>
            <select className="filter filter-select" onChange={handleChange}>
                <option>North America</option>
                <option>South America</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>Australia</option>
            </select>
        </div>
            {componentsArray}
        </div>
    )
}

export default StudyPage;

