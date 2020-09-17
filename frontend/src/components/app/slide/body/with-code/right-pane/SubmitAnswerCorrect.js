import React, {useEffect} from "react"
import codeUpdate from "../../../../../../../static/frontend/scripts/codeUpdate"
import "../../../../../../../static/frontend/style/app/slide/submitAnswerResult.css"

const SubmitAnswerCorrect = (props) => {

	const nextOnClick = (event) => {
		event.preventDefault()
		const arr = codeUpdate(props.course, props.lesson, props.slide, props.coded, "TF", props.lessonData )
		const urlArr = props.nextSlideURL.split("/")
		const slide = urlArr[urlArr.length - 1]
		props.update(arr)
		props.get(arr, slide)
	}

	const dissolveSubmitAnswerPopup = () => {
		document.querySelector(".submit-answer-result-correct").style.opacity = "0"
		document.querySelector(".submit-answer-result-correct").style.pointerEvents = "none"
	}

	const closeOnClick = () => {
		dissolveSubmitAnswerPopup()
	}

	useEffect(() => {
		dissolveSubmitAnswerPopup()
	}, [props.slide])

	return (
		<div className="submit-answer-result-correct">
			<p className="submit-answer-result-p">
				You answered correctly!
			</p>
			<button
				className="btn btn-primary shadow-none submit-answer-next-slide-btn"
				type="submit"
				onClick = {(e) => {nextOnClick(e)}}
			>
				Next Slide &#8680;
			</button>
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
