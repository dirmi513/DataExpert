import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest"

const Logout = () => {
	fetchPostRequest("/api/logout/", "")
	window.location.href = "/login/"
	return null 
}

export default Logout 