import request from "../../utils/request";
import {getStorage, getUserInfo1, setStorage, siteInfo} from "../../utils/wxUtils";
import {createInterstitialAd, createRewardedVideoAd} from "../../utils/adUtils";
import {adjustPoint} from "../../utils/common";
const app = getApp();
let rewardedVideoAd = null;
let rewardedVideoAd1 = null;
let interstitialAd = null;

Page({
    data: {
        idiom:'',
        idiomArray:[],
        position:0,
        answer:'',
        answers:[],
        success:false,
        showRedPackage:false,
        redPackageMoney:0,
        openRedPackage:false,
        point:0,
        level:0,
        parentId:0,
        userInfo:{},
        siteInfo:{},
        openRedPackageType:0,
        visitVideoClick:true,
        visitVideoClick1:true,
    },
    onLoad: function (options) {
        const {parentId} = options;
        this.setData({
            parentId,
        })
        if(parentId!=null){
            request("api/share",()=>{

            },{
                data:{
                    ...options
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
        root.createRewardedVideoAd();
        root.createRewardedVideoAd1()
        root.createInterstitialAd();
        this.getUserInfo1();
        root.setData({
            success:false,
            showRedPackage:false,
            redPackageMoney:0,
            openRedPackage:false,
        })

        siteInfo((data)=>{
            root.setData({
                siteInfo:data
            });
            app.globalData.siteInfo = data;
        })

        request("api/game",(response)=>{
            console.log(response,"response");
            const {data,code,msg} = response;
            if(code!==0){
                wx.showToast({
                    icon:'none',
                    title:msg,
                })
                wx.navigateTo({
                    url:'/pages/index/index'
                })
            }
            root.setData({
                idiom: data.idiom,
                answers: data.answers,
                position: data.position,
                level:data.level,
            })
            let idiomArray = data.idiom.map((item,index)=>{
                if(index===data.position){
                    return '?';
                }
                return item;
            });
            this.setData({
                idiomArray,
                answer:'',
            });
        })
    },
    getUserInfo1:function (){
        const root = this;
        getUserInfo1((data)=>{
            root.setData({
                point:data.point || 0,
                userInfo:data,
            })
        })
    },
    select:function (e){
        console.log('abc');
        const root = this;
        const siteInfo = app.globalData.siteInfo;
        const {text} = e.currentTarget.dataset;
        const {position,idiom,point,answer,level} = root.data;
        if(text===answer){
            return;
        }
        if(point<siteInfo.deductionPoint){
            wx.showModal({
                cancelText:'取消',
                confirmText:'我知道了',
                confirmColor:'#db645e',
                title:'温馨提示',
                content:'您的金币已经不足，请返回小程序首页，获取更多金币',
                complete:function (res){
                    if(res.confirm){
                        wx.navigateTo({
                            url:'/pages/index/index'
                        })
                    }
                }
            })
            return;
        }
        root.setData({
            answer:text,
            point:point-siteInfo.deductionPoint,
        });

        if(idiom[position]===text){
            const levelCount = getStorage("levelCount") || 0;
            setStorage("levelCount",parseInt(levelCount)+1);
            root.setData({
                success:true,
            });
            root.discount(level,()=>{
                root.success(level,getStorage("levelCount"),res=>{
                    if(res){
                        root.setData({
                            showRedPackage:true
                        });
                        root.interstitialAdShow();
                    }else{
                        root.setData({
                            showRedPackage:false
                        })
                    }
                });
            });

        }else{
            root.discount(level,()=>{
                root.error(level,getStorage("levelCount"),res=>{

                });
            });
            root.setData({
                success:false,
            });
            setStorage("levelCount",0);
            wx.showToast({
                image:'/images/error.png'
            });
        }
    },
    discount:function (level,callback){
      request("api/discount",(res)=>{
          if(callback){
              app.globalData.userInfo = res.data;
              callback("discount",res.data);
          }
      },{
          data:{
              level,
          }
      });
    },
    success:function (level,levelCount,callback){
        request("api/success",(res)=>{
            const {data} = res;
            if(callback){
                callback(data);
            }
        },{
            data:{
                level,
                levelCount,
            }
        });
    },
    error:function (level,levelCount,callback){
        request("api/error",(res)=>{
            const {data} = res;
            if(callback){
                callback(data);
            }
        },{
            data:{
                level,
                levelCount,
            }
        });
    },
    open:function (e){
        const root = this;
        const {parentId,openRedPackageType} = root.data;
        request("api/redpackage",res=>{
            const {money,userInfo} = res.data;
            setStorage("levelCount",0);
            app.globalData.userInfo = userInfo;
            root.setData({
                userInfo:userInfo,
                openRedPackage:true,
                redPackageMoney:money || 0,
                openRedPackageType:0,
            });
        },{
            data:{
                level1:getStorage("levelCount"),
                parentId,
                openRedPackageType,
            }
        })
    },
    next:function (e){
        this.init();
    },
    share:function (e){

    },
    onShareAppMessage:function (e){
        return {
            from:'button',
            title: getStorage("siteInfo").name,
            path: "/pages/play/index?parentId="+getStorage("userId"),
        };
    },
    closeRedPackage:function (e){
        this.setData({
            showRedPackage:false,
            openRedPackage:false,
        })
    },
    createRewardedVideoAd:function (){
        const root = this;
        if(rewardedVideoAd){
            return ;
        }
        rewardedVideoAd = createRewardedVideoAd('adunit-9b4cc5130d3da444',{
            onClose:function (res){
                const {isEnded} = res;
                if(isEnded){
                    root.setData({
                        openRedPackageType:1,
                    })
                    console.log("看完了");
                }else{
                    console.log("未看完");
                }
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
                    rewardedVideoAd.show()
                    if(callback){
                        callback();
                    }
                })
                .catch(err => {
                    if(callback){
                        callback();
                    }
                    console.log('激励视频 广告显示失败')
                })
        })
    },

    createRewardedVideoAd1:function (){
        const root = this;
        if(rewardedVideoAd1){
            return ;
        }
        rewardedVideoAd1 = createRewardedVideoAd("adunit-18e594b5d4fabe3c",{
            onClose:function (res){
                const {isEnded} = res;
                if(isEnded){
                    if(isEnded){
                        root.addPoint();
                    }else{
                        wx.showToast({
                            icon:'none',
                            title:'广告未看完无法获取奖励',
                        });
                    }
                }else{
                    console.log("未看完");
                }
            }
        });
    },
    rewardedVideoAdShow1:function (callback){
        rewardedVideoAd1.show().then(()=>{
            if(callback){
                callback();
            }
        }).catch(() => {
            rewardedVideoAd1.load()
                .then(() => {
                    rewardedVideoAd1.show();
                    if(callback){
                        callback();
                    }
                })
                .catch(err => {
                    wx.showToast({
                        icon:'none',
                        title:'暂无合适广告',
                    });
                    if(callback){
                        callback();
                    }
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
    // 看视频红包翻倍
    openVideo:function (){
        const root = this;
        const {visitVideoClick} = root.data;
        if(visitVideoClick){
            root.setData({
                visitVideoClick:false,
            })
            root.rewardedVideoAdShow(()=>{
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
                    point:userInfo.point,
                });
                app.globalData.userInfo = userInfo;
            }
        });
    },
    gold:function (){

        const root = this;
        const {visitVideoClick1} = root.data;
        if(visitVideoClick1){
            root.setData({
                visitVideoClick1:false,
            })
            this.rewardedVideoAdShow1(()=>{
                root.setData({
                    visitVideoClick1:true
                })
            });
        }else{
            wx.showToast({
                icon:'none',
                title:'请不要频繁点击'
            })
        }
    }
});