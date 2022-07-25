import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
       <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </div>
  );
}

export default App;
