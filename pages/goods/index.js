import request from "../../utils/request";
import {go} from "../../utils/common";
import {getUserInfo1, siteInfo} from "../../utils/wxUtils";

const app = getApp();
Page({
    data: {
        products:[],
        siteInfo:{}
    },
    onLoad: function (options) {
        this.init();
    },
    init:function (){
        const {siteInfo} = app.globalData;
        this.setData({
            siteInfo,
        })
        if(!siteInfo.isOpen){
            wx.navigateTo({
                url:'/pages/index/index'
            })
        }else{
            request("api/product",(data)=>{
                this.setData({
                    products:data.data,
                })
            });
        }




    },
    myInfo:function (){
        go("/pages/my/info/index");
    },
    orderRecord:function (){
        go("/pages/order/index");
    },
    buy:function (e){
        const root = this;
        const {productid,price,stock,sales} = e.currentTarget.dataset;

        getUserInfo1((data)=>{
            if(data.money<price){
                wx.showToast({
                    icon:'none',
                    title:'余额不足，请先玩玩成语获取奖励再来吧！！！'
                });
                return;
            }
            request("api/order/create",(result=>{
                const {code,msg,data} = result;
                if(code!==0){
                    wx.showToast({
                        icon:'none',
                        title:msg,
                    });
                }
                if(data){
                    app.globalData.userInfo = data;
                }
                root.init();
            }),{
                data:{
                    price,
                    productId:productid,
                }
            })
        })

    }
});