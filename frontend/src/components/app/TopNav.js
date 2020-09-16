import React from "react"
import {Link} from "react-router-dom"
import "../../../static/frontend/style/navbar.css"
import { COURSES_APP_URI, LOGOUT_URI } from "../../GlobalVariables"

const TopNav = () => {
	return (
		<div className="navbar top-nav" id="top-nav">
			<Link to={COURSES_APP_URI} className="home-pages">DATAEXPERT</Link>
			<Link to={LOGOUT_URI} className="home-pages" id="logout">Logout</Link>
		</div>
	)

}

export default TopNav
