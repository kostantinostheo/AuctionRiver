import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navigate from '../Navigate';
import './index.css'
import React, { useEffect, useState } from 'react';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { PostAsync } from '../../utils/Api';
import { Card, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, IMAGE_URL, POST_ITEM_URL } from '../../utils/Path';
<<<<<<< HEAD
=======
import Footer from '../Footer';
>>>>>>> develop
import './index.css'

export default function ItemListingSearch() {
    const [searchValue] = useState(window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split('=')[1])
    let [item, setItem] = useState([])
    let [ok, setOk] = useState(false)
    const [orders] = useState(["Best Match", "Time - Low to High", "Time - High to Low"])
    const [selected, setSelected] = useState(); 


    const handleFilter=(e)=>{
        setSelected(e.target.value)
        console.log(e.target.value)
    }

    async function GetAllListingBySearch(){
        const body = {
            text: searchValue
        }
        const res = await PostAsync(BASE_URL + POST_ITEM_URL.SearchItem, body)
        const data = await res.json()
        setItem(data)
        setOk(true)
    }
    

    useEffect(()=> {
        GetAllListingBySearch()
    }, [])
    
    return (
        <div>
            <Navigate/>
            <CustomBreadcrumb value={searchValue} pathValues={["Item"]}/>

            <div className='custom-helpnav-bar'>
                <Navbar expand="lg">
                <div style={{"width":"100px"}} />
                <select value={selected} onChange={handleFilter} id="dropdown-order">
                    <option value={false}>Order by</option>
                    {
                      orders.map((order) => {
                        return(<option value={order}>{order}</option>) 
                      })
                    }
                  </select>
                <div style={{"width":"50px"}} />
                    <button onClick={""} id='filter'>Buy Now</button>
                    <button id='filter'>Auction</button>
                </Navbar>
            </div>


            <div className='grid-box'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid container item spacing={1}>
                             { ok === true && item.map((data)=>{
                                return <ItemComponenet itemId={data.itemId} name={data.name} images={data.images} price={data.buyPrice} category={data.category} bid={data.firstBid}/>
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </div>
<<<<<<< HEAD
=======
            <Footer/>
>>>>>>> develop
        </div>
    );
}

function ItemComponenet(props){

    const [image] = useState(IMAGE_URL+props.images[0])
    let navigate = useNavigate();
    
    const routeChange = () =>{ 
        let path = `/item/${props.itemId}`;
        navigate(path);
    }

    const [categories, setCategories] = useState()

    useEffect(()=>{
        let temp = ""
        console.log(props.category)
        for (const category of props.category){
            temp += category + " "
        }
        setCategories(temp)
    },[])

    return(
        <Grid item xs={3}>
            <div className='card-item'>
                <Card id='product'>
                <a onClick={routeChange} style={{"textDecoration": "none"}}>
                    <img id='product-img' variant="top" src={image} alt='product-image'/>
                </a>
                <Card.Body id='product-body'>
                    <a onClick={routeChange} style={{"textDecoration": "none", color : "black"}}>
                        <Card.Text id='product-title'>{props.name}</Card.Text>
                    </a>
                    <Card.Text id='product-sub-text'>{categories}</Card.Text>
                    {   
                        props.price !== null ? <Row><h6 id='product-price'>Buy now:</h6> <h4 id='product-price'>${props.price}</h4>
                        <h6 id='product-price'>Bid starts at:</h6> <h4 id='product-price'>${props.bid}</h4></Row> 
                        : 
                        <Row><h6 id='product-price'>Bid starts at:</h6> <h3 id='product-price'>${props.bid}</h3></Row>
                    }
                </Card.Body>
                </Card>
            </div>
        </Grid>
    );

}