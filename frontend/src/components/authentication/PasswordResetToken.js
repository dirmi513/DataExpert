import React, {useState} from "react" 
import "../../../static/frontend/style/passwordResetToken.css"
import TopNav from "../TopNav"
import axios from "axios"

const PasswordResetToken = (props) => {
	const [email, setEmail] = useState("")
	const [buttonLoad, setButtonLoad] = useState(false) 

	const handleChange = (event) => {
		const name = event.target.name
		const val = event.target.value 
		if(name == "email") {
			setEmail(val)
		} 
	}

	const removeButtonAddText = (buttonId, text) => {
		document.querySelector(buttonId).remove()
		const paragraphText = document.createElement("p")
		paragraphText.append(document.createTextNode(text))
		document.querySelector(".form-email-password-reset").append(paragraphText)
	}

	const requestPasswordResetEmail = async (event) => {
		event.preventDefault()
		setButtonLoad(true)
		try {
			await axios.post("/api/reset-password/", { email: email }) 
			removeButtonAddText("#emailBtn", `Password reset email has been sent to ${email}`)
		}catch(error) {
			try{
				if(error.response.data.email[0] == "There is no active user associated with this e-mail address or the password can not be changed"){
					removeButtonAddText("#emailBtn", `There is no active user associated with this e-mail address. Please try again.`)
				}
			}catch{
				removeButtonAddText("#emailBtn", `There was an unknown error. Please try again.`)
			}  
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
				{
					buttonLoad ?
					<>
						<button className="btn btn-lg btn-primary btn-block" type="button" id="emailBtn" disabled>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Sending...
						</button>
					</>:
					<button className="btn btn-lg btn-primary btn-block" type="submit">
						Send Password-Reset Email
					</button>
				}
			</form>
		</div>
		</>
	)
}

export default PasswordResetToken