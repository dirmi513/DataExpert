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
        ],{
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
                <a
                    href="#"
                    className="top-banner-link"
                    onClick={() => setLogIn(true)}
                >
                    Start Learning
                </a>
            </div>
            <h1 className="top-banner-heading">
              Learn Python Programming - Interactively
            </h1>
            <p className="top-banner-paragraph">
              Get the skills you need to become a competent Python programmer - no experience required!
            </p>

            <div className="top-banner-image-div">
              <img
                  className="top-banner-image"
                  src="https://s3.amazonaws.com/dataexpert.images/Media/landing_page.png"
              />
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
