import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { UserDataContext } from "./context/userContext";
import UserProtectWrapper from "./pages/UserProtectWrapper";

const App = ()=> {
  useContext(UserDataContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/>
      </Routes>
    </div>
  )
};

export default App;