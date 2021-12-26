// index.js
import {setApiTokenKey} from "../../utils";

const app = getApp()

Page({
  data: {
    apiKey: null,
    errorMsg: null
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
    setApiTokenKey(this.data.apiKey);
    wx.redirectTo({
      url: `/pages/home/index`,
    });
  },
});
