import React, {useState} from "react"
import axios from "axios" 
import {Link} from "react-router-dom"
import TopNav from "../TopNav"
import "../../../static/frontend/style/signup.css" 

const Signup = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const BASE_URL = "http://localhost:8000"

	const handleChange = (event) => {
		const name = event.target.name
		const val = event.target.value 
		if(name == "email") {
			setEmail(val)
		} else if(name == "password") {
			setPassword(val)
		} else if(name == "name") {
			setName(val)
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault() 
		try {
			const response = await axios.post(`${BASE_URL}/api/user/create/`, {
				email: email,
				password: password,
				name: name,
				headers: { 
					"Content-Type": "application/json",
					"accept": "application/json"
				}
			}) 
			if(response.status == 201) { 
				window.location.href = "/login/"
			}  
		} catch (error) {
			const errResponse = error.response 
			try{
				if(errResponse.data.email[0] == "Enter a valid email address.") { 
					alert("Please enter a valid email address.")
				}else{
					alert(errResponse.data) 
				} 
			}catch{ 
				alert(errResponse.data)
			}
		}
	}

	return (
		<>
		<TopNav authenticated={false}/>
		<div className="text-center">
			<form className="form-signup" onSubmit={handleSubmit}> 
				<h1 className="h3 mb-3 font-weight-normal">
					Sign up 
				</h1> 
				<p>
					Have an account? <Link to="/login/">Login</Link> 
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
				<button className="btn btn-lg btn-primary btn-block" type="submit">
					Sign up 
				</button>
			</form>
		</div>
		</>
	)
}

export default Signup