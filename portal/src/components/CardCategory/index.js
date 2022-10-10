import './index.css'
import { Card, Col, ListGroup, Row} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { categoryType } from '../../utils/Const';
import Navigate from '../Navigate';
import CustomBreadcrumb from '../CustomBreadcrumb'

export default function CardCategory() {

    const [categories] = useState(Object.values(categoryType))

    useEffect(()=>{
        console.log(categories)
    },[])
    return (
        <>
        <Navigate/>
        <CustomBreadcrumb value={"Category"} pathValues={[]}/>
            <Row id='category-list' className="justify-content-md-center">
            {
                categories.map((category)=>{
                    return <Col md="3"> <CateCard title={category[0]} img={category[1]} /> <br/> </Col>                        
                })
            }
            </Row>
        </>
  );
}

function CateCard(props){
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img id='category-img' variant="top" src={props.img}/>
          <Card.Body>
            <Card.Title ><a className='cat-title' href={`/item/category/${props.title}`} > {props.title}</a></Card.Title>
          </Card.Body>
        </Card>
      );
}