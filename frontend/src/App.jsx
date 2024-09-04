import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Protected from './config/Protected';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-[url('./assets/image.png')] bg-cover h-screen text-slate-50 " style={{ backgroundPosition: '20% 30%' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={ <Protected component={Home} /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
