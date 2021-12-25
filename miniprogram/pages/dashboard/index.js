// index.js
import {api, getToday} from "../../utils";

const app = getApp();
Page({
  data: {
    accountInfo: app.globalData.accountInfo,
    todaySummary: null
  },
  onLoad(query) {
    api.getUserSummary(getToday(), getToday()).then(res => {
      this.setData({
        todaySummary: res
      })
    })
  },
});
