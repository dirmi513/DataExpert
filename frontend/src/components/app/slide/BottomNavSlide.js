import React from "react";
import codeUpdate from "../../../../static/frontend/scripts/codeUpdate"
import "../../../../static/frontend/style/navbar.css"

const BottomNavSlide = (props) => {

	const onClick = (nextSlideStr, nextSlideURL) => {
		const arr = codeUpdate(props.course, props.lesson, props.slide,
			props.coded, props.correctAnswer, props.lessonData)
		if (nextSlideStr !== "Next Slide" && nextSlideStr !== "Previous Slide") {
			window.location.href = nextSlideURL
		} else {
			const urlArr = nextSlideURL.split("/")
			const slide = urlArr[urlArr.length - 1]
			props.update(arr)
			props.get(arr, slide)
		}
	}

	return (
		<div className="navbar bottom-nav">
			<a
				className="bottomNavSlideClick bottomNavAnchor"
				onClick={() => onClick(props.data.prev_slide, props.data.prev_slide_url)}
				id="prev"
			>
				{props.data.prev_slide}
			</a>

			<a className="bottomNavAnchor" >
				{props.data.middle_element}
			</a>

			<a
				className="bottomNavSlideClick bottomNavAnchor"
				onClick={() => onClick(props.data.next_slide, props.data.next_slide_url)}
				id="next"
			>
				{props.data.next_slide}
			</a>
		</div>
		)
}

export default BottomNavSlide
