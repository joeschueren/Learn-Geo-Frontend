import React from 'react';
import Homebox from "./Homebox";

function Home(){
    return(<div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                    <Homebox 
                    size="big"
                    link="/study"
                    code="FR"
                    title="Study" 
                    desc="Look over a list of all 196 countries and learn all of the capitals, flags, and populations of every country in the World"/>
                </div>
                <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                    <Homebox
                    size="big"
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
                <div className="col-12 col-lg-4 col-md-6 col-sm-12">
                    <Homebox
                    size="small"
                    link="/capitals"
                    code="TR"
                    title="Capitals"
                    desc="Learn the capital of every country in the world by naming the capital of all the countries"/>
                </div>
                <div className="col-12 col-lg-4 col-md-6 col-sm-12">
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