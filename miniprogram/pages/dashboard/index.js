// index.js
import {api, formatDate, getDefaultTimeSpan, getTimeSpan, getUserInfo, setUserInfo} from "../../utils";

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
      title: `我${this.data.selectedTimeType.text}🧱${this.data.todaySummary.cummulative_total.text}，来瞅瞅你呢？`,
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
    let userInfo = getUserInfo();
    if (userInfo) {
      this.goToPosterPage(userInfo);
      return;
    }
    wx.getUserProfile({
      desc: '用于海报展示',
      fail: () => {

      },
      success: ({userInfo}) => {
        setUserInfo(userInfo);
        this.goToPosterPage(userInfo);
      }
    });
  },
  goToPosterPage: function (userInfo) {
    wx.navigateTo({
        url: '/pages/poster/index',
        success: (res) => {
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            todaySummary: this.data.todaySummary,
            selectedTimeType: this.data.selectedTimeType,
            userInfo
          })
        }
      },
    )
  }
});
