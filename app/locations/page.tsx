'use client'

import React, {useState, useEffect} from "react";
import 'leaflet/dist/leaflet.css';
import Map from "./Map";

function Locations(){
    // state to track which region the user is testing on
    const [region, setRegion]: [string, any] = useState("na");

    const [feedback, setFeedback]: [string, any] = useState("clear");

    const [countryPicked, setCountryPicked]: [String, any] = useState("");

    // state to manage storage of the countries in the region
    const [countries, setCountries]: [any[], any] = useState([undefined]);

    // state to track how far along the user is in the problem set
    const [currentIndex, setCurrentIndex]: [number, any] = useState(0);

    // state to track the user's score
    const [score, setScore]: [number, any] = useState(0);

    // state to determine if the game is completed
    const [isCompleted, setIsCompleted]: [boolean, any] = useState(false);

    useEffect(() =>{
        async function getCountries(): Promise<void>{
            const res = await fetch(`https://learn-geo-api.onrender.com/${region}`);
            let data = await res.json();
            data = data.sort(() => Math.random() - 0.5);
            setCountries(data);
        }
        getCountries()

    }, [region])

    // tracks whether the region has been changed
    function handleChange(event: any): void{
        const regions = ["na", "sa", "eu", "as", "af", "oc"]
        setRegion(regions[event.target.selectedIndex]);
        setCurrentIndex(0);
        setIsCompleted(false);
        setScore(0);
    }

    useEffect(() => {
        if(countries[0] !== undefined){
            console.log(countryPicked);
            if(countryPicked.includes(countries[currentIndex].name)){
                setFeedback("Correct")
                setTimeout(() => 
                    {setFeedback("clear")
                     setScore(score + 1)}, 1000)
                
            }
            else{
                setFeedback("Incorrect")
                setTimeout(() => setFeedback("clear"), 1000)
                setCountryPicked("");
            }

            setTimeout(() =>{
                setCurrentIndex(currentIndex + 1);

                if(currentIndex === countries.length-1){
                    setIsCompleted(true);
                }
                console.log(currentIndex);
            }, 1000)
        }
    }, [countryPicked])

    const handleClick = function(country: String){
        setCountryPicked(country);
    }

    const handleRetry = function(){
        setCurrentIndex(0);
        setCountryPicked("");
        setIsCompleted(false); 
    }

    if(countries[0] === undefined){
        return <div className="loading-div"><h1 className="loading">Loading...</h1></div>
    }
    else if(isCompleted){
        return(<div>
            <div className="completed-div">
                <h1>Your Score: <span className="final-score">{score}/{currentIndex}</span></h1>
                <p>Click retry to play again</p>
                <button className="retry-button" onClick={handleRetry}>Retry</button>
            </div>
        </div>)
    }
    else return(
        <div>
            <div className="filter-container">
            <p className="filter filter-text">Select Region:</p>
            <select className="filter filter-select" onChange={handleChange}>
                <option>North America</option>
                <option>South America</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>Australia</option>
            </select>
            </div>
            <div className="fluid-container map-container">
                <div className="row">
                    <div className="col-md-8">
                        <Map handleClick={handleClick}/>
                    </div>
                    <div className="col-md-4">
                        <div className="location-question-div">
                            <div>
                                <h2 className={feedback}>{feedback}</h2>
                                <img style={{width: "80%", marginBottom: "25px"}} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[currentIndex].code}.svg`}></img>
                                <h4>Where is {countries[currentIndex].name} Located?</h4>
                                <p className="capital-question">Progress: {currentIndex + 1}/{countries.length} 
                                <br/><span className="user-score">Your Score: <span className="capital-answer">{currentIndex !== 0 && (score/(currentIndex) * 100).toFixed(0)}%</span></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Locations;