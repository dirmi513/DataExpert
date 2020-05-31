import React from "react"
import Blog from "./blog"
import Courses from "./Courses" 
import Slide from "./slide/Slide"
import Login from "./authentication/Login"
import Logout from "./authentication/Logout"
import Signup from "./authentication/Signup"
import Homepage from "./Homepage"
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

			<Route exact path="/signup/">
				<Signup />
			</Route>

			<Route exact path="/login/">
				<Login />
			</Route>

			<Route exact path="/logout/">
				<Logout />
			</Route>

			<Route exact path="/courses/">
				<Courses />
			</Route>

			<Route exact path="/blog/">
				<Blog />
			</Route>

			<Route 
				path="/courses/:course/:lesson/:slide/" 
				component={Slide} 
			/>

			<Route exact path="/reset-password/:token">
				<PasswordResetConfirm />
			</Route>

		</Switch> 
		</>
	)
}

export default App