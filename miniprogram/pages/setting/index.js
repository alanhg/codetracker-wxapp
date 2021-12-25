// index.js
import {removeApiTokenKey} from "../../utils";

Page({
  jumpPage() {
    removeApiTokenKey();
    wx.redirectTo({
      url: `/pages/index/index`,
    });
  },
});
