// index.js
import {api, getToday} from "../../utils";

const app = getApp();
Page({
  data: {
    todaySummary: null,
    selectedDetailType: null
  },
  onLoad() {
    this.refresh();
  },
  onPullDownRefresh: function () {
    this.refresh();
  },
  refresh: async function () {
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await api.getUserSummary(getToday(), getToday());
    this.setData({
      todaySummary: res,
    });
    wx.hideLoading();
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
  },
  onShareAppMessage: function () {
    return {
      title: '我今天搬砖' + this.data.todaySummary.cummulative_total.text,
      desc: '来看看吧',
      path: '/page/index', // 路径，传递参数到指定页面。
      imageUrl: '/images/bricklayer-pana.png'
    }
  }
});
