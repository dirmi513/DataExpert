import updateLessonData from "./updateLessonData"
import fetchPostRequest from "../scripts/fetchPostRequest"

const codeUpdate = (course, lesson, slide, coded, correctAnswer, arr) => {    
    // If this is not a coded slide and the user clicks on one
    // of the top nav links or bottom nav links, set the completed
    // status of the slide to T in the db 
    if (coded !== "T" || (coded === "T" && correctAnswer === null)) {
        const url = "/courses/api/slide-no-code-completed/"
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
        const url = "/courses/api/code-update/"
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