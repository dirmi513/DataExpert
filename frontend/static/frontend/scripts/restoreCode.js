import updateLessonData from "./updateLessonData"
import fetchPostRequest from "../scripts/fetchPostRequest"
 

const restoreCode = async (course, lesson, slide, arr) => { 
	const url = "/app/courses/api/restore-code/"
	const postData = {
		course: course,
		lesson: lesson,
		slide: slide 
	}  
	const response = await fetchPostRequest(url, postData)
	const data = await response.json() 
	return new Promise((resolve, reject) => {
		if(typeof(data["Default Code"]) != undefined) {
			const defaultCode = data["Default Code"] 
			const newLessonData = updateLessonData(arr, slide, defaultCode, "T")  
			resolve(newLessonData)
		}else {  
			reject(arr)
		} 
	}) 
} 
 
export default restoreCode