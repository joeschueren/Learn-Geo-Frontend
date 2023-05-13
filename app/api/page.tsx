import React from "react";

function Api(){
    return(<div>
        <div className="fluid-container">
            <div className="title">
                <h1 className="api-title">Learn Geo API</h1>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-3 col-sm-0">
                    <div className="link-div">
                        <div className="link-box">
                            <a href="#overview" className="api-link">Overview</a><br/>
                        </div>
                        <div className="link-box">
                            <a href="#retrieving-info" className="api-link">Retrieving Information</a>
                        </div>
                        <div className="link-box">
                            <a href="#regions" className="api-link">Retrieving by Region</a>
                        </div>
                        <div className="link-box">
                            <a href="#individually" className="api-link">Retrieving by Name</a>
                        </div>
                        <div className="link-box">
                            <a href="#capital" className="api-link">Retrieving by Capital</a>
                        </div>
                        <div className="link-box">
                            <a href="#population" className="api-link">Retrieving by Population</a>
                        </div>
                        <div className="link-box">
                            <a href="#random" className="api-link">Retrieving at Random</a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-9 col-md-9 col-sm-12">
                    <div className="all-features-div">
                    <div className="all-features">
                        <div id="overview" className="feature-div">
                            <h2 className="topic-header">Overview</h2>
                            <p>The Learn Geo API is free to use for anyone. It allows users to get details
                                about the countries of the world by region, country, population, or even at random.
                            </p>
                        </div>
                        <div id="retrieving-info" className="feature-div">
                            <h2 className="topic-header">Retrieving Information</h2>
                            <p>To retrieve the information about the countries make a get request to the route:
                                "add route here" a request to the home route will return all countries of the world
                                as an array of objects with the properties name, capital, longitude, latitude, population, 
                                code (ISO code), and continent.
                            </p>
                        </div>
                        <div id="regions" className="feature-div">
                            <h2 className="topic-header">Retrieving by Region</h2>
                            <p>To retrieve by region using the following routes.</p>
                            <table>
                                <thead>
                                    <tr>
                                    <th>Region</th>
                                    <th>Route</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>North America</td>
                                    <td>/na</td>
                                    </tr>
                                    <tr>
                                    <td>South America</td>
                                    <td>/sa</td>
                                    </tr>
                                    <tr>
                                    <td>Europe</td>
                                    <td>/eu</td>
                                    </tr>
                                    <tr>
                                    <td>Asia</td>
                                    <td>/as</td>
                                    </tr>
                                    <tr>
                                    <td>Africa</td>
                                    <td>/af</td>
                                    </tr>
                                    <tr>
                                    <td>Oceania</td>
                                    <td>/oc</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="individually" className="feature-div">
                            <h2 className="topic-header">Retrieving by Name</h2>
                            <p>To retrieve an individual country by name specify the route /countries/country  where
                                country is the country you need the information from. An example of a retrieving Austria
                                would be /countries/Austria. The name of the country is not case sensitive.
                            </p>
                        </div>
                        <div id="capital" className="feature-div">
                            <h2 className="topic-header">Retrieving by Capital</h2>
                            <p>To retrieve by capital specify the route /capital/capital name where capital name is the
                                capital of the country you need the information from. An example of retrieving Paris would
                                be /capital/Paris. The name of the capital is not case sensitive.
                            </p>
                        </div>
                        <div id="population" className="feature-div">
                            <h2 className="topic-header">Retrieving by Population</h2>
                            <p>To retrieve by population you can specify the route /population/comparison/amount.
                                comparison can be either greater or lesser. Amount is the population threshold for retrieving
                                all countries with a population greater or lesser than that amount. To retrieve all the countries
                                with less than 1 million population you would specify the route, /population/less/1000000.
                            </p>
                        </div>
                        <div id="random" className="feature-div">
                            <h2 className="topic-header">Retrieving at Random</h2>
                            <p>To retrieve countries at random use the route /random/amount, where amount is the amount of random
                                countries you want to receive. To receive 5 random countries you would specify the route, /random/5.
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Api;