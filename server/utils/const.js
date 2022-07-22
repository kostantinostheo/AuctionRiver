const userType = {
	Admin: "Admin", //Administrator type of user
	User: "User",   //Can be Seller & Bidder at the same time
}
const userStatus = {
	Pending: "Pending",
	Accept: "Accept",
    Decline: "Decline"
}
module.exports = {userType, userStatus}