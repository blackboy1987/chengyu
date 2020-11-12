import {adjustPoint} from "../../utils/common";

let rewardedVideoAd = null;
let interstitialAd = null;
const app = getApp();

import {createRewardedVideoAd,createInterstitialAd} from "../../utils/adUtils";
import {getStorage, getUserInfo1, siteInfo} from "../../utils/wxUtils";

Page({
    data: {
        userInfo:{},
        siteInfo:{},
        visitVideoClick:true,
    },
    onLoad: function (options) {
        const root = this;
        root.createInterstitialAd();
        this.createRewardedVideoAd();
        this.init();
    },
    onShow() {
        this.init();
    },
    init:function (){
        const root = this;
        getUserInfo1((data)=>{
            root.setData({
                userInfo:data
            });
            app.globalData.userInfo = data;
        })
        siteInfo((data)=>{
            root.setData({
                siteInfo:data
            });
            app.globalData.siteInfo = data;
        })
    },
    createRewardedVideoAd:function (){
        const root = this;
        if(rewardedVideoAd){
          return ;
        }
        rewardedVideoAd = createRewardedVideoAd('adunit-18e594b5d4fabe3c',{
            onClose:function (res){
                const {isEnded} = res;
                if(isEnded){
                  root.addPoint();
                }else{
                    wx.showToast({
                        icon:'none',
                        title:'广告未看完无法获取奖励',
                    });
                    root.interstitialAdShow();
                }
            },
            onError:function (){
                wx.showToast({
                    icon:'none',
                    title:'暂无合适广告',
                })
                // root.addPoint(50);
            }
        });
    },
    rewardedVideoAdShow:function (callback){
        rewardedVideoAd.show().then(()=>{
            if(callback){
                callback();
            }
        }).catch(() => {
            rewardedVideoAd.load()
                .then(() => {
                    if(callback){
                        callback();
                    }
                    rewardedVideoAd.show()
                })
                .catch(err => {
                    if(callback){
                        callback();
                    }
                    console.log('激励视频 广告显示失败')
                })
        })
    },
    createInterstitialAd:function (){
        if(interstitialAd){
            return ;
        }
        interstitialAd = createInterstitialAd('adunit-f83096676f1a1054',{})
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
    visitVideo:function (){
        const root = this;
        const {visitVideoClick} = root.data;
        if(visitVideoClick){
            root.setData({
                visitVideoClick:false,
            })
            this.rewardedVideoAdShow(()=>{
                root.setData({
                    visitVideoClick:true
                })
            });
        }else{
            wx.showToast({
                icon:'none',
                title:'请不要频繁点击'
            })
        }

    },
    addPoint:function (point){
        const root = this;
        // 增加金币
        const {siteInfo} = root.data;
        const browseVideoRewardPoint = point || siteInfo.browseVideoRewardPoint || 0;
        if(browseVideoRewardPoint<=0){
            return;
        }
        adjustPoint(siteInfo.browseVideoRewardPoint,"观看广告，奖励金币",(data)=>{
            const {userInfo} = data.data;
            if(userInfo&&Object.keys(userInfo).length>0){
                root.setData({
                    userInfo:userInfo,
                });
                app.globalData.userInfo = userInfo;
            }
        });
    },
    share:function (e){

    },
    onShareAppMessage:function (e){
        return {
            from:'button',
            title: getStorage("siteInfo").name,
            path: "/pages/index/index?parentId="+getStorage("userId"),
        };
    },
});