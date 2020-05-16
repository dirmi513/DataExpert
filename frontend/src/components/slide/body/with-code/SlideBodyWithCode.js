import React, {useEffect, useRef} from "react"  
import LeftPane from "./left-pane/LeftPane"
import BottomRightPane from "./right-pane/BottomRightPane"  
import TextEditor from "./right-pane/TextEditor" 
import SubmitAnswerCorrect from "./right-pane/SubmitAnswerCorrect"
import SubmitAnswerWrong from "./right-pane/SubmitAnswerWrong"
import {loadPageSplitScripts, removePageSplitScripts} from "../../../../../static/frontend/scripts/loadPageSplitScripts"
import "../../../../../static/frontend/style/slide/slideBody.css"   
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"

const SlideWithCode = (props) => {    
	const leftPaneRef = useRef() 
	
	useEffect(() => { 
		// Loads  page split scripts into DOM when component mounts
		loadPageSplitScripts()

		// Removes page split scripts from DOM when component un-mounts
		return () => { 
			removePageSplitScripts()
		}
	}, [])
	
	useEffect(() => {
		// When a user goes to the next slide, scroll the left 
		// pane content to the top
		leftPaneRef.current.getScrollElement().scrollTop = 0
	}, [props.slide]) 
		
	return (   
		<div className="panes-container">
			<SimpleBarReact className="left-pane" ref={leftPaneRef}>   
				<LeftPane 
					slide={props.slide} 
					correctAnswer={props.correctAnswer} 
					html={props.html}
				/>  
			</SimpleBarReact>
			
			<div className="panes-separator"></div>
			
			<div className="right-pane"> 
				<TextEditor code={props.code} slide={props.slide}/>
				<BottomRightPane 
					course = {props.course}
					lesson = {props.lesson}
					slide = {props.slide}
					lessonData={props.lessonData}
					get={props.get}
					update={props.update} 
					correctAnswer={props.correctAnswer} 
				/>  
				<SubmitAnswerCorrect 
					course = {props.course}
					lesson = {props.lesson}
					slide = {props.slide}
					lessonData={props.lessonData}
					get={props.get}
					update={props.update} 
					nextSlideURL={props.nextSlideURL}
					coded={props.coded}
				/> 
				<SubmitAnswerWrong slide={props.slide} /> 
			</div>   
		</div>    
	)
 
}

export default SlideWithCode