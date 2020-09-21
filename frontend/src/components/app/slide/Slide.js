import React, { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import SlideBody from "./body/SlideBody"
import TopNavSlide from "./TopNavSlide"
import BottomNavSlide from "./BottomNavSlide"
import TopNav from "../TopNav"
import "../../../../static/frontend/style/loadingDots.css"
import {
	COURSES_APP_URI,
} from "../../../GlobalVariables"


const Slide = (props) => {
	const {course, lesson, slide} = useParams()
	const [lessonData, setLessonData] = useState({data: [], loaded: false})
	const [slideData, setSlideData] = useState({data: [], loaded:false})
	const dataUrl = `${COURSES_APP_URI}/${course}/${lesson}/${slide}`

	const fetchLessonData = async () => {
		const response = await fetch(dataUrl)
		const data = await response.json()
		setLessonData({
			data: [...data[lesson]],
			loaded: true
		})
	}

	useEffect(() => {
		fetchLessonData()
	}, [])

	useEffect(() => {
		// If the next slide is a new lesson,
		// run fetchLessonData() again to get the
		// data for the new lesson
		setLessonData({
			data: [],
			loaded: false
		})
		fetchLessonData()
	}, [props.match.params.lesson])

	const getSlideData = (arr, slide) => {
		// When fetchLessonData() gets the lesson data,
		// we need to parse the array of objects to get
		// the object that has data for the current slide
		arr.forEach((elem) => {
			if (elem.slide === slide) {
				setSlideData({
					data: {...elem},
					loaded: true
				})
				props.history.push(`/${course}/${props.match.params.lesson}/${slide}`)
			}
		})
	}

	useEffect(() => {
		// When lessonData updates, or when
		// the slide changes, re-run getSlideData()
		if (lessonData.loaded) {
			getSlideData(lessonData.data, props.match.params.slide)
		}
	}, [lessonData.loaded, props.match.params.slide])

	const codeUpdate = (arr) => {
		// When code for a slide is updated,
		// update the lessonData.data array to
		// contain that updated data
		setLessonData({
			data: arr,
			loaded: lessonData.loaded
		})
	}

	return (
		<>
		{
			slideData.loaded === false ?
			<>
				<TopNav />
				<div className="loading-dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</> :
			<>
				<TopNavSlide
					course={course}
					lesson={lesson}
					slide={slide}
					lessonData={lessonData.data}
					slides={slideData.data.slides}
					get={getSlideData}
					update={codeUpdate}
					coded={slideData.data.coded}
					correctAnswer={slideData.data.correct_answer}
				/>
				<SlideBody
					coded={slideData.data.coded}
					html={slideData.data.html}
					code={slideData.data.code}
					course={slideData.data.course}
					lesson={slideData.data.lesson}
					slide={slideData.data.slide}
					correctAnswer={slideData.data.correct_answer}
          hint={slideData.data.hint}
					lessonData={lessonData.data}
					get={getSlideData}
					update={codeUpdate}
					nextSlideURL={slideData.data.bottomNav.next_slide_url}
				/>
				<BottomNavSlide
					course={course}
					lesson={lesson}
					slide={slide}
					lessonData={lessonData.data}
					data={slideData.data.bottomNav}
					get={getSlideData}
					update={codeUpdate}
					coded={slideData.data.coded}
					correctAnswer={slideData.data.correct_answer}
				/>
			</>
		}
		</>
	)
}

export default Slide
