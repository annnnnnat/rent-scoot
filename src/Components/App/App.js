import React,{useState,useEffect} from 'react';
import './App.css';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Rent from '../Rent/Rent/Rent';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from '../../custom-axios/axios.js';
import PromotionsService from '../../repository/axiosPromotionsRepository';

//Make class component
function App() {
  const [models,setModels] = useState([]);
  const [promotions, setPromotions] = useState([])
  useEffect(() => {
    fetchPromotions();
    console.log(promotions);
    // axios.get("/api/manage/models").then(res => {
    //   setModels(res.data);
    // });
  },[]);
  const [selectedNav, setSelectedNav] = useState(0);
  const handleNavHome = (selected) => {
    setSelectedNav(selected);
    //console.log(selectedNav);
    } 
    const fetchPromotions = async () => {
      const promo = await PromotionsService.fetchPromotions().then( (data) => {
        return data.data;
      });
      setPromotions(promo);
    }
  return (
    <Router>
    <div className="App">
      <Navbar navValue={selectedNav}/>
      <div className="Content">
      <Switch>
        <Route path="/" exact render={props => 
  (<Home handleNavHome={handleNavHome} models={models}/>)} />
        <Route path="/About" component={About} />
        <Route path="/Rent" render={ props => ( <Rent promotions={promotions} /> )} />
        <Route path="/Contact" component={Contact} />
      </Switch>
      </div>

      <Footer />

    </div>
    </Router>
  );
}

export default App;
