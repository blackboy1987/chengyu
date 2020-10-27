import request from "../../utils/request";
const app = getApp()

Page({
  data: {
    userInfo: {},
    loginModalVisible:false,
  },
  onLoad(options) {
    const {parentId} = options;
    if(parentId!=null){
     request("api/share",()=>{

     },{
       data:{
         parentId
       }
     })
    }
    this.init();
  },
  onShow() {
    this.init();
  },
  init:function (){
    const root = this;
    request("api/user/info",(res)=>{
      console.log("init",res,res.data);
      root.setData({
        userInfo:res.data,
      })
    });
  },
  toPlay(){
    const isLogin=app.globalData.isLogin;
    if(isLogin){
      wx.navigateTo({
        url:'/pages/play/index'
      })
    }else{
      this.setData({
        loginModalVisible:true,
      })
    }
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      isLogin:true,
      loginModalVisible:false,
    });
    wx.showToast({
      title:'登录成功',
    })
  },
})