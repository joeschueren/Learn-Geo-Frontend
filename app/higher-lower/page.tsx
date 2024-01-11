'use client';
import React, {useState, useEffect} from "react";

function HigherLower(): JSX.Element{

    // state to track the users score
    const [score, setScore]: [number, any] = useState(0)

    // state to manage the current countries being compared
    const [countries, setCountries]: [any[], any] = useState([undefined]);

    // state to track whether the game is active or not
    const [isGameActive, setIsGameActive]: [boolean, any] = useState(true);

    // state to track whether or not a highscore is being achieved
    const [isHighScore, setIsHighScore]: [boolean, any] = useState(false);

    // state to allow users to submit a highscore
    const [name, setName]: [string, any] = useState("");

    // state to send highscores to backend
    const [highScores, setHighScores]: [any[], any] = useState([{name: 'name', score: 0},{name: 'name', score: 0},{name: 'name', score: 0},{name: 'name', score: 0},{name: 'name', score: 0}])

    // randomly retrieves 2 countries from backend to display
    useEffect(() => {
        async function getCountries(): Promise<any>{
            const res = await fetch("https://hexagonal-glossy-toothbrush.glitch.me/random/2");
            const data = await res.json();
            setCountries(data);
        }
        getCountries();
    },[score])

    // handles user selection and updates 
    function handleClick(event: any): void{
        let higher: string = "";
        if(countries[0].population > countries[1].population){
            higher = countries[0].name;
        }
        else{
            higher = countries[1].name;
        }

        if(higher == event.target.dataset.value){
            setScore(score + 1);
        }
        else{
            checkLowestScore();
            getScores();
            setIsGameActive(false);
        }
    }

    // retrieves the lowest possible score that is a highscore
    async function checkLowestScore(): Promise<any>{
        const data: any = await fetch("https://hexagonal-glossy-toothbrush.glitch.me/low-score");
        let highscore = await data.json();
        if(score > parseInt(highscore.score)){
            setIsHighScore(true);
        }
    }

    // function to handle user input of their name
    function handleChange(event: any): void{
        let input = event.target.value;
        setName(input);
    }

    // sends over the user highscore
    async function sendScore(){
        await fetch("https://hexagonal-glossy-toothbrush.glitch.me/score/submit",{
            method: 'POST',
            body: JSON.stringify({score: score, name: name}),
            headers:{
                'Content-Type': 'application/json' 
            }
            
        })
        await setIsHighScore(false);
    }

    // gets scores from the backend
    async function getScores(): Promise<any>{
        const res = await fetch("https://hexagonal-glossy-toothbrush.glitch.me/scores");
        const set = await res.json()
        await setHighScores(set);
    }

    // handles logic of restarting the game
    function resetGame(){
        async function getCountries(): Promise<any>{
            const res = await fetch("https://hexagonal-glossy-toothbrush.glitch.me/random/2");
            const data = await res.json();
            setCountries(data);
        }
        if(score === 0){
            getCountries();
        }
        setScore(0);
        setIsGameActive(true);
    }



    if(isGameActive)
    {
        return(countries[0] === undefined ? <div className="loading-div"><h1 className="loading">Loading...</h1></div> : <div>
            <div className="fluid-container">
            <div className="hl-whole">
                <h1 className="score-text">Current Score: <span className="score">{score}</span></h1>
                <h4 className="question">Which country do more people live in?</h4>
            <div className="row hl-container whole">
                <div className="col-12 col-lg-4 col-sm-12">
                    <h4 className="hl-text">{countries[0].name}</h4>
                    <img className="hl-image" src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[0].code}.svg`} data-value={countries[0].name} onClick={handleClick}/>
                </div>
                <div className="col-12 col-lg-4 col-sm-12"><h1 className="between-text">OR</h1></div>
                <div className="col-12 col-lg-4 col-sm-12">
                    <h4 className="hl-text">{countries[1].name}</h4>
                    <img className="hl-image" src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[1].code}.svg`} data-value={countries[1].name} onClick={handleClick}/>
                </div>
            </div>
            </div>
            </div>
        </div>);
    }
    else{

        if(isHighScore){
            return(<div className="highscore-container">
                <p className="highscore">Enter name for high score:</p>
                <input className="highscore" value={name} onChange={handleChange}></input>
                <button className="highscore retry-button" onClick={sendScore} >Send Score</button>
            </div>)
        }
        else{
            return(<div>
                <div className="fluid-container">
                    <div className="row whole">
                        <div className="col-12 col-lg-12">
                            <h1 className="game-over">Game Over</h1>
                            <h5 className="game-over-text">Your Score: {score}</h5>
                        </div>
                    </div>
                    <div className="row whole">
                        <div className="col-12 col-sm-6 game-over-text">
                            <div className="result-box hl-box">
                                <p>{countries[0].name} population: <span className="population-reveal">{countries[0].population.toLocaleString()}</span></p>
                                <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[0].code}.svg`}/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 game-over-text">
                            <div className="result-box hl-box">
                                <p>{countries[1].name} population: <span className="population-reveal">{countries[1].population.toLocaleString()}</span></p>
                                <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countries[1].code}.svg`}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="button-container">
                        <button onClick={resetGame} className="retry-button">Retry</button>
                    </div>
                </div>
            </div>);
        }

    }
}

export default HigherLower;