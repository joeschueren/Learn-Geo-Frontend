'use client';
import React,{useState, useEffect} from "react";

function Capitals(){
    // state to track wich region the user has selected
    const [region, setRegion]: [string, any] = useState("na");

    // state to track the countries of the selected region
    const [countries, setCountries]: [any[], any] = useState([undefined]);

    // state to track where the user is in the problem set
    const [currentIndex, setCurrentIndex]: [number, any] = useState(0);

    // state to track the user's score
    const [score, setScore]: [number, any] = useState(0);

    // state to track the user's input
    const [userInput, setUserInput]: [string, any] = useState("");

    // state to determine whether the user is reviewing or answering
    const [onReview, setOnReview]: [boolean, any] = useState(false);

    // state to track is the user was correct or not
    const [isCorrect, setIsCorrect]: [boolean, any] = useState(false);

    // state to track whether the game has been completed
    const [isCompleted, setIsCompleted]: [boolean, any] = useState(false);

    // gets list of countries from the backend whenever region is changed
    useEffect(() =>{
        async function getCountries(): Promise<void>{
            const res = await fetch(`https://learn-geo-api.onrender.com/${region}`);
            let data = await res.json();
            data = data.sort(() => Math.random() - 0.5);
            setCountries(data);
        }
        getCountries()

    }, [region])

    // handles the user selecting a different region
    function handleChange(event: any): void{
        const regions = ["na", "sa", "eu", "as", "af", "oc"]
        setRegion(regions[event.target.selectedIndex]);
        setCurrentIndex(0);
        setIsCompleted(false);
        setIsCorrect(false);
        setOnReview(false);
        setUserInput("")
        setScore(0);
    }

    // tracks the user's answer to the question
    function handleTyping(event: any): void{
        setUserInput(event.target.value)
    }

    // function that handles making the user answer more user-friendly when special characters are involved
    function handleSubmit(){

        if(userInput.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase() ===
         countries[currentIndex].capital.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase()){
            setScore(score + 1)
            setIsCorrect(true)
        }
        else{
            setIsCorrect(false);
        }
        setOnReview(true);
    }

    // allows user to progress with the enter key
    function handleKeyDown(event: any){
        if(event.keyCode === 13)
        {
            handleSubmit();
        }
    }

    // handles logic to go to the next question
    function handleContinue(){
        setUserInput("");
        setCurrentIndex(currentIndex + 1);
        setOnReview(false);
        setIsCorrect(false);
        if(currentIndex === countries.length-1){
            setIsCompleted(true);
        }
    }

    // handles logic to restart the game
    function handleRetry(){
        setCurrentIndex(0);
        setIsCompleted(false);
        setIsCorrect(false);
        setOnReview(false);
        setUserInput("");
        setScore(0);
    }

    if(onReview){
        return(<div>
        <input style={{ opacity: 0, position: 'absolute' }} tabIndex={0} autoFocus={true} onKeyDown={handleContinue}></input>
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
            <div className="fluid-container">
            <div className="row whole">
                <div className="col-12 col-md-6 col-sm-12">
                    <div className="flag-container">
                        <img className="capital-image" src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[currentIndex].code}.svg`}/>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-12">
                    <div className="capital-container">
                        <h1 className="capital-showing">{isCorrect ? <span className="correct"> Correct </span>: <span className="wrong"> Incorrect </span>}</h1>
                        <p className="capital-question">Capital of {countries[currentIndex].name}: <span className="capital-answer">{countries[currentIndex].capital}</span></p>
                        <p className="capital-question">Your Answer: <span className="capital-answer">{userInput}</span></p>
                        <p className="capital-question">Progress: {currentIndex + 1}/{countries.length} <br/><span className="user-score">Your Score: <span className="capital-answer">{currentIndex !== 0 && (score/(currentIndex + 1) * 100).toFixed(0)}%</span></span></p>
                        <button className="retry-button ml-auto" onKeyDown={handleContinue} onClick={handleContinue}>Continue</button>
                    </div>
                </div>
            </div>
        </div>

        </div>);
    }

    else if(isCompleted){
        return(<div>
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
            <div>
                <h1>Your Score: {score}/{currentIndex}</h1>
                <p>Click retry to play again, or select a different region.</p>
                <button className="retry-button" onClick={handleRetry}>Retry</button>
            </div>
        </div>)
    }

    else return(countries[0] === undefined ? <div className="loading-div"><h1 className="loading">Loading...</h1></div>: <div>
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
        <div className="fluid-container">
            <div className="row whole">
                <div className="col-12 col-md-6 col-sm-12">
                    <div className="flag-container">
                        <img className="capital-image" src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[currentIndex].code}.svg`}/>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-12">
                    <div className="capital-container">
                        <h1 className="capital-showing">{countries[currentIndex].name}</h1>
                        <p className="capital-question capital-showing">What is the capital of {countries[currentIndex].name}?</p>
                        <div className="input-box">
                            <input className="capital-input" value={userInput} onKeyDown={handleKeyDown}onChange={handleTyping} spellCheck="false" autoFocus></input>
                            <button className="capital-button" onClick={handleSubmit}>Enter</button>
                            <p className="capital-progress">Progress: {currentIndex + 1}/{countries.length} <br/><span className="user-score">Your Score: <span className="capital-answer">{currentIndex !== 0 && (score/(currentIndex) * 100).toFixed(0)}%</span></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Capitals;

