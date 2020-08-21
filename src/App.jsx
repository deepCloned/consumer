import React, { useEffect, useState } from "react";
import { Auth } from "./model/auth";
import "./App.css";
import { QueryCondition } from "./model/queryCondition";
import { BrandOverview } from "./model/brandOverview";
import { ScoreAnalysis } from "./model/scoreAnalysis";

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

  /* 评分分析 */
  const [dateType] = useState("01");
  const [typeName] = useState("");
  const [typeId] = useState("");
  const [star] = useState("3");
  const [starType] = useState("00");

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

  const handleGetScoreOverview = async function () {
    const scoreRes = await ScoreAnalysis.getScoreOverview({
      brandId,
      platformId,
      startDate,
      endDate,
      type,
      typeName,
    })
    console.log(scoreRes)
  }

  const handleGetScoreTrend = async function () {
    const trendRes = await ScoreAnalysis.getScoreTrend({
      brandId,
      platformId,
      startDate,
      endDate,
      type,
      dateType,
    })
    console.log(trendRes)
  }

  const handleGetStarOverview = async function () {
    const starRes = await ScoreAnalysis.getStarOverview({
      brandId,
      platformId,
      startDate,
      endDate,
      type,
      typeName,
    })
    console.log(starRes)
  }

  const handleGetStarTrend = async function () {
    const trendRes = await ScoreAnalysis.getStarTrend({
      brandId,
      platformId,
      startDate,
      endDate,
      type,
      dateType,
    })
    console.log(trendRes)
  }

  const handleGetBadCommentRank = async function () {
    const rankRes = await ScoreAnalysis.getBadCommentRank({
      brandId,
      platformId,
      startDate,
      endDate,
      type,
      typeName,
      star,
      starType,
    })
    console.log(rankRes)
  }

  const handleGetBadRateTrend = async function () {
    const trendRes = await ScoreAnalysis.getBadRateTrend({
      brandId,
      platformId,
      startDate,
      endDate,
      type,
      star,
      starType,
      dateType,
    })
    console.log(trendRes)
  }

  return (
    <div className="App">
      <div className="search-condition">
        <h4>search condition</h4>
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
        <h4>brand overview</h4>
        <button onClick={handleGetWarningComment}>get warning comment</button>
        <button onClick={handleGetBrandPraise}>get brand praise</button>
        <button onClick={handleGetScoreList}>get score list</button>
        <button onClick={handleGetWordCloud}>get word cloud</button>
      </div>
      <div className="score-analysis">
        <h4>score analysis</h4>
        <button onClick={handleGetScoreOverview}>get score overview</button>
        <button onClick={handleGetScoreTrend}>get score trend</button>
        <button onClick={handleGetStarOverview}>get star overview</button>
        <button onClick={handleGetStarTrend}>get star trend</button>
        <button onClick={handleGetBadCommentRank}>get bad comment rank</button>
        <button onClick={handleGetBadRateTrend}>get bad rate trend</button>
      </div>
    </div>
  );
}

export default App;
