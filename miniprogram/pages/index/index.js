"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../../utils/request");
var app = getApp();
Page({
    data: {
        userInfo: {},
        loginModalVisible: false,
    },
    onLoad: function () {
        this.init();
    },
    onShow: function () {
        this.init();
    },
    init: function () {
        var root = this;
        request_1.default("api/user/info", function (res) {
            console.log("init", res, res.data);
            root.setData({
                userInfo: res.data,
            });
        });
    },
    toPlay: function () {
        var isLogin = app.globalData.isLogin;
        if (isLogin) {
            wx.navigateTo({
                url: '/pages/play/index'
            });
        }
        else {
            this.setData({
                loginModalVisible: true,
            });
        }
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            isLogin: true,
            loginModalVisible: false,
        });
        wx.showToast({
            title: '登录成功',
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLCtDQUEwQztBQUUxQyxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUVoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsRUFBRTtRQUNaLGlCQUFpQixFQUFDLEtBQUs7S0FDeEI7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQ0QsSUFBSSxFQUFDO1FBQ0gsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGlCQUFPLENBQUMsZUFBZSxFQUFDLFVBQUMsR0FBTztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ2xCLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU07UUFDSixJQUFNLE9BQU8sR0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxJQUFHLE9BQU8sRUFBQztZQUNULEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osR0FBRyxFQUFDLG1CQUFtQjthQUN4QixDQUFDLENBQUE7U0FDSDthQUFJO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxpQkFBaUIsRUFBQyxJQUFJO2FBQ3ZCLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUNELFdBQVcsRUFBWCxVQUFZLENBQU07UUFDaEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7WUFDakIsT0FBTyxFQUFDLElBQUk7WUFDWixpQkFBaUIsRUFBQyxLQUFLO1NBQ3hCLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDWCxLQUFLLEVBQUMsTUFBTTtTQUNiLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5pbXBvcnQgcmVxdWVzdCBmcm9tIFwiLi4vLi4vdXRpbHMvcmVxdWVzdFwiO1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHVzZXJJbmZvOiB7fSxcbiAgICBsb2dpbk1vZGFsVmlzaWJsZTpmYWxzZSxcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH0sXG4gIGluaXQ6ZnVuY3Rpb24gKCl7XG4gICAgY29uc3Qgcm9vdCA9IHRoaXM7XG4gICAgcmVxdWVzdChcImFwaS91c2VyL2luZm9cIiwocmVzOmFueSk9PntcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5pdFwiLHJlcyxyZXMuZGF0YSk7XG4gICAgICByb290LnNldERhdGEoe1xuICAgICAgICB1c2VySW5mbzpyZXMuZGF0YSxcbiAgICAgIH0pXG4gICAgfSk7XG4gIH0sXG4gIHRvUGxheSgpe1xuICAgIGNvbnN0IGlzTG9naW49YXBwLmdsb2JhbERhdGEuaXNMb2dpbjtcbiAgICBpZihpc0xvZ2luKXtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6Jy9wYWdlcy9wbGF5L2luZGV4J1xuICAgICAgfSlcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGxvZ2luTW9kYWxWaXNpYmxlOnRydWUsXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgIGlzTG9naW46dHJ1ZSxcbiAgICAgIGxvZ2luTW9kYWxWaXNpYmxlOmZhbHNlLFxuICAgIH0pO1xuICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTon55m75b2V5oiQ5YqfJyxcbiAgICB9KVxuICB9LFxufSlcbiJdfQ==