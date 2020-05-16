const loadPageSplitScripts = () => {
	// Load page split scripts to allow changing the proportion of
	// the left and right panes 
	const reSplit = /pageSplit/ 
	const scripts = [ 
		"/static/frontend/page-split/pageSplitMain.js", 
		"/static/frontend/page-split/pageSplit.js"
	]   
	document.querySelectorAll("head > script").forEach((script) => {
		if (reSplit.test(script.src)) {
			document.head.removeChild(script)
		}
	}) 
	scripts.forEach(link => {
		let script = document.createElement("script")
		script.async = false
		script.src = link  
		document.head.appendChild(script)  
	})
}

const removePageSplitScripts = () => {
	const reSplit = /pageSplit/
	document.querySelectorAll("head > script").forEach((script) => {
		if (reSplit.test(script.src)) {
			document.head.removeChild(script)
		}
	}) 
}

export {loadPageSplitScripts, removePageSplitScripts}