const codeOutput = () => {
	let output = document.getElementById('output-txt')
	output.addEventListener("DOMNodeInserted", (e) => {
		try {
			if(e.target.classList.contains("main")){
					let self = e.target
					e.target.children[0].addEventListener("click",function(){
						if(self.classList.contains("active")){
							self.classList.remove("active")
						}else{
							self.classList.add("active")
						}
					})
				}
		} catch {}  
	}, false)
}

export default codeOutput
