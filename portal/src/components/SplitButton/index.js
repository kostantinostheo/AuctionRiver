import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { logout } from '../../utils/Common';
import { userType } from '../../utils/Const';
import './index.css'

export default function SplitButton(props) {

    function OnLogout(){
        logout()
        window.location.href = '/'
    }
    return (
        <Dropdown {...props} as={ButtonGroup}>
        <Button disabled className='greetings-label'>Welcome <b id='username-color'> {props.username} </b></Button>

        <Dropdown.Toggle className='greetings-label' id="dropdown-split-basic" />
            <Dropdown.Menu>
                { props.userType === userType.User &&
                    ( <Dropdown.Item href="dashboard">User Dashboard</Dropdown.Item> )
                }            
                { props.userType === userType.Admin &&
                    ( <Dropdown.Item href="/admindashboard">Admin Dashboard</Dropdown.Item> )
                }
                <Dropdown.Item onClick={OnLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}