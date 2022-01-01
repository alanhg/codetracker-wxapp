// index.js
import {getDefaultTimeSpan, removeApiTokenKey, setDefaultTimeSpan} from "../../utils";

Page({
  data: {
    // 选择的时间区间
    selectedTimeType: getDefaultTimeSpan(),
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
  timerSelectorShowClick: function () {
    const child = this.selectComponent('#timeSpanSelector');
    child.timerSelectorShowClick();
  }
});
