/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    CustomBar:number,
    StatusBar:number,
    isLogin:boolean;
    siteInfo:{
      [key:string]:any;
    };
    systemInfo:{
      [key:string]:any;
    };
    userInfo:{
      [key:string]:any;
    };
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}