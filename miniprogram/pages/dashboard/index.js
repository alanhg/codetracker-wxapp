// index.js
import {api} from "../../utils";

const app = getApp();
Page({
  data: {
    accountInfo: app.globalData.accountInfo,
  },
  onLoad(query) {
    api.getUserInfo().then(res => {
      console.log(res);
    })
  },
});
