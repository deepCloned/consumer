import React, { useEffect } from "react";
import {Auth} from "./model/auth";
import "./App.css";
import { QueryCondition } from "./model/queryCondition";

function App() {
  useEffect(() => {
    async function getLogin() {
      const userInfo = {
        userName: "CN00022",
        userPwd: "123qweASD",
      };
      const loginRes = await Auth.getLogin(userInfo)
      console.log(loginRes)
      if (loginRes.resultCode === '00') {
        const {token, userId} = loginRes
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
      }
    }
    getLogin();
  }, []);

  const handleGetBrandList = async function () {
    const brandRes = await QueryCondition.getBrandList()
    const {brandList} = brandRes
    console.log('brandList is', brandList)
  }

  const handleGetPlatformList = async function () {
    const platformRes = await QueryCondition.getPlaformList()
    console.log(platformRes)
  }

  const handleGetShopList = async function () {
    const shopRes =await QueryCondition.getShopList()
    console.log(shopRes)
  }

  const handleGetProvinceList = async function () {
    const provinceRes = await QueryCondition.getProvinceList()
    console.log(provinceRes)
  }

  const handleGetMarketList = async function () {
    const marketRes = await QueryCondition.getMarketList()
    console.log(marketRes)
  }

  const handleGetOperationList = async function () {
    const operationRes = await QueryCondition.getOperationList()
    console.log(operationRes)
  }

  const handleGetCouncilorList = async function () {
    const councilorRes = await QueryCondition.getCouncilorList()
    console.log(councilorRes)
  }

  const handleGetCategoryList = async function () {
    const categoryRes = await QueryCondition.getCategoryList()
    console.log(categoryRes)
  }

  return (
    <div className="App">
      <button onClick={handleGetBrandList}>get brand</button>
      <button onClick={handleGetPlatformList}>get platform</button>
      <button onClick={handleGetProvinceList}>get province</button>
      <button onClick={handleGetMarketList}>get marketList</button>
      <button onClick={handleGetOperationList}>get operation</button>
      <button onClick={handleGetCouncilorList}>get councilor</button>
      <button onClick={handleGetShopList}>get shop</button>
      <button onClick={handleGetCategoryList}>get category</button>
    </div>
  );
}

export default App;
