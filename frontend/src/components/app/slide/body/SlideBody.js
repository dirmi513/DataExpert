import React from "react"
import SlideBodyWithCode from "./with-code/SlideBodyWithCode"
import SlideBodyNoCode from "./without-code/SlideBodyNoCode"


const SlideBody = (props) => {
	return (
		<>
		{
			props.coded == "T" ?
			<SlideBodyWithCode
				code={props.code}
				course={props.course}
				lesson={props.lesson}
				slide={props.slide}
				correctAnswer={props.correctAnswer}
        hint={props.hint}
				html={props.html}
				lessonData={props.lessonData}
				get={props.get}
				update={props.update}
				nextSlideURL={props.nextSlideURL}
				coded={props.coded}
			/> :
			<SlideBodyNoCode
				html={props.html}
				slide={props.slide}
			/>
		}
		</>
	)
}

export default SlideBody
