import './index.css'
import React from "react";
import { Col, Row } from 'react-bootstrap';


export default function Footer() {
    return(
        <Row className='footer'>
            <Col className='footer-col'>
                <h5 id='footer-title'>Get to Know Us</h5>
                <ol>
                    <li id='footer-list'>Careers </li>
                    <li id='footer-list'>About Us </li>
                    <li id='footer-list'>UK Modern Slavery Statement</li>
                    <li id='footer-list'>Auction River Science</li>            
                </ol>
            </Col>
            <Col className='footer-col'>
                <h5 id='footer-title'>Make Money with Auction - River</h5>
                <ol>
                    <li id='footer-list-2'>Payment Methods Help</li>
                    <li id='footer-list-2'>Shop with Points </li>
                    <li id='footer-list-2'>Gift Cards</li>     
                </ol>
            </Col>

        </Row>
    )

}