// index.js
import {api, formatDate, getDate, getEndOfMonth, getEndOfWeek, getStartOfMonth, getStartOfWeek} from "../../utils";

const app = getApp();

const timeSelectorType = {
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

function getTimeSpan(type) {
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

Page({
  data: {
    todaySummary: null,
    selectedDetailType: null,
    showTimeSelector: false,
    // 选择的时间区间
    selectedTimeType: timeSelectorType.today,
    timeSelectorGroups: Object.keys(timeSelectorType).map(item => ({
      text: timeSelectorType[item].text,
      value: timeSelectorType[item].value
    }))
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
  timerSelectorClick: function ({detail}) {
    this.setData({
      selectedTimeType: this.data.timeSelectorGroups[detail.index],
      showTimeSelector: false,
    }, this.refresh)
  },
  timerSelectorShowClick: function () {
    this.setData({
      showTimeSelector: true,
    })
  }
});
