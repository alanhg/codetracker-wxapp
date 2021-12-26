// index.js
import {api, getToday} from "../../utils";

const app = getApp();
Page({
  data: {
    accountInfo: app.globalData.accountInfo,
    todaySummary: null,
    showDetailModal: false,
    detailModalData: {}
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
  showDetailModal: function () {
    this.setData({
      showDetailModal: true
    })
  }
});
