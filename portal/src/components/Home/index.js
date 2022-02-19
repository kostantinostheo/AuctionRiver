import './index.css'
import React from "react";
import { Row} from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';

export default function Home() {
  return (
    <div className='home-page'>
        <h1>Salute..!!</h1>
        <h5>This is a simple React Page</h5>
        <Row>
          <SocialIcon bgColor="rgb(219, 183, 115)" url="https://github.com/" />
        </Row>
    </div>
  );
}
