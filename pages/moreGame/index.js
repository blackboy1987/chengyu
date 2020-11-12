import request from "../../utils/request";

Page({
    data: {
        moreGames:[]
    },
    onLoad: function (options) {
        this.init();
    },
    init:function (){
        const root = this;
      request("api/more_game",(result)=>{
          const {data} = result;
          root.setData({
              moreGames:data,
          })
      })
    },
    go:function (e) {
        const {appid,path} = e.currentTarget.dataset;
        wx.navigateToMiniProgram({
            appId:appid,
            path:path ? path :'/pages/index/index'
        })
    }
});