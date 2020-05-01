/* eslint-disable camelcase */
export function formatDatetime (datetime) {
  return datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate() + ' ' + datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds()
}

export function formatDateFriendly (date, includeSeconds) {
  let now = new Date()
  let timeGap = (now.getTime() - date.getTime()) / 1000
  let dateTime = date.getDate()
  let date_now = now.getDate()

  let hour = date.getHours()
  let minute = date.getMinutes()
  let timeStr
  if (includeSeconds) {
    let seconds = date.getSeconds()
    timeStr = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`
  } else {
    timeStr = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`
  }

  // 今天内
  if (timeGap < 86401 && timeGap > -86401 && dateTime === date_now) {
    return `今天${timeStr}`
  }

  // 前天/昨天/明天/后天
  if (timeGap < 259201 && timeGap > -259201) {
    now.setDate(date_now + 2)
    let _date = now.getDate()
    if (_date === dateTime) {
      return `后天${timeStr}`
    }
    now.setDate(_date - 1)
    _date = now.getDate()
    if (_date === dateTime) {
      return `明天${timeStr}`
    }
    now.setDate(_date - 2)
    _date = now.getDate()
    if (_date === dateTime) {
      return `昨天${timeStr}`
    }
    now.setDate(_date - 1)
    _date = now.getDate()
    if (_date === dateTime) {
      return `前天${timeStr}`
    }
  }

  // 今年
  now = new Date()
  let year = date.getFullYear()
  let month = `${date.getMonth()}月`
  let datestr = dateTime < 10 ? ('0' + dateTime) : dateTime

  // 不是今年
  return `${year}年${month}${datestr}日${timeStr}`
}

// 将国际标准时间转换成北京时间  2020-01-13T16:00:00.000Z  --> 2020-01-14 00:00:00 在国际标准时间上加上8小时，即东八区时间
export function transferStandardToBeijingTime (standardTime) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  let T_pos = standardTime.indexOf('T')
  let Dot_pos = standardTime.indexOf('.')
  let year_month_day = standardTime.substr(0, T_pos)
  let hour_minute_second = standardTime.substr(T_pos + 1, Dot_pos - T_pos - 1)
  let new_datetime = year_month_day + ' ' + hour_minute_second
  // 处理成为时间戳
  let timestamp = new Date(Date.parse(new_datetime))
  timestamp = timestamp.getTime()
  timestamp = timestamp / 1000
  // 增加8个小时，北京时间比utc时间多八个时区
  timestamp = timestamp + 8 * 60 * 60
  // 时间戳转为时间
  let beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
  return beijing_datetime
}
