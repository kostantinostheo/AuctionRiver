import purse from '../images/categories/Purse.png'
import camera from '../images/categories/camera.png'
import bench from '../images/categories/bench.png'
import headset from '../images/categories/headset.png'


const CHROME_SERVER_URL = 'http://127.0.0.1:8887/'

export const mockCategory = [
    {
        title: "Fashion",
        image: purse,
        sub:["Women Clothes", "Women Bugs", "Men T-Shirts"]
    },
    {
        title: "Electronics",
        image: camera,
        sub:["Smart Watches", "Video Games", "Cameras and Photos"]
    },
    {
        title: "Hobbies",
        image: bench,
        sub:["Gym Equipment", "Sneakers", "Travel Bags"]
    },
    {
        title: "Portable Audio",
        image: headset,
        sub:["Headphones", "iPods & MP3 Players", "Audio Docks & Mini Speakers"]
    },
]

export const mockItemInfo  = 
[
    {
        itemId: 1,
        img: ['https://i.ebayimg.com/images/g/ifMAAOSwJ2Zixjei/s-l1600.png',`${CHROME_SERVER_URL}images/product/s-l1600.png`],
        title: 'World of Warcraft Wrath of the Lich King Board Game Hardcover Art Book Blizzard',
        price: 129.88
    },
    {
        itemId: 2,
        img: ['https://i.ebayimg.com/images/g/2-MAAOSw8ZBh7I1z/s-l1600.jpg'],
        title: 'Blizzard Employee Only Heroes of the Storm Canvas',
        price: 174.99
    },
    {
        itemId: 3,
        img: ['https://i.ebayimg.com/images/g/HlYAAOSwxN5WVCTs/s-l1600.jpg',],
        title: 'Blizzard EMPLOYEE 2006 Burning Crusade picnic blanket RARE New Buy Now Warcraft!',
        price: 199.99
    },
    {
        itemId: 4,
        img: ['https://i.ebayimg.com/images/g/fq0AAOSwCAFiWJyA/s-l1600.jpg',],
        title: 'The Art Of World Of Warcraft Burning Crusade Book (See Photos For Details)',
        price: 59.99
    },
    {
        itemId: 4,
        img: ['https://i.ebayimg.com/images/g/fq0AAOSwCAFiWJyA/s-l1600.jpg',],
        title: 'The Art Of World Of Warcraft Burning Crusade Book (See Photos For Details)',
        price: 59.99
    },
    {
        itemId: 4,
        img: ['https://i.ebayimg.com/images/g/fq0AAOSwCAFiWJyA/s-l1600.jpg',],
        title: 'The Art Of World Of Warcraft Burning Crusade Book (See Photos For Details)',
        price: 59.99
    },
    {
        itemId: 4,
        img: ['https://i.ebayimg.com/images/g/fq0AAOSwCAFiWJyA/s-l1600.jpg',],
        title: 'The Art Of World Of Warcraft Burning Crusade Book (See Photos For Details)',
        price: 59.99
    },
]