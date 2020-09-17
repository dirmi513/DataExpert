/**
 * Functions for handling loading the pageSplit scripts
 * that allow users to change the width of the left and
 * right panes on a Slide page.
 *
 */

const loadPageSplitScripts = () => {
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
