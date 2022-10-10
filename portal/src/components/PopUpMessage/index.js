import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { PostAsync } from '../../utils/Api';
import { decodeToken, tryGetToken } from '../../utils/Common';
import { BASE_URL, POST_MESSAGE_URL } from '../../utils/Path';

export default function PopUpMessage(props) {

    const [text, setText] = useState()
    const [receiverId] = useState(props.rId)

    async function SendMessage(e){
        e.preventDefault()
        if(tryGetToken() === false){
          window.location.href = '/login'
          return
        }
        const myId = decodeToken().userId.toString()
        const reId = props.rId.toString()
        const body = {
            members: [myId, reId],
            sender: decodeToken().userId,
            message: text,
        }
        console.log(body)
        const res = await PostAsync(BASE_URL + POST_MESSAGE_URL.SendMessage +  myId + "-" + reId, body)
        const data = await res.json()
        localStorage.setItem("lastChat", JSON.stringify(data.messages));
        window.location.href = '/messages';
    }
    return (
        <Modal {...props} show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Send message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Send direct message to <b>{props.receiver}</b></Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3} 
              value={text} onChange={(e)=>setText(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={SendMessage}>
            Send message
          </Button>
        </Modal.Footer>
      </Modal>
  );
}