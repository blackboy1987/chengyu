import request from "./request";
import {Constants} from "./constants";

export const setStorage=(key,value)=>{
    wx.setStorageSync(key,value);
}

export const getStorage=(key)=>{
    return wx.getStorageSync(key);
}

export const wxLogin=(callback)=>{
    wx.login({
        success:(res)=>{
            const {code} = res;
            request('api/login',(result)=>{
                const {data} = result;
                const {token,id} = data;
                setStorage("userId",id);
                setStorage("token",token);
                if(callback){
                    callback(data);
                }
            },{
                data:{
                    code,
                }
            })
        }
    });
}

export const siteInfo=(callback)=>{
    request("api/site",(result)=>{
        const {data} = result;
        setStorage("siteInfo",data);
        callback(data);
    },{
        data:{
            siteInfoId:Constants.siteInfoId,
        }
    });
}

export const wxGetSystemInfo=(callback)=>{
    wx.getSystemInfo({
        success:(result)=>{
            wx.setStorageSync("systemInfo",result);
            if(callback){
                callback(result);
            }
        }
    });
}

export const getUserInfo = (callback) =>{
    wx.getUserInfo({
        success:(data)=>{
            if(callback){
                callback(data);
            }
        }
    })
}

export const updateUserInfo = (callback) =>{

    wxAuthSetting(authSetting=>{
        if(!authSetting['scope.userInfo']){
            if(callback){
                callback({
                    isAuth:false
                })
            }
        }else{
            wx.getUserInfo({
                success: res => {
                    request("api/user/update",()=>{

                    },{
                        data:{
                            ...res.userInfo,
                            id:getStorage("userId")
                        }
                    })
                    if(callback){
                        callback({
                            ...res.userInfo,
                            isAuth:true,
                        });
                    }
                }
            })
        }
    });

}



// 远程获取用户信息
export const getUserInfo1 = (callback) =>{
    request("api/user/info",(res)=>{
        const {data} = res;
        if(callback){
            callback(data);
        }
    });
}

export const wxAuthSetting = (callback) =>{
    wx.getSetting({
        success: res => {
            if(callback){
                callback(res.authSetting);
            }
        }
    })
}