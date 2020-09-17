/**
 * Restore user's code to the default for that Slide.
 *
 */


import updateLessonData from "./updateLessonData"
import fetchPostRequest from "../scripts/fetchPostRequest"
import {
	USER_CODE_RESTORE_URI }
	from "../../../src/GlobalVariables"


const restoreCode = async (course, lesson, slide, arr) => {
	const url = USER_CODE_RESTORE_URI
	const postData = {
		course: course,
		lesson: lesson,
		slide: slide
	}
	const response = await fetchPostRequest(url, postData)
	const data = await response.json()
	return new Promise((resolve, reject) => {
		if(typeof(data["Default Code"]) !== undefined) {
			const defaultCode = data["Default Code"]
			const newLessonData = updateLessonData(arr, slide, defaultCode, "T")
			resolve(newLessonData)
		}else {
			reject(arr)
		}
	})
}

export default restoreCode
