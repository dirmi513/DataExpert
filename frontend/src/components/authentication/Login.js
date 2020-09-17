import React, {useState, useEffect} from "react"
import PasswordResetToken from "./PasswordResetToken"
import Signup from "./Signup"
import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest"
import "../../../static/frontend/style/auth/login.css"
import "../../../static/frontend/style/auth/auth.css"
import {
	COURSES_APP_URI, GET_COURSES_APP_INFO_URI, LOGIN_URI,
  GUEST_EMAIL, GUEST_PASSWORD
} from "../../GlobalVariables"


const Login = (props) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [resetPassword, setResetPassword] = useState(false)
	const [incorrectInfo, setIncorrectInfo] = useState(false)
	const [signup, setSignup] = useState(false)

	useEffect(() => {
		// Check if the user is already logged in
		const checkLoggedIn = async () => {
			const response = await fetch(GET_COURSES_APP_INFO_URI)
			if (response.status === 200) {
				window.location.href = COURSES_APP_URI
			}
		}
		checkLoggedIn()
	}, [])

	const handleChange = (event) => {
		const name = event.target.name
		const val = event.target.value
		if(name === "email") {
			setEmail(val)
		} else if(name === "password") {
			setPassword(val)
		}
	}

	const loginRequest = async (userEmail, userPwd) => {
    const data = {
      email: userEmail,
      password: userPwd
    }
    const response = await fetchPostRequest(LOGIN_URI, data)
    if(response.status === 200) {
      window.location.href = COURSES_APP_URI
    }else if(response.status === 401) {
      setIncorrectInfo(true)
    }
  }

	const handleSubmit = (event) => {
		event.preventDefault()
    loginRequest(email, password)
	}

	const handleIncorrectInfo = (event, bool) => {
		event.preventDefault()
		setIncorrectInfo(bool)
	}

	const logInError = () => {
		if (incorrectInfo) {
			return (
				<p>
					Incorrect email and/or password.
					<br />
					Please <a href="#" onClick={(e) => handleIncorrectInfo(e, false)}>try again</a>
				</p>
			)
		}
		return (
			<button className="btn btn-lg btn-primary btn-block" id="login-btn" type="submit">
				Log In
			</button>
		)
	}

	const handleResetPasswordClick = (event, bool) => {
		// When user clicks Reset Password button
		event.preventDefault()
		setResetPassword(bool)
	}

	const submitClick = (event, bool) => {
		// When user clicks on the Sign up button
		event.preventDefault()
		setSignup(bool)
	}

	const handleGuestLogin = (event) => {
	  event.preventDefault()
    loginRequest(GUEST_EMAIL, GUEST_PASSWORD)
  }

	return (
		<>
		<div className="auth-container" onClick={() => props.updateLogIn()}/>
		<div className="auth-form-animate">
		{resetPassword ?
		<PasswordResetToken resetFunc={handleResetPasswordClick} /> :
		signup ?
			<Signup resetFunc={submitClick} /> :
			<>
			<form className="auth-form" id="login-form" onSubmit={handleSubmit}>
				<h1 className="h3 mb-3 font-weight-normal">
					Please Login
				</h1>
				<p style={{marginBottom:"10px"}}>
          Need an account?&nbsp;
          <a
            href="#"
            onClick={(e) => {submitClick(e, true)}}
          >
            Sign up
          </a>
          <br/>
          <a
            href="#"
            onClick={(e) => {handleGuestLogin(e)}}
            style={{marginTop:"10px"}}
          >
            GUEST LOGIN
          </a>
        </p>
				<input
					type="email"
					className="form-control"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					required autoFocus
				/>
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					required />
				{logInError()}
				<p>
					Forgot your password?&nbsp;
					<a
						href="#"
						onClick={(e) => handleResetPasswordClick(e, true)}
					>
						Reset Password
					</a>
				</p>
			</form>
			</>
		}
		</div>
		</>
	)
}

export default Login
