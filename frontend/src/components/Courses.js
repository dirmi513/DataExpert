import React, {useEffect, useState} from "react" 
import {Link} from "react-router-dom"
import TopNav from "./TopNav" 
import "../../static/frontend/style/courses.css"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"


const Courses = () => {  
	const [courseData, setCourseData] = useState([])

	const completedLessonCheck = (completed) => {
		if (completed === "T") {
			return <i className="check material-icons">check_circle_outline</i> 
		}
	}

	const unpackCoursesObject = (courses) => {
		courses.sort((a, b) => (a.key > b.key) ? 1 : -1)
		return courses.map(course => {
			return ( 
				<div className="course-box" key={course["key"]}> 
					<div className="header">
						<h4>
							{course["course"]}
						</h4>
					</div> 
					<div className="course-summary">
						<p>
							SUMMARY HERE
						</p>
					</div> 
					<ul className="lessons">
						{courseLessons(course["lessons"])}
					</ul>
				</div> 
			)
		}) 
	}

	const courseLessons = (courseLessons) => {
		courseLessons.sort((a, b) => (a.key > b.key) ? 1 : -1)
		return (
			courseLessons.map(lesson => {
				return (
					<li key={lesson["key"]}>
						<Link to={lesson["url"]}>
							{lesson["lesson"]}
							{completedLessonCheck(lesson["completed"])}
						</Link>
					</li>
				)
			})
		)
	}

	const getCoursesData = async () => {
		try {
			const response = await fetch("/courses/api/get-courses-info/")
			const data = await response.json()  
			setCourseData([data])
		}catch {
			window.location.href = "/login/"
		}
	}	

	useEffect(() => { 
		getCoursesData()
	}, []) 

	return (
		<> 
		<TopNav authenticated={true}/>
		<div className="courses-container">
			<SimpleBarReact className="course-boxes">
			{
				courseData.length > 0 ? 
				<div className="course-boxes"> 
					{unpackCoursesObject(courseData[0].courses)}   
				</div> :
				<div className="loading-div">
					<h1 id="loading">Loading...</h1>
				</div>
			}  
			</SimpleBarReact>
		</div>
		</>
	)
}

export default Courses