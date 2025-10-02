import React from 'react';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {

  return (
      <>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
      </>
  )
}
export default App
