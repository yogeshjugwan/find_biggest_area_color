import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import ColorName from './ColorName';
import RGBColor from './RGBColor';

function App() {
  
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<ColorName/>}/>
      <Route path='/rgb' element={<RGBColor/>}/>
     </Routes>
    </div>
  );
}

export default App;
