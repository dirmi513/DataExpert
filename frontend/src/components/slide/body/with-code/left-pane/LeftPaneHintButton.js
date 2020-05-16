import React from "react"  
import "../../../../../../static/frontend/style/slide/leftPaneHintButton.css"

const LeftPaneHintButton = (props) => {

	const onClickHint = (event) => { 
		event.preventDefault()
		props.setHintOrAnswer("answer", false) 
		props.setHintOrAnswer("hint", true) 
	}

	const onClickAnswer = (event) => {
		event.preventDefault()
		props.setHintOrAnswer("hint", false) 
		props.setHintOrAnswer("answer", true) 
	}

	return ( 
		<div className="btn-group dropright">
			<button 
				type="button" 
				className="btn btn-secondary dropdown-toggle shadow-none" 
				id="hint-answer-btn"
				data-toggle="dropdown" 
				aria-haspopup="true" 
				aria-expanded="false">
				Need help?
			</button>
			<div className="dropdown-menu">
				<a 
					className="dropdown-item" 
					id="hint"
					href="#" 
					onClick={(e) => onClickHint(e)}
				>
					Get a hint
				</a> 
				
				<a 
					className="dropdown-item" 
					id="answer"
					href="#" 
					onClick={(e) => onClickAnswer(e)}
				>
					See the answer
				</a> 
			</div>
		</div>  
	)
}

export default LeftPaneHintButton