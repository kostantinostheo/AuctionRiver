import purse from '../images/categories/Purse.png'
import camera from '../images/categories/camera.png'
import bench from '../images/categories/bench.png'
import headset from '../images/categories/headset.png'

export const userType = {
	Admin: "Admin", //Administrator type of user
	User: "User",   //Can be Seller & Bidder at the same time
}
export const userStatus = {
	Pending: "Pending",
	Accept: "Accept",
    Decline: "Decline"
}
export const categoryType ={
	Fashion: ["Fashion", purse, ['Jewelry','Watches']],
	Hobbies: ["Hobbies", bench, ['Board Games','Sports']],
	Electronics: ["Electronics", camera, ['Computers, Tablets & Cell Phones','Video Games']],
	Audio: ["Portable Audio", headset, ['Headphones','Audiobars'] ],
	Toys: ["Toys", 'https://www.nicepng.com/png/full/75-756650_kids-toys-png-clipart-transparent-download-baby-toys.png', ['Lego','Stuffed Animals'] ],
	"Health & Beauty": ["Health & Beauty", 'https://www.pngall.com/wp-content/uploads/2016/05/Perfume-Download-PNG.png', ['Fragrances','Styling & Makeup Products'] ],
	Motors: ["Motors", 'https://i.dlpng.com/static/png/6946792_preview.png', ['Auto Parts & Accessories','Vehicles'] ],
	Tools: ["Tools", 'https://www.pngall.com/wp-content/uploads/10/Tools.png', ['Workshop Equipment','Hand Tools'] ]
}

export const orderType = {
	Ascending: "Ascending",
	Descending : "Descending",
}
