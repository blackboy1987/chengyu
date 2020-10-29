import request from "../../utils/request";
import {getStorage, setStorage} from "../../utils/wxUtils";
const app = getApp();

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
        userInfo:{}
    },
    onLoad: function (options) {
        this.init();
    },
    onShow() {
        this.init();
    },
    init:function (){
        const root = this;
        const userInfo = app.globalData.userInfo;
        root.setData({
            userInfo,
            point:userInfo.point,
            success:false,
            showRedPackage:false,
            redPackageMoney:0,
            openRedPackage:false,
        })

        request("api/game",(response)=>{
            const {data} = response;
            root.setData({
                idiom: data.idiom,
                answers: data.answers,
                position: data.position,
                level:data.level,
            })
            let idiomArray = data.idiom.split("").map((item,index)=>{
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
    select:function (e){
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
        const idiomArray = idiom.split("");
        root.setData({
            answer:text,
            point:point-siteInfo.deductionPoint,
        });

        if(idiomArray[position]===text){
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
                        })
                    }else{
                        root.setData({
                            showRedPackage:false
                        })
                    }
                });
            });
        }else{
            root.discount(level);
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
    open:function (e){
        const root = this;
        request("api/redpackage",res=>{
            const {money,userInfo} = res.data;
            setStorage("levelCount",0);
            app.globalData.userInfo = userInfo;
            root.setData({
                userInfo:userInfo,
                openRedPackage:true,
                redPackageMoney:money || 0,
            });
        },{
            data:{
                level1:getStorage("levelCount"),
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
            title: "来自于分享",
            path: "/pages/index/index?parentId="+getStorage(""),
        };
    },
    closeRedPackage:function (e){
        this.setData({
            showRedPackage:false,
            openRedPackage:false,
        })
    }
});