import { Http } from "../utils/util";

class BrandOverview {
  /**
   * 公共参数
   * @param brandId number 品牌 id，全选则传 空字符串 ''
   * @param platformId array 平台id
   * @param type string 默认 '04'
   * @param startDate string 开始时间
   * @param endDate string 结束时间
   */

  /**
   * 获取评分总览
   */
  static async getBrandScoreList(data) {
    return await Http.consumerRequest({
      url: `brand/queryBrandScoreList`,
      data,
    });
  }

  /**
   * 获取品牌词云
   * @param commentType string 评分类型 '01': 差评  '02': 好评
   */
  static async getBrandWordcloudList(data) {
    return await Http.consumerRequest({
      url: `comment/queryCommentSegList`,
      data,
    });
  }

  /**
   * 获取品牌口碑分析
   * @param start number 星级（应为 star start-开始）
   */
  static async getBrandPraiseList(data) {
    return await Http.consumerRequest({
      url: `brand/BrandPublicPraiseList`,
      data,
    })
  }

  /**
   * 获取预警评论
   * currentPage number 分页之当前页
   * perPage number 分页之一页的数据量
   */
  static async getWarningCommentList(data) {
    return await Http.consumerRequest({
      url: `comment/queryCommentCount`,
      data,
    })
  }
}

export { BrandOverview };
