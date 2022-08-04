import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


function App() {
  return (
       <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </div>
  );
}

export default App;
