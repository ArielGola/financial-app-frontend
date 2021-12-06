// Modules
import React from 'react';
import { Link } from "react-router-dom";

// Styles
import "./Footer.css";

function Footer() {

    const onTopScreen = () => {
        window.scrollTo(0, 0)
    };

    return (
        <div className="back-dark">
            <div className="container flex-on">
                <div className="text-light m-4">
                    <h5>Created by: Ariel Gola</h5>
                    <p>Copyright 2021</p>
                    <div className="text-light back-icon"></div>
                </div>
                <div className="text-light m-4 wide-about">
                    <h5>About</h5>
                    <p>This project was born as a response to the problem of easily calculating what we would have to have saved to retire and cover our living costs. That is our motivation, to help you become aware of your finances.</p>
                </div>
            </div>
            <div className="back-black p-2 flex-links">
                <Link className="link-footer" to="/home" onClick={onTopScreen}>
                    Home
                </Link>
                <Link className="link-footer" to="/goals" onClick={onTopScreen}>
                    Goals
                </Link>
                <Link className="link-footer" to="/create" onClick={onTopScreen}>
                    Create a Goal
                </Link>
                <Link className="link-footer" to="/expenses" onClick={onTopScreen}>
                    My Expenses
                </Link>
                <Link className="link-footer" to="/calculator" onClick={onTopScreen}>
                    Calculate
                </Link>
            </div>
        </div>
    )
}

export default Footer;
