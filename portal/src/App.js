import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './components/Home';
import { HouseFill } from 'react-bootstrap-icons'

function App() {
  return (
       <div className="App">
        <Navbar className='nav-bar-color' variant="dark">
          <Container>
          <Nav className="me-auto">
            <Nav.Link href="/"><HouseFill color='white'/></Nav.Link>
            <Nav.Link className='rounded'  href="/Selection1">Selection 1</Nav.Link>
            <Nav.Link className='rounded' href="/Selection2">Selection 2</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/Selection1' element={<Home />}/>
          <Route exact path='/Selection2' element={<Home />}/>
        </Routes>    
      </div>
  );
}

export default App;
