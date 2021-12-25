// index.js
import {api, getApiTokenKey} from "../../utils";

const app = getApp()

Page({
  data: {
    accountInfo: app.globalData.accountInfo,
    key: getApiTokenKey(),
    tabs: [{
      text: "仪表盘",
      pagePath: '/pages/dashboard/index'
    },
      {
        text: "设置",
        pagePath: '/pages/setting/index'
      }],
    currentIdx: 0
  },
  onLoad(query) {
    wx.hideHomeButton();
    wx.switchTab({
      url: this.data.tabs[0].pagePath
    })
  },
  onShareAppMessage() {
    return {
      title: '我已🧱xxx小时',
      path: '/page/user?id=123'
    }
  },
  tabChange: function (event) {

    wx.switchTab({
      url: event.detail.item.pagePath,
      success: () => {
        this.setData({
          currentIdx: event.detail.index
        })
      },
      fail: (e) => {
        console.error(e);
      }
    })
  }
});
