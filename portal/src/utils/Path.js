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
	MonitorItem: "users/api/monitor/",
	BuyUpdateItem: "users/api/buy/"
}

//Items
export const GET_ITEM_URL = {
	AllItems: "items/api/",
	GetSellerItems: "items/api/seller/",
	GetBoughtItems: "items/api/buyer/"
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
	BuyUpdateItem: "items/api/buy/",
	Bonus: "bonus/api/recommend/"
}
export const DELETE_ITEM_URL = {
	DeleteItem: "items/api/delete/",
}

export const GET_MESSAGE_URL = {
	AllMessages: "chats/api/find-all/",
}
export const POST_MESSAGE_URL = {
	SendMessage: "chats/api/message/",
}