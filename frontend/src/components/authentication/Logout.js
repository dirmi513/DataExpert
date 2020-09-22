import fetchPostRequest from "../../../static/frontend/scripts/fetchPostRequest"
import {LOGOUT_URL, HOMEPAGE_URI} from "../../GlobalVariables"

const Logout = () => {
	fetchPostRequest(LOGOUT_URL, "")
	window.location.href = HOMEPAGE_URI
	return null
}

export default Logout
