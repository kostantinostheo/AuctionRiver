import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navigate from '../Navigate';
import './index.css'
import React, { useEffect, useState } from 'react';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { GetAllItems, GetItemDetails } from '../../utils/Api';
import { Card, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IMAGE_URL } from '../../utils/Path';
import Pagenation from '../Pagination';



export default function ItemsListing() {

    let [item, setItem] = useState([])
    let [ok, setOk] = useState(false)
    const [orders] = useState(["Best Match", "Time - Low to High", "Time - High to Low"])
    const [selected, setSelected] = useState(); 

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)

    
    const handleFilter=(e)=>{
        setSelected(e.target.value)
        console.log(e.target.value)
    }

    async function GetAllListing(){
        GetAllItems()
            .then( (res) => setItem(res) )
            .then(setOk(true))
    }
    

    useEffect(()=> {
        GetAllListing()
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = item.slice(indexOfFirstItem, indexOfLastItem)
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <div>
            <Navigate/>
            <CustomBreadcrumb value='Items' pathValues={[]}/>

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
                             { ok === true && currentItems.map((data)=>{
                                return <ItemComponenet itemId={data.itemId} isAvailable={data.isAvailable} name={data.name} images={data.images} price={data.buyPrice} category={data.category} bid={data.firstBid}/>
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </div>
            
                <Pagenation 
                    itemsPerPage={itemsPerPage} 
                    totalItems={item.length} 
                    paginate={paginate}
                />
    
        </div>
    );
}

function ItemComponenet(props){

    let navigate = useNavigate();  
  
    const routeChange = () =>{ 
        let path = `${props.itemId}`; // fix that change path
        navigate(path);
    }

  

    return(
        <Grid item xs={3}>
            <div className='card-item'>
                <Card id='product'>
                <a onClick={routeChange} style={{"textDecoration": "none"}}>
                    { props.isAvailable === true ?
                        <img id='product-img' variant="top" src={IMAGE_URL+props.images[0]} alt='product-image'/> 
                        :
                        <img style={{"opacity" : "50%"}} id='product-img' variant="top" src={IMAGE_URL+props.images[0]} alt='product-image'/> 
                    }
                </a>
                <Card.Body id='product-body'>
                    <a onClick={routeChange} style={{"textDecoration": "none", color : "black"}}>

                        <Card.Text id='product-title'>{props.name}</Card.Text> 
                    </a>

                        <Card.Text id='product-sub-text'>{props.category}</Card.Text>

                    {   
                        props.price !== null ? <Row><h6 id='product-price'>Buy now:</h6> <h4 id='product-price'>${props.price}</h4>
                        <h6 id='product-price'>Bid starts at:</h6> <h4 id='product-price'>$122</h4></Row> 
                        : 
                        <Row><h6 id='product-price'>Bid starts at:</h6> <h3 id='product-price'>$122</h3></Row>
                    }
                </Card.Body>
                </Card>
            </div>
        </Grid>
    );

}