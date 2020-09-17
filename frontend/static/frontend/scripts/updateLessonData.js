/**
 *
 * Updates the array that contains all of the slide data
 * for a lesson by either:
 * 1) updating the code field value for that slide to whatever is in
 * the text editor at the time a user exists the slide, OR
 * 2) setting the completed value for that slide to T if it is a
 * non-coded slide,
 *
 */

const updateLessonData = (arr, slide, code, coded) => {
	if(coded === "T") {
		return (
			arr.map((elem) => {
				if (elem.slide === slide) {
					elem.code = code
				}
				return elem
			})
		)
	} else {
		return (
			arr.map((elem) => {
				elem.slides.forEach((s, indx) => {
					if(s.name === slide) {
						elem.slides[indx].completed = "T"
					}
				})
				return elem
			})
		)
	}
}

export default updateLessonData
