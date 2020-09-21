import React from "react"
import TopBanner from "./TopBanner"
import "../../../static/frontend/style/landing/homepage.css"


const Homepage = () => {
	return (
		<div className="homepage-wrapper">
			<TopBanner />
			<div className="footer">
        <p className="footer-links">
          2020 |&nbsp;
          <a href="https://github.com/dirmi513/DataExpert" target="_blank">GitHub</a> |&nbsp;
          <a href="https://www.linkedin.com/in/danielirmihaev/" target="_blank" >LinkedIn</a>
        </p>
      </div>
		</div>
	)
}

export default Homepage
