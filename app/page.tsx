import React from 'react';
import Homebox from "./Homebox";

function Home(){
    fetch("https://learn-geo-api.onrender.com/");
    return(<div className="home-container">
        <div className="row home-row">
            <div className="col-lg-6">
                <div className="home-description">
                    <h1 className="landing-header">Welcome to Learn Geo</h1>
                    <p>Learn geo is an online learning tool to learn about the countries of the world.
                        Learn Geo offers many activities to learn all about the countries through a study activity
                        or a hands on learning activity. Learn Geo also offers activities you can play for fun,
                        along with a mastery challenge. Click below to study or try out a random activity.
                    </p>
                    <div className='anchor-div'>
                        <a className="study-anchor btn btn-dark">Study</a>
                        <a className="random-anchor btn btn-outline-dark">Random</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <img  className="home-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Artistic_depiction_of_planet_Earth.jpg/861px-Artistic_depiction_of_planet_Earth.jpg?20201109194112"/>
            </div>
        </div>
        <h3 className="page-heading">Select An Activity</h3>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                    <Homebox 
                    size="big left"
                    link="/study"
                    code="FR"
                    title="Study" 
                    desc="Look over a list of all 196 countries and learn all of the capitals, flags, and populations of every country in the World"/>
                </div>
                <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                    <Homebox
                    size="big right"
                    link="/higher-lower"
                    code="IN"
                    title="Higher or Lower"
                    desc="Try to guess which of two countries has a higher population and try to break the record for highest streak!"/>
                </div>
            </div>
            <div className="row">
            <div className="col-12 col-lg-4 col-md-6 col-md-12">
                    <Homebox
                    size="small"
                    link="/flags"
                    code="BN"
                    title="Flags"
                    desc="Learn the flag of every country in the world by trying to identify which country each flag is from"/>
                </div>
                <div className="col-12 col-lg-4 col-md-6 col-md-12">
                    <Homebox
                    size="small"
                    link="/capitals"
                    code="TR"
                    title="Capitals"
                    desc="Learn the capital of every country in the world by naming the capital of all the countries"/>
                </div>
                <div className="col-12 col-lg-4 col-md-6 col-md-12">
                    <Homebox
                    size="small"
                    link="/mastery"
                    code="MH"
                    title="Mastery"
                    desc="Do you have true geography knowledge? Find out by taking the ultimate geography quiz!"/>
                </div>
            </div>
        </div>
        </div>)
}

export default Home;