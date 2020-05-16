import React, {useState} from "react" 
import {Link} from "react-router-dom"  
import PasswordResetToken from "./PasswordResetToken"
import TopNav from "../TopNav"
import "../../../static/frontend/style/login.css" 
import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [resetPassword, setResetPassword] = useState(false)

	const handleChange = (event) => {
		const name = event.target.name
		const val = event.target.value 
		if(name == "email") {
			setEmail(val)
		} else if(name == "password") {
			setPassword(val)
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const url = "/api/login/"
		const data = {
			email: email,
			password: password
		}
		const response = await fetchPostRequest(url, data)
		if(response.status === 200) {
			window.location.href = "/courses/"
		}else if(response.status === 401) {
			alert("Incorrect email and/or password. Please try again.")
		}
	}

	const handleResetClick = (event, bool) => { 
		event.preventDefault()
		setResetPassword(bool)
	}

	return (
		<>
		<TopNav authenticated={false}/>
		{resetPassword ?
		<PasswordResetToken resetFunc={handleResetClick} /> : 
		<div className="text-center">
			<form className="form-signin" onSubmit={handleSubmit}> 
				<h1 className="h3 mb-3 font-weight-normal">
					Please Login
				</h1>
				<p>
					Need an account? <Link to="/signup/">Sign up</Link> 
				</p>
				<label className="sr-only"></label>
				<input 
					type="email"  
					className="form-control" 
					placeholder="Email" 
					name="email"
					onChange={handleChange}
					required autoFocus 
				/>
				<label className="sr-only"></label>
					<input 
						type="password"  
						className="form-control" 
						placeholder="Password" 
						name="password" 
						onChange={handleChange}
						required />  
				<button className="btn btn-lg btn-primary btn-block" id="login-btn" type="submit">
					Log In
				</button> 
				<p>
					Forgot your password? <a href="#" onClick={(e) => handleResetClick(e, true)}>Reset Password</a> 
				</p>
			</form>
		</div>
		} 
		</>
	)
}

export default Login
