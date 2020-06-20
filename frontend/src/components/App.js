import React from "react"
import Blog from "./landing/Blog"
import Courses from "./landing/Courses"
import CoursesApp from "./CoursesApp"
import Slide from "./slide/Slide"
import Login from "./authentication/Login"
import Logout from "./authentication/Logout"
import Signup from "./authentication/Signup"
import Homepage from "./landing/Homepage"
import PasswordResetConfirm from "./authentication/PasswordResetConfirm" 
import {Switch, Route} from "react-router-dom"
import "@babel/polyfill"


const App = () => {
	return (
		<> 
		<Switch> 

			<Route exact path="/">
				<Homepage />
			</Route>

			<Route exact path="/logout/">
				<Logout />
			</Route>

			<Route exact path="/reset-password/:token">
				<PasswordResetConfirm />
			</Route>

			<Route exact path="/courses/">
				<Courses />
			</Route>

			<Route exact path="/blog/">
				<Blog />
			</Route>

			<Route exact path="/app/courses/">
				<CoursesApp />
			</Route>

			<Route 
				path="/app/courses/:course/:lesson/:slide/"
				component={Slide} 
			/>

		</Switch> 
		</>
	)
}

export default App