import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ItemInfoView } from '../ItemInfoView';
import Navigate from '../Navigate';
import './index.css'
import React, { useEffect, useState } from 'react';
import CustomBreadcrumb from '../CustomBreadcrumb';
import HelpNavBar from '../HelpNavBar';
import { GetAllItems } from '../../utils/Api';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IMAGE_URL } from '../../utils/Path';

export default function ItemsListing() {

    let [item, setItem] = useState([])
    let [ok, setOk] = useState(false)


    async function GetAllListing(){
        GetAllItems()
            .then( (res) => setItem(res) )
            .then(setOk(true))
    }

    useEffect(()=> {
        GetAllListing()
    }, [])

    return (
        <div>
            <Navigate/>
            <CustomBreadcrumb value='Products'/>
            <HelpNavBar/>
            <div className='grid-box'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid container item spacing={1}>
                             { ok === true && item.map((data)=>{
                                return <ItemComponenet itemId={data.itemId} name={data.name} images={data.images} price={data.buyPrice}/>
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
    useEffect(()=> {
        console.log(props.images[0])
    }, [])

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
                    <h3 id='product-price'>${props.price}</h3>
                </Card.Body>
                </Card>
            </div>
        </Grid>
    );

}