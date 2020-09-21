import baseRequest from '../base'
import { DateModel } from '@/utils/date'

export async function queryCouponList1(data) {
  const res = await baseRequest({
    url: 'coupon/queryAll',
    method: 'post',
    data
  })
  if (res.resultCode === '9001') {
    return res.result
  }
}

/**
 * 分页查询礼券类型
 * @param pageNum 当前页 number
 * @param pageSize 每页数据量 number
 * @param queryParamMap object
 * @param name 礼券名字 string
 * @param promotionList 促销类型集合 Array []
 * @param typeList
 * @param statusList
 * @param startDate
 * @param endDate
 */
export async function queryCouponList(data) {
  const res = await baseRequest({
    url: 'coupon/query_list',
    method: 'post',
    data
  })
  if (res.resultCode === '9001') {
    for (let i = 0; i < res.result.content.length; i++) {
      const { promotion } = res.result.content[i]
      switch (promotion) {
        case '00':
          res.result.content[i].promotionText = '满减'
          break
        case '01':
          res.result.content[i].promotionText = '折扣'
          break
        case '02':
          res.result.content[i].promotionText = '赠品'
          break
      }
      const { type } = res.result.content[i]
      switch (type) {
        case '00':
          res.result.content[i].typeText = '图片'
          break
        case '01':
          res.result.content[i].typeText = '链接'
          break
      }
      const startDate = DateModel.timestampToDate(res.result.content[i].startDate, false)
      const endDate = DateModel.timestampToDate(res.result.content[i].endDate, false)
      res.result.content[i].date = startDate + '-' + endDate
    }
    return res.result
  }
}

/**
 * 删除礼券
 * @param id集合 ids Array []
 */
export async function getCouponDelete(data) {
  const res = await baseRequest({
    url: 'coupon/delete',
    method: 'post',
    data
  })
  if (res.resultCode === '9001') {
    return res
  }
}

/**
 * 新增礼券
 * @param name 礼券名字 String
 * @param promotion 礼券类型 String
 * @param type 发送类型 String
 * @param startDate 开始时间 String
 * @param endDate 结束时间 String
 * @param title 消息标题 String
 * @param desc 消息描述 String
 * @param picUrl 图片地址 String
 * @param linkUrl 链接地址 String
 */
export async function getCreateCoupon(data) {
  const res = await baseRequest({
    url: 'coupon/create',
    method: 'post',
    data
  })
  if (res.resultCode === '9001') {
    return res
  }
}
