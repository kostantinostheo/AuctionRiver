export const BASE_URL = "http://localhost:3000/"

export const POST_USER_URL = {
	Login: "users/api/login",
	Register: "users/api/register",
}
export const GET_USER_URL = {
	UserDetails: "users/api/",
	UserPending: "users/api/status/pending"
}
export const PATCH_USER_URL = {
	UpdateUserStatus: "users/api/update/status/"
}