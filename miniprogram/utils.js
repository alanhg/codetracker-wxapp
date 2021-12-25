const Base64 = require('miniprogram_npm/js-base64/index');

export function setApiTokenKey(key) {
  wx.setStorageSync("apiTokenKey", key)
}

export function getApiTokenKey() {
  return wx.getStorageSync('apiTokenKey')
}

export function removeApiTokenKey() {
  wx.removeStorageSync("apiTokenKey")
}


const requestWakaTime = ({method = 'get', data, url}) => new Promise((resolve, reject) => {
    wx.request({
      url: 'https://wakatime.com' + url,
      data,
      method,
      header: {
        Authorization: 'Basic ' + Base64.encode(getApiTokenKey())
      },
      success: res => {
        resolve(res.data.data)
      },
      fail: res => {
        reject(res);
      }
    });
  }
)

export const api = {
  getUserInfo: () => requestWakaTime({
    url: '/api/v1/users/current'
  })
};
