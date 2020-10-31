import {getStorage} from "./wxUtils";

export const errMap = {
    1000:"后端接口调用失败",
    1001:"参数错误",
    1002:"广告单元无效",
    1003:"内部错误",
    1004:"无合适的广告",
    1005:"广告组件审核中",
    1006:"广告组件被驳回",
    1007:"广告组件被封禁",
    1008:"广告单元已关闭",
}


export const createRewardedVideoAd=function (callback){
    const siteInfo = getStorage("siteInfo");
    if(wx.createRewardedVideoAd){
        const rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-18e594b5d4fabe3c' });
        rewardedVideoAd.onLoad(() => {
            if(callback.onLoad){
                callback.onLoad();
            }
        });
        rewardedVideoAd.onError((err) => {
            if(callback.onError){
                callback.onError(err);
            }
        });
        rewardedVideoAd.onClose((res) => {
            rewardedVideoAd.offClose((e)=>{
                console.log("rewardedVideoAd",e);
            });
            if(callback.onClose){
                callback.onClose(res);
            }
        });
        return rewardedVideoAd;
    }
    return null;

}

export const createInterstitialAd=function (callback){
    const siteInfo = getStorage("siteInfo");
    if(wx.createInterstitialAd){
        const interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-f83096676f1a1054' });
        interstitialAd.onLoad(() => {
            if(callback.onLoad){
                callback.onLoad();
            }
        });
        interstitialAd.onError((err) => {
            if(callback.onError){
                callback.onError(err);
            }
        });
        interstitialAd.onClose((res) => {
            interstitialAd.offClose((e)=>{
                console.log("interstitialAd",e);
            });
            if(callback.onClose){
                callback.onClose(res);
            }
        });

        return interstitialAd;
    }
}
