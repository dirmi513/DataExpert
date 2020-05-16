const updateLessonData = (arr, slide, code, coded) => {
	if(coded == "T") {
		return (
			arr.map((elem) => {
				if (elem.slide == slide) { 
					elem.code = code
				}
				return elem 
			})
		)
	} else {
		return (
			arr.map((elem) => {   
				elem.slides.forEach((s, indx) => {
					if(s.name == slide) {
						elem.slides[indx].completed = "T"
					}
				})   
				return elem 
			})
		)
	}
}

export default updateLessonData