'use client';
import React,{useState, useEffect} from "react";

function Capitals(){
    // state to track whether the game needs to be reset
    const [reset, setReset]: [boolean, any] = useState(false);

    //state to get and store the list of countries generated
    const [countries, setCountries]: [any[], any] = useState([undefined]);

    //state to track where the user is along in the problem set
    const [currentIndex, setCurrentIndex]: [number, any] = useState(0);

    //state to track the users score
    const [score, setScore]: [number, any] = useState(0);

    // state to track the answer typed by the user
    const [userInput, setUserInput]: [string, any] = useState("");

    // state to control whether the game shows a question or a review of the answer
    const [onReview, setOnReview]: [boolean, any] = useState(false);

    // state to control whether the user was correct or incorrect
    const [isCorrect, setIsCorrect]: [boolean, any] = useState(false);

    // state to track whether the game is completed
    const [isCompleted, setIsCompleted]: [boolean, any] = useState(false);

    // gets initial list of countries from backend
    useEffect(() =>{
        console.log("inside");
        async function getCountries(): Promise<void>{
            const res = await fetch(`https://hexagonal-glossy-toothbrush.glitch.me/random/40`);
            let data = await res.json();
            data = data.sort(() => Math.random() - 0.5);
            setCountries(data);
        }
        getCountries()

    }, [reset])

    // controlled component to track user input
    function handleTyping(event: any): void{
        setUserInput(event.target.value)
    }

    // function that handles making the user answer more user-friendly when special characters are involved
    function handleSubmit(){

        if(userInput.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase() ===
         countries[currentIndex].capital.replaceAll(/[^\w\s-]/g, '').replace(/-/g, ' ').toLowerCase()){
            setScore(score + 1)
            console.log(score);
            setIsCorrect(true)
        }
        else{
            setIsCorrect(false);
        }
        setOnReview(true);
    }

    // allows user to continue with the game by using enter
    function handleKeyDown(event: any){
        if(event.keyCode === 13)
        {
            handleSubmit();
        }
    }

    // function to apply logic of going to the next question
    function handleContinue(){
        setUserInput("");
        setCurrentIndex(currentIndex + 1);
        setOnReview(false);
        setIsCorrect(false);
        if(currentIndex === countries.length-1){
            setIsCompleted(true);
        }
    }

    // function to handle logic of restarting the game
    function handleRetry(){
        setCurrentIndex(0);
        setIsCompleted(false);
        setIsCorrect(false);
        setOnReview(false);
        setUserInput("");
        setScore(0);
        setReset(!reset);
    }

    if(onReview){
        return(<div>
        <input style={{ opacity: 0, position: 'absolute' }} tabIndex={0} autoFocus={true} onKeyDown={handleContinue}></input>
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
                        <p className="capital-question">The Capital was: <span className="capital-answer">{countries[currentIndex].capital}</span>  ({countries[currentIndex].name})</p>
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
            <div className="completed-div">
                <h1>Your Score: <span className="final-score">{score}/{currentIndex}</span></h1>
                <p>Click retry to play again</p>
                <button className="retry-button" onClick={handleRetry}>Retry</button>
            </div>
        </div>)
    }

    else return(countries[0] === undefined ? <div className="loading-div"><h1 className="loading">Loading...</h1></div>: <div>
        <div className="fluid-container">
            <div className="row whole">
                <div className="col-12 col-md-6 col-sm-12">
                    <div className="flag-container">
                        <img className="capital-image" src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[currentIndex].code}.svg`}/>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-12">
                    <div className="capital-container">
                        <h1 className="capital-showing">What Is The Capital of the Country This Flag Belongs To?</h1>
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