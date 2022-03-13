import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [id, setId] = useState(-1);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setEmail={setEmail} email={email} setPass={setPass} pass={pass} setId={setId}/>}/>
          <Route path="/dashboard" element={<Dashboard email={email} pass={pass} id={id}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
