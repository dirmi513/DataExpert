import React, {useState} from "react" 
import "../../../static/frontend/style/passwordResetToken.css"
import TopNav from "../TopNav"
import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest"

const PasswordResetToken = (props) => {
	const [email, setEmail] = useState("")
	const [buttonLoad, setButtonLoad] = useState(false)
	const [reset, setReset] = useState(false)
	const [resetMessage, setResetMessage] = useState("")

	const handleChange = (event) => {
		const name = event.target.name
		const val = event.target.value 
		if(name === "email") {
			setEmail(val)
		} 
	}

	const requestPasswordResetEmail = async (event) => {
		event.preventDefault()
		setButtonLoad(true)
		const url = "/api/reset-password/"
		const data = {
			email: email
		}
		const response = await fetchPostRequest(url, data)
		const genericErrorMessage = "There was an error. Please try again later."
		if (response.status === 200) {
			setResetMessage(`Password reset email has been sent to ${email}`)
		}else if (response.status === 400) {
			const responseData = await response.json()
			try {
				const responseMessage = responseData.email[0]
				const missingEmailError = "There is no active user associated with this e-mail address or the password can not be changed"
				const validEmail = "Enter a valid email address."
				if (responseMessage === missingEmailError || responseMessage === validEmail) {
					setResetMessage("There is no active user associated with this email address.")
				}else {
					setResetMessage(genericErrorMessage)
				}
			}catch(error) {
				setResetMessage(genericErrorMessage)
			}
		}else {
			setResetMessage(genericErrorMessage)
		}
		setReset(true)
	}

	const handleReset = () => {
		if (reset && buttonLoad) {
			return (
				<p> {resetMessage} </p>
			)
		}else if (buttonLoad) {
			return (
				<button className="btn btn-lg btn-primary btn-block" type="button" id="emailBtn" disabled>
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Sending...
				</button>
			)
		}else {
			return (
				<button className="btn btn-lg btn-primary btn-block" type="submit">
					Send Password-Reset Email
				</button>
			)
		}
	}

	return (
		<>
		<TopNav authenticated={false}/>
		<div className="text-center">
			<form className="form-email-password-reset" onSubmit={(e) => requestPasswordResetEmail(e)}>  
				<h1 className="h3 mb-3 font-weight-normal">
					Enter Email Address 
				</h1> 
				<p>
					Remember your password? <a href="#" onClick={(e) => props.resetFunc(e, false)}>Login</a> 
				</p>
				<label className="sr-only"> 
				</label>
				<input 
					type="email"  
					className="form-control signup" 
					placeholder="Email Address" 
					name="email"
					onChange={handleChange}
					required  
				/>
				{handleReset()}
			</form>
		</div>
		</>
	)
}

export default PasswordResetToken