import React, {useState} from "react" 
import {Link, useParams} from "react-router-dom"
import axios from "axios" 
import TopNav from "../TopNav"
import "../../../static/frontend/style/passwordResetConfirm.css"

const PasswordResetConfirm = () => {
	const [password, setPassword] = useState("") 
	const [buttonLoad, setButtonLoad] = useState(false) 
	const [buttonLoadComplete, setButtonLoadComplete] = useState(false) 
	const [underButtonText, setUnderButtonText] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const {token} = useParams()
	
	const handleChange = (event) => {
		const name = event.target.name
		const val = event.target.value 
		if(name == "password") {
			setPassword(val)
		} 
	}  

	const handleSubmit = async (event) => {
		event.preventDefault()
		setButtonLoad(true)
		try {
			await axios.post("/api/reset-password/confirm/", {
				password: password,
				token: token
			}) 
			setUnderButtonText("success")
			setButtonLoadComplete(true)
		}catch(error) { 
			console.log(error.response)
			setUnderButtonText("error")
			try {   
				setErrorMessage(error.response.data.password[0]) 
			}catch {
				try{
					const message = error.response.data.status
					if(message == "notfound" || message == "expired"){
						setErrorMessage("Your password reset token has expired.")
					}
				}catch{
					setErrorMessage("There was an error resetting your password.")
				} 
			}finally {
				setButtonLoadComplete(true) 
			} 
		}
	}

	const buttonOrText = () => {
		if(buttonLoad){
			if(!buttonLoadComplete) {
				return (
					<>
						<button 
							className="btn btn-lg btn-primary btn-block" 
							type="button" 
							id="passwordBtn" 
							disabled
						>
							<span 
								className="spinner-border spinner-border-sm" 
								role="status" 
								aria-hidden="true"
							>
							</span>
							Updating Password...
						</button>
					</> 
				)
			}else {
				if(underButtonText == "success") {
					return ( 
						<p>
							Password successfully reset. <Link to="/login/">Login</Link>
						</p> 
					)
				}else if(underButtonText == "error") {
					if(errorMessage == "Your password reset token has expired." || errorMessage == "There was an error resetting your password.") {
						return ( <p> {errorMessage}  </p> )
					}
					return (
						<p>
							{errorMessage} Please try <a href="#" onClick={() => setButtonLoad(false)}>again</a>
						</p>
					)
				}
			}

		}
		return (
			<button className="btn btn-lg btn-primary btn-block" type="submit">
				Update Password
			</button>
		)
	}

	return (
		<>
		<TopNav authenticated={false}/>
		<div className="text-center"> 
			<form className="form-password-reset" onSubmit={(e) => handleSubmit(e)}>  
				<h1 className="h3 mb-3 font-weight-normal">
					Enter New Password
				</h1>  
				<label className="sr-only"> </label>
					<input 
						type="password"  
						className="form-control" 
						placeholder="Password" 
						name="password" 
						onChange={handleChange}
						required />  
				{buttonOrText()}
			</form>
		</div>
		</>
	)
}

export default PasswordResetConfirm