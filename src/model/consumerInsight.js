import { Http } from "../utils/util";

class ConsumerInsight {
  /**
   * 公共参数
   * @param brandId number 品牌 id
   * @param startDate string 开始时间
   * @param endDate string
   * @param platformId [number] 平台 全选则为 []
   * @param commentType string 评价类型 '01'-差评 '02'-好评
   * @param type string '01'-区域 '02'-分部 '03'-支部 '04'-门店
   */

  /**
   * 获取主题分析
   * @param typeName string 关键词搜索
   */
  static async getThemeAnalysis(data) {
    return await Http.consumerRequest({
      url: `comment/queryCategoryByBrand`,
      data,
    });
  }

  /**
   * 获取评价走势
   * @param dateType string '01'-日 '02'-周 '03'-月
   */
  static async getEvaluateTrend(data) {
    return await Http.consumerRequest({
      url: `comment/queryCommentTrendList`,
      data,
    })
  }

  /**
   * 获取关键词分析
   */
  static async getKeywordAnalysis(data) {
    return await Http.consumerRequest({
      url: `comment/queryCommentCategoryLevelTwo`,
      data,
    })
  }

  /**
   * 获取关键词走势
   */
  static async getKeywordTrend(data) {
    return await Http.consumerRequest({
      url: `comment/queryCommentByCategoryIdTrend`,
      data,
    })
  }

  /**
   * 获取维度分析
   */
  static async getDimensionAnalysis(data) {
    return await Http.consumerRequest({
      url: `comment/queryCommentDimension`,
      data,
    })
  }

  /**
   * 获取关键词门店
   */
  static async getKeywordShop(data) {
    return await Http.consumerRequest({
      url: `comment/queryCategoryIdShop`,
      data,
    })
  }
}

export { ConsumerInsight };
