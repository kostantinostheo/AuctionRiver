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
import ItemsListing from './components/ItemsListing';
import CreateAuction from './components/CreateAuction';
import EditAuction from './components/EditAuction';
import ItemListingCategory from './components/ItemListingCategory';
import ItemListingSearch from './components/ItemListingSearch';
import CardCategory from './components/CardCategory';

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
          <Route path='/item/:itemId' element={<ItemDetailedView/>}/>
          <Route exact path='/item' element={<ItemsListing/>}/>
          <Route path='/item/category/:category' element={<ItemListingCategory/>}/>
          <Route exact path='/sellitem' element={<CreateAuction/>}/>
          <Route path='/item/found/search-for=:searchValue' element={<ItemListingSearch/>}/>
          <Route path='/category' element={<CardCategory/>}/>
          <Route exact path='/edititem' element={<EditAuction/>}/>

        </Routes>
      </div>
  );
}

export default App;
