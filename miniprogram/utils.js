const Base64 = require('miniprogram_npm/js-base64/index');
/**
 * https://wakatime.com
 */
const API = 'https://wakatime.1991421.cn';

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
      url: `${API}${url}?${stringify(params)}`,
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
    url: '/users/current'
  }),
  getUserSummary: (start, end) => requestWakaTime({
    url: '/users/current/summaries',
    params: {
      start,
      end
    }
  }),
};

export function formatDate(d) {
  return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(`0${d.getDate()}`).slice(-2)}`
}

/**
 * @description 默认为当天
 */
export const getDate = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
}

export const getStartOfWeek = () => {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + 1);
  return d;
}

export const getEndOfWeek = () => {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + 7);
  return d;
}

export const getStartOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export const getEndOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
export const timeSelectorType = {
  today: {
    value: 'today',
    text: '今天'
  },
  latest7: {
    value: 'latest7',
    text: '最近7天'
  },
  thisWeek: {
    value: 'thisWeek',
    text: '本周'
  },
  thisMonth: {
    value: 'thisMonth',
    text: '本月'
  }
}

export function getTimeSpan(type) {
  if (type === timeSelectorType.latest7.value) {
    return [getDate(-6), getDate()]
  }
  if (type === timeSelectorType.thisWeek.value) {
    return [getStartOfWeek(), getEndOfWeek()]
  }
  if (type === timeSelectorType.thisMonth.value) {
    return [getStartOfMonth(), getEndOfMonth()]
  }
  return [getDate(), getDate()]
}
