import React from "react"
import {Link} from "react-router-dom" 
import "../../static/frontend/style/navbar.css" 


const TopNav = () => {
	return (
		<div className="navbar top-nav" id="top-nav">
			<Link to="/app/courses/" className="home-pages">DATAEXPERT</Link>
			<Link to="/logout/" className="home-pages" id="logout">Logout</Link>
		</div> 
	)

}

export default TopNav