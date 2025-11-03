import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Portal } from "./components/Portal";
import { PortalNavbar } from "./components/PortalNavbar";
import { About } from "./components/About";


function App() {
  return (
    /*
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Login />
          </>
        } />
        <Route path="/portal" element={
          <>
            <PortalNavbar />
            <Portal />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
          </>
        } />
      </Routes>
    </Router>
*/
    
    <>
            <PortalNavbar />
            <Portal />
          </>
    
  );
}
export default App;
