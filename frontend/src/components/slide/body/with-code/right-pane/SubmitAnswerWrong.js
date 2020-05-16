import React, {useEffect} from "react"    
import "../../../../../../static/frontend/style/slide/submitAnswerResult.css"

const SubmitAnswerCorrect = (props) => {    

	const dissolveSubmitAnswerPopup = () => {
		document.querySelector(".submit-answer-result-wrong").style.opacity = "0"
		document.querySelector(".submit-answer-result-wrong").style.pointerEvents = "none"
	}

	const closeOnClick = () => {
		dissolveSubmitAnswerPopup()
	}

	useEffect(() => {
		dissolveSubmitAnswerPopup()
	}, [props.slide])

	return (
		<div className="submit-answer-result-wrong"> 
			<p className="submit-answer-result-wrong-p">
				You answered incorrectly! Please try again.
			</p>  
			<button 
				type="button" 
				className="close submit-answer-result-close" 
				aria-label="Close"
				onClick={() => closeOnClick()}
			>
				<span>
					&times;
				</span>
			</button>
		</div>
	)
}

export default SubmitAnswerCorrect 