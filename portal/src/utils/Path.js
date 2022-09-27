export const BASE_URL = "http://localhost:3000/"
export const IMAGE_URL = "http://127.0.0.1:8887/"


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
	UpdateRating: "api/update/rating/",
	LikeItem: "users/api/save/",
	UnlikeItem: "users/api/unsave/",
<<<<<<< HEAD
	MonitorItem: "users/api/monitor/"
=======
	MonitorItem: "users/api/monitor/",
	BuyUpdateItem: "users/api/buy/"
>>>>>>> develop
}

//Items
export const GET_ITEM_URL = {
	AllItems: "items/api/",
<<<<<<< HEAD
	GetSellerItems: "items/api/seller/"
=======
	GetSellerItems: "items/api/seller/",
	GetBoughtItems: "items/api/buyer/"
>>>>>>> develop
}
export const POST_ITEM_URL = {
	Submit: "items/api/submit",
	NewBid: "items/api/update_bids/",
	SearchItem: "items/api/search",
	Categorized: "items/api/categorized",
	Ordered: "items/api/sorted",
}
export const PATCH_ITEM_URL = {
	UpdateItem: "items/api/update_item/",
<<<<<<< HEAD
=======
	BuyUpdateItem: "items/api/buy/",
	Bonus: "bonus/api/recommend/"
>>>>>>> develop
}
export const DELETE_ITEM_URL = {
	DeleteItem: "items/api/delete/",
}
//http://localhost:3000/items/api/seller/1