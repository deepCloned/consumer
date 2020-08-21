import { Http } from "../utils/util";

class ScoreAnalysis {
  /**
   * 公共参数
   * @param brandId number 品牌 id，全选则传 空字符串 ''
   * @param platformId number 平台id
   * @param startDate string 开始时间
   * @param endDate string
   * @param type string '01'-区域 '02'-分部 '03'-支部 '04'-门店
   */

  /**
   * 获取分值总览数据
   * @param typeName string 搜索关键词
   */
  static async getScoreOverview(data) {
    return await Http.consumerRequest({
      url: `brand/queryScoreColligate`,
      data,
    });
  }

  /**
   * 获取评分走势
   * @param dateType string '01'-日 '02'-周 '03'-月
   * @param typeId string - 未知
   */
  static async getScoreTrend(data) {
    return await Http.consumerRequest({
      url: `brand/queryShopScoreTrend`,
      data,
    });
  }

  /**
   * 获取星级总览
   * @param typeName string 搜索关键词
   */
  static async getStarOverview(data) {
    return await Http.consumerRequest({
      url: `brand/queryScoreList`,
      data,
    });
  }

  /**
   * 获取星级走势
   * @param dateType string '01'-日 '02'-周 '03'-月
   */
  static async getStarTrend(data) {
    return await Http.consumerRequest({
      url: `brand/queryStarTrend`,
      data,
    });
  }

  /**
   * 获取差评排行
   * @param typeName string 搜索关键词
   * @param star number 星级
   * @param starType string 评价类型 '00'-综合
   */
  static async getBadCommentRank(data) {
    return await Http.consumerRequest({
      url: `shop/queryShopRank`,
      data,
    });
  }

  /**
   * 获取好差评走势
   * @param star number 星级
   * @param starType string 评价类型 '00'-综合
   * @param dateType string '01'-日 '02'-周 '03'-月
   */
  static async getBadRateTrend(data) {
    return await Http.consumerRequest({
      url: `brand/queryBadRateTrend`,
      data,
    });
  }
}

export { ScoreAnalysis };
