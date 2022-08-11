import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import UserPanel from './components/UserPanel';
import ItemDetailedView from './components/ItemDetailedView';


function App() {
  return (
       <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/admindashboard' element={<AdminDashboard/>}/>
          <Route path='/admindashboard/info/user/:userId' element={<UserPanel/>}/>
          <Route exact path='/item/detail' element={<ItemDetailedView/>}/>

        </Routes>
      </div>
  );
}

export default App;
