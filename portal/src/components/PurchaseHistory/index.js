import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { GetBoughtItems } from '../../utils/Api'
import { decodeToken } from '../../utils/Common';
import { IMAGE_URL } from '../../utils/Path';
import Grid from '@mui/material/Grid';

export const PurchaseHistory = () => {
  const [purchased, getPurchased] = useState([])
  
  async function GetPurchasedItems() {

    await GetBoughtItems(decodeToken().userId)
    .then((res)=>{
        getPurchased(res)
    })
  }
  useEffect(() => {
    GetPurchasedItems()
  }, [])
  
    return (
    <div>
        <h3 className="title-header">Purchase History</h3>
        <Row>
        {
            purchased.map((item) => {
                return (<Item images={item.images} name={item.name} category={item.category}/>)
            })
        }
        </Row>
    </div>
  )
}

export const Item = (props) => {

    const [image] = useState(IMAGE_URL+props.images[0])

    return(
      <Col xs={3}>
        <Card style={{"width": "14em", "height" : "20em"}} id='product'>
        <img id='product-img' variant="top" src={image} alt='product-image'/>
        <Card.Body id='product-body'>
            <Card.Text id='product-title'>{props.name}</Card.Text>
            <Card.Text id='product-sub-text'>{props.category} </Card.Text>
        </Card.Body>
        </Card>
      </Col>
    );
}
