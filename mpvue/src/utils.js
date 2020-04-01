
// 消息提示框
export function showSuccess(text) {
  // wx.showToast是小程序现成的API，其中title是提示的内容,icon是显示的图标
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal(title, content) {

  wx.hideLoading();
  wx.showModal({
    title,
    content,
    showCancel: false,
    success: function (res) { }
  });
}

// get工具函数
export function get(url, data) {
  // 返回的是一个Promise对象
  console.log("进入get")
  return request(url, 'GET', data)
}

// post工具函数
export function post(url, data) {
  // 返回的是一个Promise对象
  console.log("进入post")
  return request(url, 'POST', data)
}

// 将Promise对象封装在request()函数中
function request(url, method, data) {
  // 将wx.request请求API包装成一个Promise对象
  console.log("进入request")
  return new Promise((resolve, reject) => {
    wx.request({
      url: "http://localhost:3001" + url,
      method,
      data,
      success: function (res) {
        console.log('在request中的打印请求返回到前端的信息：', res)
        // resolve(res.data)
        // 当返回信息中resstatusCode为200时，说明执行成功，将状态变成resolved
        // 如果为-1说明执行失败，将状态变成rejected
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
