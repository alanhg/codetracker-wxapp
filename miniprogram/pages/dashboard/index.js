// index.js
import {api, getApiTokenKey} from "../../utils";

const app = getApp()

Page({
  data: {
    accountInfo: app.globalData.accountInfo,
    key: getApiTokenKey()
  },
  onLoad(query) {
    api.getUserInfo().then(res => {
      console.log(res);
    })
  },
  onInputBlur(e) {

  },
  jumpPage(e) {

  },
  onShareAppMessage() {
    return {
      title: '我已🧱xxx小时',
      path: '/page/user?id=123'
    }
  }
});
