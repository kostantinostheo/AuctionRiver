import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { GetAllMessages, GetUserData, PostAsync } from '../../utils/Api';
import { decodeToken } from '../../utils/Common';
import { BASE_URL, POST_MESSAGE_URL } from '../../utils/Path';
import Navigate from '../Navigate';
import './index.css'

export default function Chat() {

    const [chats, getChats] = useState([])
    const [username, getUserName] = useState()
    const [messages, getMessages] = useState([])
    const [callback, getCallback] = useState(false)
    const [currentChat, getCurChat] = useState(localStorage.getItem("lastIndex") != null ? localStorage.getItem("lastIndex") : null)
    const [lastChat] = useState(localStorage.getItem("lastChat") != null ? JSON.parse(localStorage.getItem("lastChat")) : [])

    const [text, setText] = useState()

    function display(index){
        getCurChat(chats[index].chatId)
        getMessages(chats[index].messages)
        localStorage.setItem("lastIndex", index);
        localStorage.setItem("lastChat", JSON.stringify(chats[localStorage.getItem("lastIndex")].messages));
    }
    async function GetUser(){
        GetUserData(decodeToken().userId)
        .then(res => {
            getUserName(res.firstname + " " + res.lastname)
        })
    }
    async function SendMessage(e){
        e.preventDefault()
        const body = {
            sender: decodeToken().userId, 
            message: text, 
        }
        const res = await PostAsync(BASE_URL + POST_MESSAGE_URL.SendMessage + currentChat, body)
        const data = await res.json()
        localStorage.setItem("lastChat", JSON.stringify(data.messages));
        window.location.reload();
    }
    async function HandleMessages(){
        GetAllMessages(decodeToken().userId)
        .then(res=>{
            getChats(res)
            getCurChat(res[0].chatId)
            getCallback(true)
        })
    }

    useEffect(() => {
        GetUser()
        HandleMessages()
        console.log(typeof lastChat)
        console.log(lastChat)

    },[])
    return (
        <div>
            <Navigate/>
            <Row>
                <Col className='header-col' xs={3}>
                    Messages
                </Col>
                <Col className='header-col'>
                    Details
                </Col>
            </Row>
            <Row className='second-row'> 
                <Col className='message-list-col' xs={3}>
                    { callback &&
                        chats.map((data, index) => {
                            return <MessageInfoView display={()=>{display(index)}} username={username === data.username1 ? data.username2 : data.username1} preview={data.messages[data.messages.length - 1].message}/>
                        })

                    }
                    
                </Col>
                <Col className='messages'>
                    <Col className='scroll-view'>
                    { messages.length !== 0  &&                      
                        messages.map(message => { return message.sender === decodeToken().userId ?
                        <MessageSend message={message.message}/>
                        :
                        <MessageReceive message={message.message}/>
                    })
                    }
                    { messages.length === 0 && 
                        lastChat.map(message => { return message.sender === decodeToken().userId ?
                            <MessageSend message={message.message}/>
                            :
                            <MessageReceive message={message.message}/>
                        })
                    }
                    </Col>
                    <Form>
                        <InputGroup>
                            <Form.Control
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            placeholder='Type a message'
                            value={text} onChange={(e)=>setText(e.target.value)}
                            />
                            <Button type="submit" onClick={SendMessage} id="button-addon2">
                                Send
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
           
        </div>
  );
}

function MessageSend(props){

    return(
        <div className='message-row'>
            <p className='send-message'>
                {props.message}
            </p>
        </div>
    )
}
function MessageReceive(props){

    return(
        <div className='message-row'>
            <p className='receive-message'>
                {props.message}
            </p>
        </div>
    )
}

function MessageInfoView({username, preview, display}){

    return(
        <button onClick={display} className='message-container'>
            <div className='sender-name'>
                {username}
            </div>
            <div className='sender-message'>
                {preview}
            </div>
        </button>
    )
}