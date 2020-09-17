import React from "react"
import "../../../../../../../static/frontend/style/app/slide/leftPaneBody.css"


const LeftPaneBody = (props) => {
	return (
		<div
			className="left-pane-body"
			dangerouslySetInnerHTML={{__html: props.html}}>
		</div>
	)
}

export default LeftPaneBody
