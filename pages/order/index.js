import request from "../../utils/request";
import {copy, go} from "../../utils/common";
import {getUserInfo1} from "../../utils/wxUtils";

Page({
    data: {
        products:[],
        current:'',
    },
    onLoad: function (options) {
        this.init();
    },
    init:function (){
        request("api/order/list",(data)=>{
            this.setData({
                products:data.data,
            })
        });
    },
    copy:function (e){
        const {sn} = e.currentTarget.dataset;
        if(!sn){
            return;
        }
        this.setData({
            current:sn
        })
        copy(sn,()=>{
            wx.showToast({
                icon:'none',
                title:'复制成功',
            })
        })
    }
});