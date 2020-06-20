import fetchPostRequest from "../scripts/fetchPostRequest"

const errMessage = 
    `<p class="output-text-p">
        There was an error executing your code.
        Please try again, and if the issue persists,
        please contact us.
    </p>
    ` 

const removeSubmitAnswerPopup = () => {
    document.querySelector(".submit-answer-result-correct").style.opacity = "0"
    document.querySelector(".submit-answer-result-correct").style.pointerEvents = "none" 
    document.querySelector(".submit-answer-result-wrong").style.opacity = "0"
    document.querySelector(".submit-answer-result-wrong").style.pointerEvents = "none" 
}

const lambdaOutput = async (grade, course, lesson, slide, setState) => {   
    removeSubmitAnswerPopup()
    document.querySelector(".restore.material-icons").disabled = true 
    grade === "T" ? 
    setState(true, true) :
    setState(false, true) 
    try {
        const code = ace.edit("ace-editor").getValue()
        const url = "/app/courses/api/code-execution/"
        const postData = {
            course: course,
            lesson: lesson,
            slide: slide,
            code: code,
            submit: grade 
        }
        const response = await fetchPostRequest(url, postData)  
        const data = await response.json()     
        // If there's no code to be executed 
        if(code.length === 0){
            document.querySelector("#output-txt").innerHTML = 
                `<p class="output-text-p">
                    There is no code to be executed.
                    Please write some code before pressing Execute Code or Submit Answer.
                </p>
                `  
        // For exceptions raised by user's code
        }else if(typeof(data) === "string") {
            if(data.includes("output-text-p")) {
                document.querySelector("#output-txt").innerHTML = data
            }
        // If code execution was successful 
        }else if (typeof(data["output_code"]) != "undefined") {
                document.querySelector("#output-txt").innerHTML = data["output_code"] 
        // Code execution timed out 
        }else if (typeof(data["errorMessage"]) != undefined && data["errorMessage"].includes("timed out")) {
            document.querySelector("#output-txt").innerHTML = 
            `<p class="output-text-p">
                Your code execution timed out.  
                This could be due to incorrect code or an infinite loop. 
                Please try again.
            </p> 
            `
        }else {
            document.querySelector("#output-txt").innerHTML = errMessage
        }
        
        // Handle cases where user answered correctly vs incorrectly 
        if(grade === "T") { 
            if(data["correct_answer"] === "T") {
                document.querySelector(".submit-answer-result-correct").style.opacity = "1"
                document.querySelector(".submit-answer-result-correct").style.pointerEvents = "all"
            }else {
                document.querySelector(".submit-answer-result-wrong").style.opacity = "1"
                document.querySelector(".submit-answer-result-wrong").style.pointerEvents = "all"
            }
        } 

    }catch (error) {   
        document.querySelector("#output-txt").innerHTML = errMessage
    }finally {
        grade === "T" ? 
        setState(true, false) : 
        setState(false, false) 
        document.querySelector(".restore.material-icons").disabled = false 
    }
}

export default lambdaOutput