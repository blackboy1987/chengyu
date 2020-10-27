import request from "./utils/request";
import {setStorage, wxGetSystemInfo} from "./utils/wxUtils";

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
  },
  globalData: {
    CustomBar:60,
    StatusBar:24,
    isLogin:false,
    siteInfo:{},
    systemInfo:{},
    userInfo:{},
  }
})