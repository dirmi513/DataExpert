import React from "react"
import Blog from "./landing/Blog"
import Courses from "./landing/Courses"
import CoursesApp from "./CoursesApp"
import Slide from "./slide/Slide"
import Logout from "./authentication/Logout"
import Homepage from "./landing/Homepage"
import PasswordResetConfirm from "./authentication/PasswordResetConfirm"
import {
	COURSES_APP_URI, GET_COURSES_APP_SLIDE_URI, HOMEPAGE_URI,
	LOGOUT_URI, PASSWORD_RESET_URI, COURSES_LANDING_PAGE_URI, BLOG_LANDING_PAGE_URI
} from "../GlobalVariables"
import {Switch, Route} from "react-router-dom"
import "@babel/polyfill"


const App = () => {
	return (
		<> 
		<Switch> 

			<Route exact path={HOMEPAGE_URI}>
				<Homepage />
			</Route>

			<Route exact path={LOGOUT_URI}>
				<Logout />
			</Route>

			<Route exact path={PASSWORD_RESET_URI}>
				<PasswordResetConfirm />
			</Route>

			<Route exact path={COURSES_LANDING_PAGE_URI}>
				<Courses />
			</Route>

			<Route exact path={BLOG_LANDING_PAGE_URI}>
				<Blog />
			</Route>

			<Route exact path={COURSES_APP_URI}>
				<CoursesApp />
			</Route>

			<Route 
				path={GET_COURSES_APP_SLIDE_URI}
				component={Slide} 
			/>

		</Switch> 
		</>
	)
}

export default App