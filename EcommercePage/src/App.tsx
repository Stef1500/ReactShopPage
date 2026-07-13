import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Checkout from "./Pages/Checkout";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="*" element></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
