
class DateModel {
  // 时间戳转换为日期时分秒
  static timestampToDate(timestamp, needSeconds = false) {
    const tempDate = new Date(timestamp)
    const year = tempDate.getFullYear()
    const month = DateModel._zeroPadding(tempDate.getMonth() + 1)
    const date = DateModel._zeroPadding(tempDate.getDate())
    const hour = DateModel._zeroPadding(tempDate.getHours())
    const minute = DateModel._zeroPadding(tempDate.getMinutes())
    const second = DateModel._zeroPadding(tempDate.getSeconds())
    if (needSeconds) {
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    }
    return `${year}-${month}-${date} ${hour}:${minute}`
  }

  // 获取当前时间
  static getCurDate() {
    return DateModel.formateDate(new Date())
  }

  // 获取传入日期月的第一天
  static getStartDateOfMonth(date) {
    if (date.indexOf('-') > 0) {
      date = date.split('-').join('/')
    }
    const _date = new Date(date)
    const year = _date.getFullYear()
    const month = _date.getMonth() + 1
    return DateModel.formateDate(`${year}/${month}/1`)
  }

  /**
   * 传入日期，返回当前日期所在月份的最后一天
   */
  static getEndDateOfMonth(date) {
    if (date.indexOf('-') > 0) {
      date = date.split('-').join('/')
    }
    const _date = new Date(date)
    const year = _date.getFullYear()
    const month = _date.getMonth() + 1
    const endOfLastMonth = DateModel.getLast(year, month)
    return DateModel.formateDate(endOfLastMonth)
  }

  /**
   * new Date('2020-01-01').getMonth()  // 0
   * new Date(2020, 01, 01).getMonth()  // 1
   */
  // 传入当前日期，获取上个月最后一天
  static getEndDateOfLastMonth(date) {
    console.log('date is', date)
    if (date.indexOf('-') > 0) {
      date = date.split('-').join('/')
    }
    const _date = new Date(date)
    let year = _date.getFullYear()
    let month = _date.getMonth()
    if (month === 0) {
      month = 12
      year = year - 1
    }
    const endOfLastMonth = DateModel.getLast(year, month)
    return DateModel.formateDate(endOfLastMonth)
  }

  // 获取上个月第一天
  static getStartDateOfLastMonth(date) {
    const endOfLastMonth = DateModel.getEndDateOfLastMonth(date)
    return DateModel.formateDate(DateModel.getStartDateOfMonth(endOfLastMonth))
  }

  /**
   * 获取上个月
   * new Date(y, m, 0) 当且仅当 m 不等于 0 的时候会返回上个月最后一天
   */
  static getLast(y, m) {
    return new Date(y, m, 0)
  }

  /**
   * 传入当前时间
   * 返回当前时间所在周的第一天日期
   * 零时零分零秒(不用考虑直接传)
   * 如果是周一，也不影响减去的是零毫秒
   */
  static getStartDateOfWeek(date) {
    const _date = new Date(date)
    const index = DateModel.getIndexOfWeek(_date)
    const count = index - 1
    const ms = DateModel.getMsByCount(count)
    return DateModel.formateDate(_date - ms)
  }

  /**
   * 传入日期，返回该日期是该周的第几天
   * 如果是0则返回7
   */
  static getIndexOfWeek(date) {
    const index = new Date(date).getDay()
    return index === 0 ? 7 : index
  }

  /**
   * 传入天数 number
   * 返回 number，天数的毫秒数
   */
  static getMsByCount(count) {
    return 60 * 60 * 24 * 1000 * count
  }
  // 格式化日期
  static formateDate(date) {
    const _date = new Date(date)
    const year = _date.getFullYear()
    const month = DateModel._zeroPadding(_date.getMonth() + 1)
    const curDate = DateModel._zeroPadding(_date.getDate())
    return `${year}-${month}-${curDate}`
  }

  // 小于 10，需要补零操作
  static _zeroPadding(num) {
    return num < 10 ? `0${num}` : num
  }
}

export {
  DateModel
}
