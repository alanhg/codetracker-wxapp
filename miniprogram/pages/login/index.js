// index.js
import {getApiTokenKey, setApiTokenKey} from "../../utils";

const app = getApp()

Page({
  data: {
    apiKey: null,
    errorMsg: null
  },

  onLoad(query) {
    app.globalData = {
      secretApiKey: getApiTokenKey(),
    };
    if (app.globalData.secretApiKey) {
      wx.redirectTo({
        url: `/pages/home/index`,
      });
    }
  },
  onInputBlur(e) {
    const key = e.detail.value;
    this.setData({
      apiKey: key
    })
  },

  jumpPage() {
    if (!this.data.apiKey || !this.data.apiKey.trim()) {
      this.setData({
        errorMsg: '请输入Key'
      })
      return
    }
    this.setData({
      errorMsg: null
    })
    setApiTokenKey(this.data.apiKey.trim());
    wx.redirectTo({
      url: `/pages/home/index`,
    });
  },
  helpClick() {
    wx.navigateTo({
      url: '/pages/guide/index'
    })
  }
});
