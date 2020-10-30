import {adjustPoint} from "../../utils/common";

let rewardedVideoAd = null;
let interstitialAd = null;
const app = getApp();

import {createInterstitialAd, createRewardedVideoAd} from "../../utils/adUtils";
import {getStorage, getUserInfo1} from "../../utils/wxUtils";

Page({
    data: {
        userInfo:{},
        siteInfo:{}
    },
    onLoad: function (options) {
        this.init();
    },
    onShow() {
        this.init();
    },
    init:function (){
        const root = this;
        this.createRewardedVideoAd();
        this.createInterstitialAd();
        this.setData({
            siteInfo:app.globalData.siteInfo
        });
        getUserInfo1((data)=>{
            root.setData({
                userInfo:data
            });
            app.globalData.siteInfo = data;
        })
    },
    createRewardedVideoAd:function (){
        const root = this;
        rewardedVideoAd = createRewardedVideoAd({
            onClose:function (res){
                const {isEnded} = res;
                if(isEnded){
                  root.addPoint();
                }else{
                    wx.showToast({
                        icon:'none',
                        title:'广告未看完无法获取奖励',
                    })
                    console.log("未看完");
                }
            },
            onError:function (){
                wx.showToast({
                    icon:'none',
                    title:'广告推送失败，系统赠送50积分',
                })
                root.addPoint(50);
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
    visitVideo:function (){
        this.rewardedVideoAdShow()
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
            console.log(data,userInfo);
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