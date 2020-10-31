import request from "../../utils/request";
import {getStorage, getUserInfo1, siteInfo, updateUserInfo, wxGetSystemInfo, wxLogin} from "../../utils/wxUtils";
import {createInterstitialAd, createRewardedVideoAd} from "../../utils/adUtils";
import {go} from "../../utils/common";
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
    siteInfo:{},
  },
  onLoad(options) {
    const root = this;
    const {parentId} = options;
    root.createRewardedVideoAd();
    root.createInterstitialAd();
    if(parentId!=null){
     request("api/share",()=>{

     },{
       data:{
         parentId
       }
     })
    }
    this.init();
    wxLogin((data)=>{
      root.setData({
        userInfo:data,
      })
    });
    updateUserInfo((isAuth)=>{
      if(!isAuth){
        this.setData({
          loginModalVisible:true,
        })
      }
    });
  },

  login:function(){
    const root = this;
    wxLogin((data)=>{
      app.globalData.isLogin=true;
      app.globalData.userInfo=data;
      root.setData({
        userInfo:data,
      })
    })
  },

  onShow() {
    this.init();
    setTimeout(()=>{
      this.interstitialAdShow();
    },3e3);
  },
  init:function (){
    const root = this;
    // 获取站点配置信息
    siteInfo((data)=>{
      app.globalData.siteInfo = data;
      root.setData({
        siteInfo:data,
      })
    })
    // 远程获取用户信息
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
  rewardedVideoAdShow:function (){
    rewardedVideoAd.show().catch(() => {
      rewardedVideoAd.load()
          .then(() => rewardedVideoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
    })
  },
  createInterstitialAd:function (){
    interstitialAd = createInterstitialAd({})
  },
  interstitialAdShow:function (){
    interstitialAd.show().catch(() => {
      interstitialAd.load()
          .then(() => interstitialAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
    })
  },
  viewAd:function (){
    go("/pages/gold/index");
  },
  buy:function () {
    go("/pages/goods/index");
  }
})
