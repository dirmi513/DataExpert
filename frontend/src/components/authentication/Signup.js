import React, {useState} from "react"
import "../../../static/frontend/style/auth/signup.css"
import "../../../static/frontend/style/auth/auth.css"
import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest";
import {
  SIGNUP_URL
} from "../../GlobalVariables"


const Signup = (props) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [incorrectInfo, setIncorrectInfo] = useState(false)
	const [incorrectInfoMessage, setIncorrectInfoMessage] = useState("")
  const [signUpSuccess, setSignUpSuccess] = useState(false)

	const handleChange = (event) => {
		const name = event.target.name
		const val = event.target.value
		if(name === "email") {
			setEmail(val)
		}else if(name === "password") {
			setPassword(val)
		}else if(name === "name") {
			setName(val)
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = {
			email: email,
			password: password,
			name: name
		}
		const response = await fetchPostRequest(SIGNUP_URL, data)
		if(response.status === 201) {
      setSignUpSuccess(true)
		}else if(response.status === 400) {
			const errorMessage = await response.json()
			setIncorrectInfoMessage(errorMessage)
			setIncorrectInfo(true)
		}
	}

	const setIncorrectInfoHandler = (event, bool) => {
		event.preventDefault()
		setIncorrectInfo(bool)
	}

	const handleSuccessfulLogin = (event) => {
    props.resetFunc(event, false)
    setSignUpSuccess(false)
  }

	const handleIncorrectInfo = () => {
		if (incorrectInfo) {
			return (
				<p>
					{incorrectInfoMessage}
					<br />
					<a href="#" onClick={(e) => setIncorrectInfoHandler(e, false)}>Try again</a>
				</p>
			)
		} else if (signUpSuccess) {
      return (
        <p style={{marginTop:"10px"}}>
          You have successfully signed up. Please&nbsp;
          <a href="#" onClick={(e) => handleSuccessfulLogin(e)}>
            Login
          </a>
          &nbsp;and start learning!
        </p>
      )
    }
		return (
			<button className="btn btn-lg btn-primary btn-block" type="submit">
				Sign up
			</button>
		)
	}

	return (
		<>
		<form className="auth-form" id="signup-form" onSubmit={handleSubmit}>
			<h1 className="h3 mb-3 font-weight-normal">
				Sign up
			</h1>
			<p>
				Have an account? <a href="#" onClick={(e) => {props.resetFunc(e, false)}}>Login</a>
			</p>
			<label className="sr-only">
			</label>
				<input
					type="text"
					className="form-control"
					placeholder="Full Name"
					name="name"
					onChange={handleChange}
					required autoFocus/>
			<label className="sr-only">
			</label>
			<input
				type="email"
				className="form-control"
				placeholder="Email Address"
				name="email"
				onChange={handleChange}
				required
			/>
			<label className="sr-only">
			</label>
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					required />
			{handleIncorrectInfo()}
		</form>
		</>
	)
}

export default Signup
