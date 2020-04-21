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
