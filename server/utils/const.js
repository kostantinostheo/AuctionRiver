const userType = {
	Admin: "Admin", //Administrator type of user
	User: "User",   //Can be Seller & Bidder at the same time
}
const userStatus = {
	Pending: "Pending",
	Accept: "Accept",
    Decline: "Decline"
}
const orderType = {
	Ascending: "Ascending",
	Descending : "Descending",
}
module.exports = {userType, userStatus, orderType}