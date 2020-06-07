import React, {useState} from "react" 
import {Link, useParams} from "react-router-dom"
import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest"
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
		if(name === "password") {
			setPassword(val)
		} 
	}  

	const handleSubmit = async (event) => {
		event.preventDefault()
		setButtonLoad(true)
		const url = "/api/reset-password/confirm/"
		const data = {
			password: password,
			token: token
		}
		const response = await fetchPostRequest(url, data)
		if (response.status === 200) {
			setUnderButtonText("success")
		}else {
			const genericErrorMessage = "There was an error resetting your password. Please try again later."
			const responseMessage = await response.json()
			if (response.status === 400) {
				if ('password' in responseMessage) {
					setErrorMessage(responseMessage.password[0])
				}else {
					setErrorMessage(genericErrorMessage)
				}
			}else {
				setErrorMessage(genericErrorMessage)
			}
			setUnderButtonText("error")
		}
		setButtonLoadComplete(true)
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
				if(underButtonText === "success") {
					return ( 
						<p>
							Password successfully reset. <Link to="/login/">Login</Link>
						</p> 
					)
				}else if(underButtonText === "error") {
					return (
						<p>
							{errorMessage}
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