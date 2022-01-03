// index.js
import {api, formatDate, getDefaultTimeSpan, getTimeSpan, timeSelectorType} from "../../utils";

Page({
  data: {
    todaySummary: null,
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
  onShareAppMessage: function () {
    return {
      title: `我${this.data.selectedTimeType.text}搬砖${this.data.todaySummary.cummulative_total.text}`,
      desc: '来看看吧',
      path: '/page/home/index', // 路径，传递参数到指定页面。
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
  },
  sharePosterClick: function () {
    wx.navigateTo({
        url: '/pages/poster/index',
        success: (res) => {
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            todaySummary: this.data.todaySummary,
            selectedTimeType: this.data.selectedTimeType,
          })
        }
      },
    )
  }
});
