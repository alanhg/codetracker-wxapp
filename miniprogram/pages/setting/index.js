// index.js
import {getApiTokenKey, getDefaultTimeSpan, removeApiTokenKey, setApiTokenKey, setDefaultTimeSpan} from "../../utils";

Page({
  data: {
    // 选择的时间区间
    selectedTimeType: getDefaultTimeSpan(),
    showApiKeyConfirm: false,
    apiKey: getApiTokenKey()
  },
  jumpPage() {
    removeApiTokenKey();
    wx.redirectTo({
      url: `/pages/login/index`,
    });
  },
  timerSelectorClick: function ({detail: selectedTimeType}) {
    this.setData({
      selectedTimeType,
    }, () => {
      setDefaultTimeSpan(selectedTimeType)
    })
  },
  onApiKeyInputBlur: function ({detail: {value}}) {
    if (value.trim() !== this.data.apiKey) {
      this.setData({
        showApiKeyConfirm: true,
        apiKey: value.trim()
      })
    }
  },
  timerSelectorShowClick: function () {
    const child = this.selectComponent('#timeSpanSelector');
    child.timerSelectorShowClick();
  },
  onApiKeyConfirm: function () {
    this.setData({
      showApiKeyConfirm: false
    }, () => {
      setApiTokenKey(this.data.apiKey)
    })
  },
  logoutClick: function () {
    removeApiTokenKey();
    wx.redirectTo({
      url: '/pages/login/index'
    })
  },
  helpClick: function () {
    wx.navigateTo({
      url: '/pages/guide/index'
    })
  }
});
