import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Navigate from './components/Navigate';
import Login from './components/Login';


function App() {
  return (
       <div className="App">
        <Navigate/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/register' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </div>
  );
}

export default App;
