import React, { useEffect } from "react";
import {Auth} from "./model/auth";
import "./App.css";

function App() {
  useEffect(() => {
    // async function getLogin() {
    //   const userInfo = {
    //     userName: "xb_test1",
    //     userPwd: "123qwe...",
    //   };
    //   const loginRes = await Auth.getLogin(userInfo)
    //   console.log(loginRes)
    //   if (loginRes.resultCode === '00') {
    //     const {token, userId} = loginRes
    //     localStorage.setItem('token', token)
    //     localStorage.setItem('userId', userId)
    //   }
    // }
    // getLogin();
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
