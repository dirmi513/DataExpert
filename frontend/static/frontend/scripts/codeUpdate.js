/**
 * Sends an HTTP post request to the backend to either:
 * 1) set the completed field value to T in the courses_slides table for a
 * non-coded slide, or coded slide without a coding challenge (where the
 * correctAnswer field value = null), OR
 * 2) update the current user's code field value in the courses_slides table
 * for a coded slide with a coding challenge
 *
 */

import updateLessonData from "./updateLessonData"
import fetchPostRequest from "../scripts/fetchPostRequest"
import {
    PUT_COURSES_SLIDE_CODE_URI, PUT_COURSES_SLIDE_COMPLETED_URI, }
from "../../../src/GlobalVariables"

const codeUpdate = (course, lesson, slide, coded, correctAnswer, arr) => {
    // If this is not a coded slide and the user clicks on one
    // of the top nav links or bottom nav links, set the completed
    // status of the slide to T in the db
    if (coded !== "T" || (coded === "T" && correctAnswer === null)) {
        const url = PUT_COURSES_SLIDE_COMPLETED_URI
        const data = {
            course: course,
            lesson: lesson,
            slide: slide
        }
        fetchPostRequest(url, data)
        return updateLessonData(arr, slide, "", "F")
    // For coded slides, update the code for this user and slide combo
    // in the db to whatever is in the text editor at the time they leave
    // the slide
    }else {
        const url = PUT_COURSES_SLIDE_CODE_URI
        const code = ace.edit("ace-editor").getValue()
        const data = {
            course: course,
            lesson: lesson,
            slide: slide,
            code: code
        }
        fetchPostRequest(url, data)
        return updateLessonData(arr, slide, code, coded)
    }
}

export default codeUpdate
