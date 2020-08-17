import React, { useEffect, useState } from "react";
import { Auth } from "./model/auth";
import "./App.css";
import { QueryCondition } from "./model/queryCondition";
import { BrandOverview } from "./model/brandOverview";

function App() {
  useEffect(() => {
    async function getLogin() {
      const userInfo = {
        userName: "CN00022",
        userPwd: "123qweASD",
      };
      const loginRes = await Auth.getLogin(userInfo);
      console.log(loginRes);
      if (loginRes.resultCode === "00") {
        const { token, userId } = loginRes;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
      }
    }
    getLogin();
  }, []);

  /**
   * 定义变量
   */
  const [brandId] = useState(4);
  const [platformId] = useState([2, 3]);
  const [type] = useState("04");
  const [startDate] = useState("2020-07-01");
  const [endDate] = useState("2020-07-30");
  const [commentType] = useState("02");
  const [start] = useState(4);
  const [perPage] = useState(10);
  const [currentPage] = useState(1);

  const handleGetBrandList = async function () {
    const brandRes = await QueryCondition.getBrandList();
    const { brandList } = brandRes;
    console.log("brandList is", brandList);
  };

  const handleGetPlatformList = async function () {
    const platformRes = await QueryCondition.getPlaformList();
    console.log(platformRes);
  };

  const handleGetShopList = async function () {
    const shopRes = await QueryCondition.getShopList();
    console.log(shopRes);
  };

  const handleGetProvinceList = async function () {
    const provinceRes = await QueryCondition.getProvinceList();
    console.log(provinceRes);
  };

  const handleGetMarketList = async function () {
    const marketRes = await QueryCondition.getMarketList();
    console.log(marketRes);
  };

  const handleGetOperationList = async function () {
    const operationRes = await QueryCondition.getOperationList();
    console.log(operationRes);
  };

  const handleGetCouncilorList = async function () {
    const councilorRes = await QueryCondition.getCouncilorList();
    console.log(councilorRes);
  };

  const handleGetCategoryList = async function () {
    const categoryRes = await QueryCondition.getCategoryList();
    console.log(categoryRes);
  };

  const handleGetWarningComment = async function () {
    const commentRes = await BrandOverview.getWarningCommentList({
      brandId,
      platformId,
      type,
      startDate,
      endDate,
      currentPage,
      perPage,
    });
    console.log(commentRes);
  };

  const handleGetBrandPraise = async function () {
    const praiseRes = await BrandOverview.getBrandPraiseList({
      brandId,
      platformId,
      type,
      startDate,
      endDate,
      start,
    });
    console.log(praiseRes);
  };

  const handleGetScoreList = async function () {
    const scoreRes = await BrandOverview.getBrandScoreList({
      brandId,
      platformId,
      type,
      startDate,
      endDate,
    });
    console.log(scoreRes);
  };

  const handleGetWordCloud = async function () {
    const wordCloudRes = await BrandOverview.getBrandWordcloudList({
      brandId,
      platformId,
      type,
      startDate,
      endDate,
      commentType,
    });
    console.log(wordCloudRes);
  };

  return (
    <div className="App">
      <div className="search-condition">
        <button onClick={handleGetBrandList}>get brand</button>
        <button onClick={handleGetPlatformList}>get platform</button>
        <button onClick={handleGetProvinceList}>get province</button>
        <button onClick={handleGetMarketList}>get marketList</button>
        <button onClick={handleGetOperationList}>get operation</button>
        <button onClick={handleGetCouncilorList}>get councilor</button>
        <button onClick={handleGetShopList}>get shop</button>
        <button onClick={handleGetCategoryList}>get category</button>
      </div>
      <div className="brand-overview">
        <button onClick={handleGetWarningComment}>get warning comment</button>
        <button onClick={handleGetBrandPraise}>get brand praise</button>
        <button onClick={handleGetScoreList}>get score list</button>
        <button onClick={handleGetWordCloud}>get word cloud</button>
      </div>
    </div>
  );
}

export default App;
