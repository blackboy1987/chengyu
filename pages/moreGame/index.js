Page({
    data: {},
    onLoad: function (options) {

    },
    go:function (e) {
        const {appid} = e.currentTarget.dataset;
        wx.navigateToMiniProgram({
            appId:appid
        })
    }
});