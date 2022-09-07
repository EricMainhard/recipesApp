import React from 'react'
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import NoFound from './NoFound';
import Cuisine from './Cuisine';
import Results from './Results';
import Recipe from './Recipe';


function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<NoFound/>}/>
      <Route path='/cuisine/:type' element={<Cuisine/>}/>
      <Route path='/results/:search' element={<Results/>}/>
      <Route path='/recipe/:id' element={<Recipe/>}/>
    </Routes>
  )
}


export default Pages