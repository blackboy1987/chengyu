import {Constants} from "./constants";
import {getStorage} from "./wxUtils";

const request = (url,callback,options={})=>{
    wx.showLoading({
        title:"数据加载中",
        mask:true,
    });

    if(!options){
        options = {};
    }
    const method = options.method || 'POST';
    const data = options.data || {};
    const userToken = getStorage("token");
    let header = {
        'content-type': 'application/json',
        "basemodel":"idiom",
    };
    if (method==='POST'){
        // @ts-ignore
        header= {
            ...header,
        }
    }
    wx.request({
        url: Constants.baseUrl,
        method,
        data:{
            appCode:Constants.code,
            appSecret:Constants.secret,
            userToken,
            ...data,
            url,
        },
        header,
        success (res) {
            wx.hideLoading();
            const {statusCode} = res;
            if(statusCode>=200&&statusCode<=299){
                callback(res.data);
            }else {
                wx.showToast({
                    title:res.data.data.msg,
                    image:'/images/errorClick.png'
                });
            }
        },
        fail(err){
            wx.hideLoading();
            console.log(err.errMsg);
            wx.showModal({
                title:"aaa",
                content:err.errMsg,
            })
        }
    })
}

export default request;