import React, {useState, useEffect, useRef} from "react"
import LeftPaneHintButton from "./LeftPaneHintButton"
import LeftPaneBody from "./LeftPaneBody"
import AceEditor from "react-ace"
import "../../../../../../../static/frontend/ace/src-noconflict/theme-crimson_editor"

const LeftPane = (props) => {
	const [showHint, setShowHint] = useState(false)
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
	const bottomOfLeftPaneRef = useRef(null)

	const scrollToBottom = () => {
		bottomOfLeftPaneRef.current.scrollIntoView({
			behavior: "smooth"
		 })
	}

	const setHintAnswer = (val, bool) => {
		if(val == "hint") {
			setShowHint(bool)
		}else if(val == "answer") {
			setShowCorrectAnswer(bool)
		}
	}

	useEffect(() => {
		setShowHint(false)
		setShowCorrectAnswer(false)
	}, [props.slide])

	useEffect(() => {
		if(showCorrectAnswer) {
			const editor = ace.edit("ace-editor-2")
			editor.renderer.$cursorLayer.element.style.display = "none"
			scrollToBottom()
		}else if(showHint) {
			scrollToBottom()
		}
	}, [showCorrectAnswer, showHint])

	const belowLeftPane = () => {
		let divBody = <></>
		if(showHint) {
			divBody =
				<>
					<hr id="hr-hint-answer"/>
					<h4 id="head-hint-answer">Hint</h4>
					<p id="p-hint">PROPS.HINT</p>
				</>
		}else if(showCorrectAnswer) {
			const maxLines = props.correctAnswer.split("\n").length
			divBody =
				<>
					<hr id="hr-hint-answer"/>
					<h4 id="head-hint-answer">Correct Answer</h4>
					<AceEditor
						className="ace-editor-correct-answer"
						name="ace-editor-2"
						mode="python"
						theme="crimson_editor"
						fontSize={14}
						wrapEnabled={true}
						showPrintMargin={false}
						showGutter={true}
						value={props.correctAnswer}
						readOnly={true}
						minLines={1}
						maxLines={maxLines}
						setOptions={{
							highlightGutterLine: false,
							highlightSelectedWord: false,
							highlightActiveLine: false
						}}
					/>
				</>
		}else {
			return <></>
		}
		return (
			<div
				className="left-pane-hint-answer"
				ref={bottomOfLeftPaneRef}
			>
				{divBody}
			</div>
		)
	}

	return (
		<>
			<LeftPaneBody html={props.html} />
			{
				props.correctAnswer === null ?
				null :
				<>
					<LeftPaneHintButton setHintOrAnswer={setHintAnswer} />
					{belowLeftPane()}
				</>
			}
		</>
	)
}

export default LeftPane
