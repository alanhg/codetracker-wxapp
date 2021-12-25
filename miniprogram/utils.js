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

const stringify = params => Object.keys(params).map(k => k + '=' + params[k]).join('&');
const requestWakaTime = ({method = 'get', data, url, params = {}}) => new Promise((resolve, reject) => {
    wx.request({
      url: `https://wakatime.com${url}?${stringify(params)}`,
      data,
      method,
      header: {
        Authorization: 'Basic ' + Base64.encode(getApiTokenKey())
      },
      success: res => {
        resolve(res.data)
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
  }),
  getUserSummary: (start, end) => requestWakaTime({
    url: '/api/v1/users/current/summaries',
    params: {
      start,
      end
    }
  }),
};


export const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(`0${d.getDate()}`).slice(-2)}`;
}
