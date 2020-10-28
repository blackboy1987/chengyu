import request from "./utils/request";
import {getStorage, setStorage, wxGetSystemInfo} from "./utils/wxUtils";

App({
  onLaunch() {
    const root = this;
    // 登录
    wx.login({
      success:(res)=>{
        const {code} = res;
        request('api/login',(result)=>{
          const {data} = result;
          const {token,id} = data;
          setStorage("userId",id);
          setStorage("token",token);
          root.globalData.isLogin=true;
          root.globalData.userInfo=data;
        },{
          data:{
            code,
          }
        })
      }
    });
    request("api/site",(result)=>{
      const {data} = result;
      root.globalData.siteInfo = data;
      setStorage("siteInfo",data);
    });

    wxGetSystemInfo((res)=>{
      root.globalData.systemInfo=res;
      setStorage("systemInfo",res);
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              request("api/user/update",()=>{

              },{
                data:{
                  ...res.userInfo,
                  id:getStorage("userId")
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


  },
  globalData: {
    CustomBar:60,
    StatusBar:24,
    isLogin:false,
    siteInfo:{},
    systemInfo:{},
    userInfo:{},
    token:'',
  }
})