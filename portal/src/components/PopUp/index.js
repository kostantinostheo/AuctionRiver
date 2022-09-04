import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function PopUp(props) {

    return (
        <Modal {...props} centered>
            <Modal.Header closeButton>
                <img src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png' alt='error-icon' height='25' width='25' ></img>
                &emsp;
                <Modal.Title>{props.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.logs}</Modal.Body>
            { props.link === true && 
                (<Modal.Body>
                    <a href='/login'>Register or Login to set a new bid</a>
                </Modal.Body>)
            }
        </Modal>
  );
}