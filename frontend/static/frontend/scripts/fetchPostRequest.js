import Cookies from "js-cookie"

const fetchPostRequest = (url, data) => {
	const csrfToken = Cookies.get("csrftoken") 
	const headers = new Headers({
		"Content-Type": "application/json", 
		"Accept": "application/json",
		"X-CSRFTOKEN": csrfToken 
	}) 
	return fetch(url, {
		method: "POST",      
		headers: headers,  
		body: JSON.stringify(data)
	})   
}  

export default fetchPostRequest