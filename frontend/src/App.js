import React from "react"
import CoursesApp from "./components/app/CoursesApp"
import Slide from "./components/app/slide/Slide"
import Logout from "./components/authentication/Logout"
import Homepage from "./components/landing/Homepage"
import PasswordResetConfirm from "./components/authentication/PasswordResetConfirm"
import {
	COURSES_APP_URI, GET_COURSES_APP_SLIDE_URI, HOMEPAGE_URI,
	LOGOUT_URI, PASSWORD_RESET_URI
} from "./GlobalVariables"
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
