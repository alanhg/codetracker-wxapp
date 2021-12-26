// index.js

Component({
  properties: {
    id: {
      type: String
    },
    title: {
      type: String,
    },
    dataset: {
      type: Array,
      value: []
    }
  },
  data: {
    collapsed: true
  },
  methods: {
    toggle: function () {
      this.setData({
        collapsed: !this.data.collapsed
      })
    }
  }
});
