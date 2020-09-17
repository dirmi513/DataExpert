import React, { useState, useEffect } from "react"
import RestoreCodeModal from "./RestoreCodeModal"
import lambdaOutput from "../../../../../../../static/frontend/scripts/lambdaOutput"
import codeOutput from "../../../../../../../static/frontend/scripts/codeOutput"
import SimpleBarReact from "simplebar-react"
import "../../../../../../../static/frontend/style/app/slide/bottomRightPane.css"



const BottomRightPane = (props) => {
	const [modalShow, setModalShow] = useState(false)
	const [executing, setExecuting] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	useEffect(() => {
		codeOutput()
	}, [])

	useEffect(() => {
		document.getElementById("output-txt").innerHTML = ""
	}, [props.slide])

	const executeCode = (event, submit) => {
		event.preventDefault()
		if(submit && !executing && props.correctAnswer !== null) {
			lambdaOutput("T", props.course, props.lesson, props.slide, lambdaExecutorSetState)
		}else if(!submit && !submitting) {
			lambdaOutput("F", props.course, props.lesson, props.slide, lambdaExecutorSetState)
		}
	}

	const lambdaExecutorSetState = (submit, bool) => {
		submit ?
		setSubmitting(bool) :
		setExecuting(bool)
	}

	return (
		<div className="bottomRightPane">
			<div className="buttons-holder">
				<button
					type="submit"
					id="execute-code"
					className="button lambda"
					onClick={(e) => executeCode(e, false)}
				>
					{
						executing ?
						<>
						<span
							className="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						>
						</span>
						<span>Executing...</span>
						</>
						:
						<span>Execute Code</span>
					}
				</button>

				<button
					type="submit"
					id="submit-answer"
					className="button lambda"
					onClick={(e) => executeCode(e, true)}
				>
					{
						submitting ?
						<>
						<span
							className="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						>
						</span>
						<span>Grading...</span>
						</>
						:
						<span>Submit Answer</span>
					}
				</button>

				<button
					type="button"
					className="restore material-icons"
					onClick={() => setModalShow(true)}
				>
					restore
				</button>
				<RestoreCodeModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					course={props.course}
					lesson={props.lesson}
					slide={props.slide}
					lessonData={props.lessonData}
					get={props.get}
					update={props.update}
				/>

			</div>

			<SimpleBarReact className="code-output">
				<div id="output-txt"></div>
			</SimpleBarReact>
        </div>
	)
}

export default BottomRightPane
