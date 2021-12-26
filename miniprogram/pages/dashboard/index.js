// index.js
import {api, getToday} from "../../utils";

const app = getApp();
Page({
  data: {
    accountInfo: app.globalData.accountInfo,
    todaySummary: null,
    selectedDetailType: null
  },
  onLoad(query) {
    wx.showLoading({
      title: '数据加载中',
    })
    this.refresh().then(() => {
      wx.hideLoading();
    })
  },
  onPullDownRefresh: function () {
    this.refresh();
  },
  refresh: async function () {
    const res = await api.getUserSummary(getToday(), getToday());
    this.setData({
      todaySummary: res,
    });
  },
  onDetailClick: function (e) {
    if (this.data.selectedDetailType === e.currentTarget.dataset.type) {
      this.setData({
        selectedDetailType: null
      })
    } else {
      this.setData({
        selectedDetailType: e.currentTarget.dataset.type
      })
    }
  }
});
