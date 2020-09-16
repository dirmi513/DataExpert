import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import codeUpdate from "../../../../static/frontend/scripts/codeUpdate"
import "../../../../static/frontend/style/navbar.css"
import {
	COURSES_APP_URI, LOGOUT_URI,
} from "../../../GlobalVariables"

const TopNavSlide = (props) => {
	const [slideDropdown, setSlideDropdown] = useState([])

	useEffect(() => {
		const slideDropdownData = generateSlideDropdownContent()
		setSlideDropdown(slideDropdownData)
	}, [])

	useEffect(() => {
		const slideDropdownData = generateSlideDropdownContent()
		setSlideDropdown(slideDropdownData)
	}, [props.slide])

	const onClick = (slide) => {
		const arr = codeUpdate(props.course, props.lesson, props.slide,
			props.coded, props.correctAnswer, props.lessonData)
		props.update(arr)
		props.get(arr, slide)
	}

	const generateSlideDropdownContent = () => {
		return (
			props.slides.map((slide) => {
				return (
					<a
						href="#"
						key={slide.id}
						onClick={() => onClick(slide.name)}
					>
					{slide.number} {slide.name}
						{slide.completed === "T" ?
						<i className="check material-icons">
							check_circle_outline
						</i> :
						null}
					</a>
				)
			})
		)
	}

	return (
		<div className="navbar top-nav" id="top-nav">
			<Link to={COURSES_APP_URI} id="courses">Courses</Link>
				<div className="dropdown">
					<button className="dropDownButton">Lesson : {props.lesson} </button>
					<div className="dropdownContent" id="dropdownContent">
						{slideDropdown}
					</div>
				</div>
			<Link to={LOGOUT_URI} id="logout">Logout</Link>
		</div>
	)

}

export default TopNavSlide
