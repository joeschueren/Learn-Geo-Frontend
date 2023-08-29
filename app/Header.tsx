import React from "react";
import "./globals.css";

export default function Header(){
    return(<div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-container">
  <div className="container-fluid header-div">
    <a className="navbar-brand" href="/">Learn Geo <i className="fa-solid fa-earth-americas"></i></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Games
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/study">Study</a></li>
            <li><a className="dropdown-item" href="/higher-lower">Higher or Lower</a></li>
            <li><a className="dropdown-item" href="/capitals">Learn Capitals</a></li>
            <li><a className="dropdown-item" href="/flags">Learn Flags</a></li>
            <li><a className="dropdown-item" href="/mastery">Mastery</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/api">API Docs</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>)

}