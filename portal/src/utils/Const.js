import purse from '../images/categories/Purse.png'
import camera from '../images/categories/camera.png'
import bench from '../images/categories/bench.png'
import headset from '../images/categories/headset.png'
import motor from '../images/categories/motor.png'


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
<<<<<<< HEAD
	Audio: ["Portable Audio", headset, ['Headphones','Audiobars'] ],
=======
	Audio: ["Audio", headset, ['Headphones','Audiobars'] ],
>>>>>>> develop
	Toys: ["Toys", 'https://www.nicepng.com/png/full/75-756650_kids-toys-png-clipart-transparent-download-baby-toys.png', ['Lego','Stuffed Animals'] ],
	Beauty: ["Beauty", 'https://www.pngall.com/wp-content/uploads/2016/05/Perfume-Download-PNG.png', ['Fragrances','Styling & Makeup Products'] ],
	Motors: ["Motors", motor, ['Auto Parts & Accessories','Vehicles'] ],
	Tools: ["Tools", 'https://www.pngall.com/wp-content/uploads/10/Tools.png', ['Workshop Equipment','Hand Tools'] ]
}

export const orderType = {
	Ascending: "Ascending",
	Descending : "Descending",
}
