// index.js

import {timeSelectorType} from "../../utils";

Component({
  data: {
    timeSelectorGroups: Object.keys(timeSelectorType).map(item => ({
      text: timeSelectorType[item].text,
      value: timeSelectorType[item].value
    })),
    showTimeSelector: false,
  },
  methods: {
    timerSelectorClick: function ({detail}) {
      this.setData({
          selectedTimeType: this.data.timeSelectorGroups[detail.index],
          showTimeSelector: false,
        }, () => {
          this.triggerEvent('selectevent', this.data.timeSelectorGroups[detail.index])
        }
      )
    },
    timerSelectorShowClick: function () {
      this.setData({
        showTimeSelector: true,
      })
    }
  }
});
