import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

import './index.css'

export function ItemInfoView(props) {

    let navigate = useNavigate();
    
    const routeChange = () =>{ 
        let path = `${props.id}`;
        console.log(path)
        navigate(path);
    }
    return (
        <div className='card-item'>
                <Card id='product'>
                <a onClick={routeChange} style={{"textDecoration": "none"}}>
                    <Card.Img id='product-img' variant="top" src={props.images[0]} alt='product'/>
                </a>
                <Card.Body id='product-body'>
                    <a onClick={routeChange} style={{"textDecoration": "none", color : "black"}}>
                        <Card.Text id='product-title'>{props.title}</Card.Text>
                    </a>
                    <h3 id='product-price'>$100</h3>
                </Card.Body>
                </Card>

        </div>
    );
}
