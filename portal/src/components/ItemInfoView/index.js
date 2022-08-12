import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

import './index.css'

export function ItemInfoView(props) {

    let navigate = useNavigate();
    
    const routeChange = () =>{ 
        let path = `${props.itemId}`;
        navigate(path);
    }
    return (
        <div className='card-item'>
                <Card id='product'>
                <a onClick={routeChange} style={{"text-decoration": "none"}}>
                    <Card.Img id='product-img' variant="top" src={props.img[0]} alt='product'/>
                </a>
                <Card.Body id='product-body'>
                    <a style={{"text-decoration": "none", color : "black"}} href='/'>
                        <Card.Text id='product-title'>{props.title}</Card.Text>
                    </a>
                    <h3 id='product-price'>${props.price}</h3>
                </Card.Body>
                </Card>

        </div>
    );
}
