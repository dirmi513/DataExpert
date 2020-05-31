import React from "react"
import {Link} from "react-router-dom" 
import "../../static/frontend/style/navbar.css" 

const TopNav = (props) => {
	console.log(props)
	const authenticated = () => {
		if(props.authenticated) {
			return (
				<>
					<Link to="/courses/" className="home-pages">DATAEXPERT</Link>
					<Link to="/logout/" className="home-pages" id="logout">Logout</Link>
				</>
			)
		}else {
			return (
				<>
					<Link to="/" className="home-pages">DATAEXPERT</Link>
					<Link to="/courses/" id="courses">Courses</Link>
					<Link to="/signup/" className="home-pages">Start Learning</Link>
					<Link to="/blog/" className="home-pages">Blog</Link>
				</>
			)
		} 
	}
	
	return (
		<div className="navbar top-nav" id="top-nav">
			{authenticated()}
		</div> 
	)

}

export default TopNav