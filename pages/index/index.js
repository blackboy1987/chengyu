import request from "../../utils/request";
import {getStorage, getUserInfo1, updateUserInfo} from "../../utils/wxUtils";
import {createInterstitialAd, createRewardedVideoAd} from "../../utils/adUtils";
const app = getApp()
let rewardedVideoAd = null;
let interstitialAd = null;

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
    this.createRewardedVideoAd();
    this.createInterstitialAd();
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
    updateUserInfo((isAuth)=>{
      if(!isAuth){
        this.setData({
          loginModalVisible:true,
        })
      }
    });
  },

  login(){
    const root = this;
    wx.login({
      success (res) {
        if (res.code) {
          request("api/login",(res)=>{
            console.log(res,"api/login");
            app.globalData.userInfo = res.data;
            root.setData({
              userInfo:res.data,
            })
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
    getUserInfo1((data)=>{
      root.setData({
        userInfo:data,
      });
      app.globalData.userInfo= data;
    });
  },
  toPlay(){
    const isAuth=app.globalData.userInfo.isAuth;
    if(isAuth){
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
    const root = this;
    app.globalData.userInfo = e.detail.userInfo;
    request("api/user/update",(res)=>{
      app.globalData.userInfo = res.data;
      root.setData({
        userInfo:res.data,
      })
    },{
      data:{
        ...e.detail.userInfo,
        id:getStorage("userId")
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
  },
  question:function () {
    wx.navigateTo({
      url:'/pages/question/index'
    })
  },
  createRewardedVideoAd:function (){
    const root = this;
    rewardedVideoAd = createRewardedVideoAd({
      onClose:function (res){
        const {isEnded} = res;
        if(isEnded){
          console.log("看完了");
        }else{
          console.log("未看完");
        }
      }
    });
  },
  createInterstitialAd:function (){
    const root = this;
    interstitialAd = createInterstitialAd()
  },
})
