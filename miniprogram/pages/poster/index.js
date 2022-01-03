// index.js
const app = getApp()

Page({
  data: {
    imgDraw: null,
    sharePath: null,
    imgVisible: false
  },
  variable: {

  },
  onLoad(query) {
    wx.showLoading({
      title: '海报生成中',
    });
  },
  onReady() {
    this.drawPic();
  },
  onImgOK(e) {
    wx.hideLoading();
    this.setData({
      sharePath: e.detail.path,
      imgVisible: true
    })
  },
  drawPic() {
    const views = [
      {
        type: 'text',
        text: '已码字xxx小时',
        css: {}
      }
    ];
    this.setData({
      imgDraw: {
        width: '654rpx',
        height: '1225rpx',
        background: '#fff',
        views,
      }
    })
  }
});
