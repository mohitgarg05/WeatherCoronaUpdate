import React from 'react'
import './App.css';
import {Route,Switch} from 'react-router-dom';
import Search from './Components/search'
import {AnimatePresence} from 'framer-motion'
import "./responsive.css"
import Weather from './Components/weather'


function App() {
  return (
    <>
   <Switch>   
      <AnimatePresence>
          <Route exact path='/'>
            <Search />
          </Route>
          <Route exact path='/:cityname'>
            <Weather />
          </Route>
      </AnimatePresence>
    </Switch>
    </>
  );
}

export default App;
