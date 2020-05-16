import React, {useEffect, useRef} from "react"  
import SimpleBarReact from "simplebar-react"
import "../../../../../static/frontend/style/slide/slideBody.css" 


const SlideBodyNoCode = (props) => { 
	const bodyRef = useRef()  

	useEffect(() => {
		// When a user goes to the next slide, scroll to top
		bodyRef.current.getScrollElement().scrollTop = 0
	}, [props.slide]) 

	return (
		<div className="panes-container">
			<SimpleBarReact 
				className="slide-no-code"
				ref={bodyRef} 
			>   
				<div dangerouslySetInnerHTML={{__html: props.html}}></div>
			</SimpleBarReact> 
		</div>
	)
}

export default SlideBodyNoCode