import React, {useState} from "react"
import {Link} from "react-router-dom"
import TopBanner from "../landing/TopBanner"
import "../../../static/frontend/style/auth/signup.css"
import "../../../static/frontend/style/auth/auth.css"
import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest";


const Signup = (props) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const BASE_URL = "http://localhost:8000"
	const [incorrectInfo, setIncorrectInfo] = useState(false)
	const [incorrectInfoMessage, setIncorrectInfoMessage] = useState("")

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
		const url = `${BASE_URL}/api/user/create/`
		const data = {
			email: email,
			password: password,
			name: name
		}
		const response = await fetchPostRequest(url, data)
		if(response.status === 201) {
			window.location.href = "/login/"
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

	const handleIncorrectInfo = () => {
		if (incorrectInfo) {
			return (
				<p>
					{incorrectInfoMessage}
					<br />
					<a href="#" onClick={(e) => setIncorrectInfoHandler(e, false)}>Try again</a>
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