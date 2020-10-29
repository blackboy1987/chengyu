import {siteInfo, updateUserInfo, wxGetSystemInfo, wxLogin} from "./utils/wxUtils";

App({
  onLaunch() {
    const root = this;
    // 登录,主要用来获取用户第一次访问的时候获取到openId。
    wxLogin((data)=>{
      root.globalData.isLogin=true;
      root.globalData.userInfo=data;
    })
    // 获取系统配置信息
    siteInfo((data)=>{
      root.globalData.siteInfo = data;
    })
    wxGetSystemInfo((res)=>{
      root.globalData.systemInfo=res;
    });
    updateUserInfo()

  },
  globalData: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    CustomBar:60,
    StatusBar:24,
    isLogin:false,
    siteInfo:{},
    systemInfo:{},
    userInfo:{},
    token:'',
  }
})