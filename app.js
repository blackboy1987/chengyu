import {wxGetSystemInfo} from "./utils/wxUtils";

App({
  onLaunch() {
    // 系统配置信息
    wxGetSystemInfo((res)=>{
      this.globalData.systemInfo=res;
    });
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
    func:{},
  }
})