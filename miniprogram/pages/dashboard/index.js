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
});
