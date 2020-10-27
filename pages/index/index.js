import request from "../../utils/request";
const app = getApp()

Page({
  data: {
    userInfo: {},
    loginModalVisible:false,
    isOpenRank:false,
    rankPage:1,
    hasMore:true,
    rankList:[],
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
    this.login();
  },

  login(){
    const root = this;
    wx.login({
      success (res) {
        console.log("res",res);
        if (res.code) {
          request("api/login",(res)=>{
            console.log(res);
          },{
            data:{
              code:res.code,
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '登陆失败，请重新登陆',
            success (res) {
              if (res.confirm) {
                root.login();
              } else if (res.cancel) {
                wx.showToast({
                  title:"只有登陆了，才能进行答题哦",
                  icon:'none',
                })
              }
            }
          })

        }
      }
    })
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
    app.globalData.userInfo = e.detail.userInfo;
    request("api/user/update",()=>{

    },{
      data:{
        ...e.detail.userInfo
      }
    })
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
  cancel(){
    this.setData({
      loginModalVisible:false,
    })
  },
  openRank(){
    const root = this;
    this.loadRank(1);
    root.setData({
      isOpenRank:true,
    });
  },
  back(){
    this.setData({
      isOpenRank:false
    })
  },
  moreGame(){
    wx.navigateTo({
      url:'/pages/moreGame/index',
    })
  },
  loadMore(){
    const {rankPage} = this.data;
    this.loadRank(rankPage+1);
  },
  loadRank(page){
    const root = this;
    request("api/rank",(result)=>{
      const {current,list,hasMore} = result.data;
      root.setData({
        rankPage:current,
        rankList:list,
        hasMore,
      })
    },{
      data:{
        page,
      }
    })
  }
})
