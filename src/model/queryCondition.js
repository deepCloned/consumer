import { Http } from "../utils/util";

class QueryCondition {
  /**
   * 查询品牌
   */
  static async getBrandList() {
    return await Http.archiveRequest({
      url: `user/queryBrandListByUser`,
    });
  }

  /**
   * 查询平台列表
   */
  static async getPlaformList() {
    return await Http.archiveRequest({
      url: `user/queryCustomerPlatformList`,
    });
  }

  /**
   * 查询城市列表
   */
  static async getProvinceList() {
    return await Http.archiveRequest({
      url: `province/queryProvinceList`,
    });
  }

  /**
   * 获取市场列表
   */
  static async getMarketList() {
    return await Http.archiveRequest({
      url: `user/queryUserMarketList`,
    });
  }

  /**
   * 获取营运列表
   * @param marketList 市场列表
   */
  static async getOperationList(data) {
    return await Http.archiveRequest({
      url: `user/queryOperationList`,
      data,
    })
  }

  /**
   * 获取督导列表
   * @param operationList 营运列表
   */
  static async getCouncilorList(data) {
    return await Http.archiveRequest({
      url: `user/queryCouncilorList`,
      data,
    })
  }

  /**
   * 获取门店列表
   * @param marketList 市场列表
   * @param operationList 营运列表
   * @param councilorList 督导列表
   */
  static async getShopList(data) {
    return await Http.archiveRequest({
      url: `user/queryShopListByUser`,
      data,
    });
  }

  /**
   * 获取关键词分类
   */
  static async getCategoryList() {
    return await Http.consumerRequest({
      url: `comment/queryCategoryList`,
    })
  }
}

export { QueryCondition };
