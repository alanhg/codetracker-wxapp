// index.js
const app = getApp()

Page({
  data: {
    imgDraw: null,
    sharePath: null,
    imgVisible: false,
  },
  variable: {
    todaySummary: null,
    selectedTimeType: null,
  },
  onLoad(query) {
    wx.showLoading({
      title: '海报生成中',
    });
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.variable.todaySummary = data.todaySummary;
      this.variable.selectedTimeType = data.selectedTimeType;
    })
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
        type: 'image',
        url: 'https://static.1991421.cn/codetracker/bricklayer-pana.png',
        css: {}
      },
      {
        type: 'text',
        text: `${this.variable.selectedTimeType.text}`,
        css: {
          top: '48rpx',
          left: '48rpx',
          color: '#1485ee',
          fontWeight: 700
        }
      },
      {
        type: 'text',
        text: `已码字`,
        css: {
          top: '48rpx',
          left: `${this.variable.selectedTimeType.text.length * 18 + 48}rpx`,
        }
      },
      {
        type: 'text',
        text: `${this.variable.todaySummary.cummulative_total.text}`,
        css: {
          top: '70rpx',
          left: '48rpx',
          fontSize: '22px',
          color: '#fa5151'
        }
      },
      {
        type: 'text',
        text: `参与项目：${this.variable.todaySummary.cummulative_total.text}`,
        css: {
          top: '130rpx',
          left: '48rpx',
          fontSize: '14px',
        }
      },
      {
        type: 'text',
        text: `开发语言：${this.variable.todaySummary.cummulative_total.text}`,
        css: {
          top: '160rpx',
          left: '48rpx',
          fontSize: '14px',
        }
      },
      {
        type: 'text',
        text: `编辑器：${this.variable.todaySummary.cummulative_total.text}`,
        css: {
          top: '190rpx',
          left: '48rpx',
          fontSize: '14px',
        }
      },
      {
        type: 'text',
        text: `操作系统：${this.variable.todaySummary.cummulative_total.text}`,
        css: {
          top: '220rpx',
          left: '48rpx',
          fontSize: '14px'
        }
      }
    ];
    this.setData({
      imgDraw: {
        width: '750rpx',
        height: '682rpx',
        views,
      }
    })
  }
});
