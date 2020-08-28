import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth } from "../../model/auth";

import logoImage from "../../assets/logo.png";
import "./login.scss";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* 登录操作 */
  const handleGetLogin = async function () {
    if (username.length === 0) {
      alert("请输入用户名");
      return;
    }
    if (password.length === 0) {
      alert("请输入密码");
      return;
    }

    const userInfo = {
      userName: username,
      userPwd: password,
    };

    const loginRes = await Auth.getLogin(userInfo);
    if (loginRes.resultCode === Auth.successResultCode) {
      console.log(loginRes);
      const { userId, token } = loginRes;
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      /**
       * 登录成功，跳转页面
       */
      props.history.push("/main");
    }
  };

  return (
    <Router>
      <div className="login center">
        <div className="login-content">
          <div className="content-left">
            <img src={logoImage} alt="logo" />
          </div>
          <div className="content-right">
            <h4 className="login-title">欢迎登录</h4>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="input-wrap">
              <input
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button onClick={handleGetLogin} className="get-login">
              登录
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Login;
