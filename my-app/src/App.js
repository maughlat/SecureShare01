import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Portal } from "./components/Portal";
import { PortalNavbar } from "./components/PortalNavbar";


function App() {
  return (
    /*
    <>
      <PortalNavbar />
      <Portal />
    </>
*/    
    <>
      <Navbar />
      <Login />
      
    </>
    
  );
}
export default App;
