'use client';
import React,{useState, useEffect} from "react";

function Capitals(){
    const [region, setRegion]: [string, any] = useState("na");
    const [countries, setCountries]: [any[], any] = useState([undefined]);
    const [currentIndex, setCurrentIndex]: [number, any] = useState(0);
    const [score, setScore]: [number, any] = useState(0);
    const [userInput, setUserInput]: [string, any] = useState("");
    const [onReview, setOnReview]: [boolean, any] = useState(false);
    const [isCorrect, setIsCorrect]: [boolean, any] = useState(false);
    const [isCompleted, setIsCompleted]: [boolean, any] = useState(false);

    useEffect(() =>{
        console.log("inside");
        async function getCountries(): Promise<void>{
            const res = await fetch(`http://192.168.1.106:5000/${region}`);
            let data = await res.json();
            data = data.sort(() => Math.random() - 0.5);
            setCountries(data);
        }
        getCountries()

    }, [region])

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

    function handleTyping(event: any): void{
        setUserInput(event.target.value)
    }

    function handleSubmit(){

        console.log(userInput.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase())
        console.log(countries[currentIndex].name.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase())

        if(userInput.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase() ===
         countries[currentIndex].name.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase()){
            setScore(score + 1)
            console.log(score);
            setIsCorrect(true)
        }
        else{
            setIsCorrect(false);
        }
        setOnReview(true);
    }

    function handleKeyDown(event: any){
        if(event.keyCode === 13)
        {
            handleSubmit();
        }
    }

    function handleContinue(){
        setUserInput("");
        setCurrentIndex(currentIndex + 1);
        setOnReview(false);
        setIsCorrect(false);
        if(currentIndex === countries.length-1){
            setIsCompleted(true);
        }
    }

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
                        <p className="capital-question">The Country was: <span className="capital-answer">{countries[currentIndex].name} </span></p>
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

    else return(countries[0] === undefined ? <h1 className="loading">Loading...</h1>: <div>
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
                        <h1 className="capital-showing">What Is The Country This Flag Belongs To?</h1>
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