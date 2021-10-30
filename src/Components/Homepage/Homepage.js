import React from 'react'
import { Link } from 'react-router-dom';
import './homepage.css';
import env from '../../settings';

function Homepage() {
    return (
        <div className="heading__container text-center mt-3">
            <p>
                Hello there 👋 <br />
                This is an Open Source Online Music Web App. <br />
                The Music data and the Api for this App is from the Unofficial Saavan Api. <br />
                You can listen to songs for Free and Ad free in this App.
            </p>
            <div className="homepage__container mt-5">
                <div className="db__container">
                    <p className="dbcontenet__head">
                        To see this project done using MERN
                    </p>
                    <Link to="/DbContent" className="btn btn-success">Click here</Link>
                </div>
                <div className="line">
                    {/* this div is used for producing the line */}
                </div>
                <div className="api__container">
                    <p className="apicontenet__head">
                        To see this project done using React
                    </p>
                    <Link to="/apimusic" className="btn btn-success">Click here</Link>
                </div>
            </div>
            <div className="footer__container mt-5">
                <a href={env.github} target="blank">
                    <i className="fa fa-github" style={{ "fontSize": "48px", "color": "white" }}></i>
                </a>
                <p className="mb-1">
                    Click on the icon to view this project
                </p>
            </div>
        </div>
    )
}

export default Homepage
