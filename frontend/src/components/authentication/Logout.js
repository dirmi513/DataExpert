import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest"

const Logout = () => {
	fetchPostRequest("/api/logout/", "")
	window.location.href = "/"
	return null 
}

export default Logout 