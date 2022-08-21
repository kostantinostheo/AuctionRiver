import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navigate from '../Navigate';
import './index.css'
import React, { useEffect, useState } from 'react';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { GetAllItems, PostAsync } from '../../utils/Api';
import { Button, Card, Dropdown, DropdownButton, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, IMAGE_URL, POST_ITEM_URL } from '../../utils/Path';
import { orderType } from '../../utils/Const';


export default function ItemsListing() {

    let [item, setItem] = useState([])
    let [ok, setOk] = useState(false)
    let [filter, setFilter] = useState('')

    const handleFilter=(e)=>{
        setFilter(e)
        console.log(e)
    }

    async function GetAllListing(filter){
        GetAllItems(filter)
            .then( (res) => setItem(res) )
            .then(setOk(true))
    }
    function HandleAll(){
        if(value === '')
        {
            GetAllListing(filter)
        }

        else{
            console.log("ordered");
            const body = {
                sort : orderType.Descending
            }
            PostAsync(BASE_URL+POST_ITEM_URL.Ordered, body).then((res) => console.log(res))
        }
    }
    
    const [value,setValue]=useState('');
    const handleSelect=(e)=>{
        setValue(e)
        console.log(e)
    }

    useEffect(()=> {
        GetAllListing(filter)
    }, [value])
    
    return (
        <div>
            <Navigate/>
            <CustomBreadcrumb value='Products'/>

            <div className='custom-helpnav-bar'>
                <Navbar expand="lg">
                <div style={{"width":"100px"}} />
                <DropdownButton
                id="dropdown-order"
                className="mt-2"
                title={value === '' ? "Order By" : value}
                onSelect={handleSelect}
                >
                    <Dropdown.Item id='drop-item' eventKey="Best Match">Best Match</Dropdown.Item>
                    <Dropdown.Item id='drop-item' eventKey="Time - Low to High">Price - Low to High</Dropdown.Item>
                    <Dropdown.Item id='drop-item' eventKey="Time - High to Low">Price - High to Low</Dropdown.Item>
                </DropdownButton>
                <div style={{"width":"50px"}} />
                    <Button onClick={''} id='filter'>All Listing</Button>
                    <Button onClick={""} id='filter'>Buy Now</Button>
                    <Button id='filter'>Auction</Button>
                </Navbar>
            </div>


            <div className='grid-box'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid container item spacing={1}>
                             { ok === true && item.map((data)=>{
                                return <ItemComponenet itemId={data.itemId} name={data.name} images={data.images} price={data.buyPrice} category={data.category}/>
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

function ItemComponenet(props){

    const [image] = useState(IMAGE_URL+props.images[0])
    let navigate = useNavigate();
    
    const routeChange = () =>{ 
        let path = `${props.itemId}`;
        navigate(path);
    }


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
                    <Card.Text id='product-sub-text'>{props.category}</Card.Text>
                    <h3 id='product-price'>${props.price}</h3>
                </Card.Body>
                </Card>
            </div>
        </Grid>
    );

}