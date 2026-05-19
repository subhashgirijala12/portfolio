import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import AuthCallback from "./AuthCallback";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
