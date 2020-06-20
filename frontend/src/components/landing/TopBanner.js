import React, {useState} from "react"
import {Link} from "react-router-dom"
import Login from "../authentication/Login"
import "../../../static/frontend/style/landing/topBanner.css"


const TopBanner = () => {
    const [login, setLogIn] = useState(false)

    const updateLogIn = async () => {
        const authForm = document.querySelector(".auth-form-animate")
        authForm.animate([
            {
                // from
                left: "50%",
                opacity: 1
            },
            {
                // to
                left: "75%",
                opacity: 0
            }
        ], {
            duration: 200
        })
        await sleep(190)
        setLogIn(false)
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <>
        <div className="top-banner">
            <div className="top-banner-links-container">
                <Link to="/" className="top-banner-link">Why DataExpert?</Link>
                <Link to="/courses/" className="top-banner-link">Courses</Link>
                <a
                    href="#"
                    className="top-banner-link"
                    onClick={() => setLogIn(true)}
                >
                    Start Learning
                </a>
                <Link to="/blog/" className="top-banner-link">Blog</Link>
            </div>
        </div>
        {
            login ?
            <Login updateLogIn={updateLogIn}/> :
            null
        }
        </>
    )

}

export default TopBanner