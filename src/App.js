import React, { useEffect } from "react";
import md5 from "blueimp-md5";
import qs from 'qs';
import axios from 'axios';
import "./App.css";

function App() {
  useEffect(() => {
    async function getLogin() {
      const url = "/api/system/userLogin";
      const userInfo = {
        userName: "xb_test1",
        userPwd: md5("123qwe..."),
      };
      const requestData = {
        data: JSON.stringify(userInfo)
      }
      console.log('process.env.NODE_ENV', process.env.NODE_ENV)
      // try {
      //   const loginRes = await axios({
      //     url,
      //     method: 'POST',
      //     headers: {
      //       "Content-Type": 'application/x-www-form-urlencoded'
      //     },
      //     data: qs.stringify(requestData)
      //   })
      //   console.log(loginRes);
      // } catch (err) {
      //   console.log(err);
      // }
    }
    getLogin();
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
