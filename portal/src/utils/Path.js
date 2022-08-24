export const BASE_URL = "http://localhost:3000/"
export const IMAGE_URL = "http://127.0.0.1:8887/images/"


export const POST_USER_URL = {
	Login: "users/api/login",
	Register: "users/api/register",
}
export const GET_USER_URL = {
	UserDetails: "users/api/",
	UserPending: "users/api/status/pending",
	OnlyAdmins: "users/api/admins"
}
export const PATCH_USER_URL = {
	UpdateUserStatus: "users/api/update/status/",
	UpdateRating: "/api/update/rating/"
}


//Items
export const GET_ITEM_URL = {
	AllItems: "items/api/"
}
export const POST_ITEM_URL = {
	Submit: "items/api/submit",
	NewBid: "items/api/update_bids/",
	Ordered: "items/api/sorted",
}