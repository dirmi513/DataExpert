import React from "react"
import {Link} from "react-router-dom" 
import "../../static/frontend/style/navbar.css" 

const TopNav = (props) => {   
	const authenticated = () => {
		if(props.authenticated === true) {
			return <Link to="/logout/" className="home-pages">Logout</Link>
		}else {
			return <Link to="/signup/" className="home-pages">Start Learning</Link>
		} 
	}
	
	return (
		<div className="navbar top-nav" id="top-nav">
			<Link to="/" className="home-pages">DATAEXPERT</Link>
			<Link to="/courses/" id="courses">Courses</Link> 
			{authenticated()}
			<Link to="/blog/" className="home-pages">Blog</Link> 
		</div> 
	)

}

export default TopNav