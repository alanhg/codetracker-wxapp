// index.js
import {api, formatDate, getDefaultTimeSpan, getTimeSpan, timeSelectorType} from "../../utils";

const app = getApp();

Page({
  data: {
    todaySummary: null,
    selectedDetailType: null,
    // 选择的时间区间
    selectedTimeType: null,
  },
  onShow() {
    this.setData({
      selectedTimeType: getDefaultTimeSpan(),
    }, this.refresh)
  },
  onPullDownRefresh: function () {
    this.refresh();
  },
  refresh: async function () {
    wx.showLoading({
      title: '数据加载中',
    });
    const times = getTimeSpan(this.data.selectedTimeType.value);
    const res = await api.getUserSummary(formatDate(times[0]), formatDate(times[1]));
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
  },
  timerSelectorClick: function ({detail: selectedTimeType}) {
    this.setData({
      selectedTimeType,
    }, this.refresh)
  },
  timerSelectorShowClick: function () {
    const child = this.selectComponent('#timeSpanSelector');
    child.timerSelectorShowClick();
  }
});
