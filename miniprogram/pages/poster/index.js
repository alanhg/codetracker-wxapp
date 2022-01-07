// index.js
const app = getApp()

function getSummaryText(title, dataset) {
  return `${title}：${dataset[0].name}（${dataset[0].percent}%）`;
}

Page({
  data: {
    imgDraw: null,
    sharePath: null,
    imgVisible: false,
  },
  variable: {
    todaySummary: null,
    selectedTimeType: null,
    userInfo: null
  },
  onLoad(query) {
    wx.showLoading({
      title: '海报生成中',
    });
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.variable.todaySummary = data.todaySummary;
      this.variable.selectedTimeType = data.selectedTimeType;
      this.variable.userInfo = data.userInfo;
      this.drawPic();
    })
  },
  onReady() {
  },
  onImgOK(e) {
    wx.hideLoading();
    this.setData({
      sharePath: e.detail.path,
      imgVisible: true
    })
  },
  drawPic() {
    const height = wx.getSystemInfoSync().windowHeight;
    const width = wx.getSystemInfoSync().windowWidth;
    const views = [
      {
        type: 'image',
        url: 'https://static.1991421.cn/codetracker/bricklayer-pana.png',
        mode: 'aspectFill',
        css: {
          top: '350rpx',
          left: '-180rpx',
          width: '1000rpx',
        },
      },
      {
        type: 'image',
        url: this.variable.userInfo.avatarUrl,
        mode: 'aspectFill',
        css: {
          top: '24rpx',
          right: '25rpx',
          width: `${100}rpx`,
          borderRadius: `${100 / 2}rpx`
        },
      },
      {
        type: 'text',
        text: `${this.variable.userInfo.nickName}`, // 用户昵称
        css: {
          top: '125rpx',
          right: '20rpx',
          fontSize: '17px',
        }
      },
      {
        type: 'text',
        text: `${this.variable.selectedTimeType.text}`, // 时间区间
        css: {
          top: '48rpx',
          left: '48rpx',
          color: '#1485ee',
          fontWeight: 700,
          fontSize: '20px',
          textDecoration: 'underline'
        }
      },
      {
        type: 'text',
        text: `已码字`,
        css: {
          top: '52rpx',
          left: `${this.variable.selectedTimeType.text.length * 40 + 50}rpx`,
          fontSize: '16px',
        }
      },
      {
        type: 'text',
        text: `${this.variable.todaySummary.cummulative_total.text}`,
        css: {
          top: '100rpx',
          left: '48rpx',
          fontSize: '22px',
          color: '#fa5151'
        }
      },
      {
        type: 'text',
        text: `${getSummaryText('参与项目', this.variable.todaySummary.data[0].projects)}`,
        css: {
          top: '160rpx',
          left: '48rpx',
          fontSize: '16px',
        }
      },
      {
        type: 'text',
        text: `${getSummaryText('开发语言', this.variable.todaySummary.data[0].languages)}`,
        css: {
          top: '220rpx',
          left: '48rpx',
          fontSize: '16px',
        }
      },
      {
        type: 'text',
        text: `${getSummaryText('编辑器', this.variable.todaySummary.data[0].editors)}`,
        css: {
          top: '280rpx',
          left: '48rpx',
          fontSize: '16px',
        }
      },
      {
        type: 'text',
        text: `${getSummaryText('操作系统', this.variable.todaySummary.data[0].operating_systems)}`,
        css: {
          top: '340rpx',
          left: '48rpx',
          fontSize: '16px'
        }
      }
    ];
    this.setData({
      imgDraw: {
        width: `${width * 2}rpx`,
        height: `${height * 2 - 200}rpx`,
        background: '#ededed',
        views,
      }
    })
  }
});
