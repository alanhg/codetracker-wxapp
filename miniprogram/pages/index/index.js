// index.js
import {setApiTokenKey} from "../../utils";

const app = getApp()

Page({
  data: {
    accountInfo: app.globalData.accountInfo,
    apiKey: null
  },

  onInputBlur(e) {
    const key = e.detail.value;
    this.setData({
      apiKey: key
    })
  },

  jumpPage() {
    setApiTokenKey(this.data.apiKey);
    wx.redirectTo({
      url: `/pages/home/index`,
    });
  },
});
