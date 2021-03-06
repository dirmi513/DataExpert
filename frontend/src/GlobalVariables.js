/**
* URL, URIs, and any other pertinent global variables.
*
* */

const DATAEXPERT_URL = "www.dataexpert.io";

const COURSES_APP_URI = "/app/courses";

const GET_COURSES_APP_INFO_URI = `${COURSES_APP_URI}/data`;

const GET_COURSES_APP_SLIDE_URI = `/:course/:lesson/:slide`;

const HOMEPAGE_URI = "/";

const LOGOUT_URI = "/logout";

const LOGOUT_URL = `/auth/logout`;

const LOGIN_URI = "/auth/login";

const SIGNUP_URI = "/auth/users";

const SIGNUP_URL = SIGNUP_URI;

const PASSWORD_RESET_URI = "/reset-password/:token";

const RESET_PASSWORD_EMAIL_URI = "/auth/reset-password";

const RESET_PASSWORD_CONFIRM_URI = `${RESET_PASSWORD_EMAIL_URI}/confirm`;

const POST_COURSES_NEW_SLIDE_URI = `${COURSES_APP_URI}/slide`;
const PUT_COURSES_SLIDE_CODE_URI = `${COURSES_APP_URI}/slide/code`;
const PUT_COURSES_SLIDE_COMPLETED_URI = `${COURSES_APP_URI}/slide/completed`;
const PUT_COURSES_SLIDE_HTML_URI = `${COURSES_APP_URI}/slide/htmlBody`;
const GET_COURSES_SLIDE_HTML_URI = `${COURSES_APP_URI}/slide/htmlBody`;
const USER_CODE_EXECUTE_URI = `${COURSES_APP_URI}/code/execute`;
const USER_CODE_RESTORE_URI = `${COURSES_APP_URI}/code/restore`;

const GUEST_EMAIL = "guestuser@dataexpert.io";
const GUEST_PASSWORD = "guest";

export {
    COURSES_APP_URI, GET_COURSES_APP_SLIDE_URI, GET_COURSES_APP_INFO_URI, HOMEPAGE_URI,
    LOGOUT_URL, PASSWORD_RESET_URI, LOGIN_URI, RESET_PASSWORD_EMAIL_URI, RESET_PASSWORD_CONFIRM_URI, LOGOUT_URI,
    POST_COURSES_NEW_SLIDE_URI, PUT_COURSES_SLIDE_CODE_URI, PUT_COURSES_SLIDE_COMPLETED_URI,
    PUT_COURSES_SLIDE_HTML_URI, GET_COURSES_SLIDE_HTML_URI, USER_CODE_EXECUTE_URI, USER_CODE_RESTORE_URI,
    SIGNUP_URI, SIGNUP_URL, GUEST_EMAIL, GUEST_PASSWORD
}
