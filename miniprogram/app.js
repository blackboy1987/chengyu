"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("./utils/request");
var wxUtils_1 = require("./utils/wxUtils");
App({
    globalData: {
        CustomBar: 60,
        StatusBar: 24,
        isLogin: false,
        siteInfo: {},
        systemInfo: {},
        userInfo: {},
    },
    onLaunch: function () {
        var root = this;
        wx.login({
            success: function (res) {
                var code = res.code;
                request_1.default('api/login', function (result) {
                    var data = result.data;
                    var token = data.token, id = data.id;
                    wxUtils_1.setStorage("userId", id);
                    wxUtils_1.setStorage("token", token);
                    root.globalData.isLogin = true;
                    root.globalData.userInfo = data;
                }, {
                    data: {
                        code: code,
                    }
                });
            }
        });
        request_1.default("api/site", function (result) {
            var data = result.data;
            root.globalData.siteInfo = data;
            wxUtils_1.setStorage("siteInfo", data);
        });
        wxUtils_1.wxGetSystemInfo(function (res) {
            root.globalData.systemInfo = res;
            wxUtils_1.setStorage("systemInfo", res);
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXNDO0FBQ3RDLDJDQUE0RDtBQUU1RCxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUMsRUFBRTtRQUNaLFNBQVMsRUFBQyxFQUFFO1FBQ1osT0FBTyxFQUFDLEtBQUs7UUFDYixRQUFRLEVBQUMsRUFBRTtRQUNYLFVBQVUsRUFBQyxFQUFFO1FBQ2IsUUFBUSxFQUFDLEVBQUU7S0FDWjtJQUNELFFBQVEsRUFBUjtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFDLFVBQUMsR0FBRztnQkFDSCxJQUFBLElBQUksR0FBSSxHQUFHLEtBQVAsQ0FBUTtnQkFDbkIsaUJBQU8sQ0FBQyxXQUFXLEVBQUMsVUFBQyxNQUFNO29CQUNsQixJQUFBLElBQUksR0FBSSxNQUFNLEtBQVYsQ0FBVztvQkFDZixJQUFBLEtBQUssR0FBTyxJQUFJLE1BQVgsRUFBQyxFQUFFLEdBQUksSUFBSSxHQUFSLENBQVM7b0JBQ3hCLG9CQUFVLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN4QixvQkFBVSxDQUFDLE9BQU8sRUFBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO29CQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7Z0JBQ2hDLENBQUMsRUFBQztvQkFDQSxJQUFJLEVBQUM7d0JBQ0gsSUFBSSxNQUFBO3FCQUNMO2lCQUNGLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUM7UUFDSCxpQkFBTyxDQUFDLFVBQVUsRUFBQyxVQUFDLE1BQVU7WUFDckIsSUFBQSxJQUFJLEdBQUksTUFBTSxLQUFWLENBQVc7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLG9CQUFVLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgseUJBQWUsQ0FBQyxVQUFDLEdBQU87WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUMsR0FBRyxDQUFDO1lBQy9CLG9CQUFVLENBQUMsWUFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC50c1xuaW1wb3J0IHJlcXVlc3QgZnJvbSBcIi4vdXRpbHMvcmVxdWVzdFwiO1xuaW1wb3J0IHtzZXRTdG9yYWdlLCB3eEdldFN5c3RlbUluZm99IGZyb20gXCIuL3V0aWxzL3d4VXRpbHNcIjtcblxuQXBwPElBcHBPcHRpb24+KHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIEN1c3RvbUJhcjo2MCxcbiAgICBTdGF0dXNCYXI6MjQsXG4gICAgaXNMb2dpbjpmYWxzZSxcbiAgICBzaXRlSW5mbzp7fSxcbiAgICBzeXN0ZW1JbmZvOnt9LFxuICAgIHVzZXJJbmZvOnt9LFxuICB9LFxuICBvbkxhdW5jaCgpIHtcbiAgICBjb25zdCByb290ID0gdGhpcztcbiAgICAvLyDnmbvlvZVcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOihyZXMpPT57XG4gICAgICAgIGNvbnN0IHtjb2RlfSA9IHJlcztcbiAgICAgICAgcmVxdWVzdCgnYXBpL2xvZ2luJywocmVzdWx0KT0+e1xuICAgICAgICAgIGNvbnN0IHtkYXRhfSA9IHJlc3VsdDtcbiAgICAgICAgICBjb25zdCB7dG9rZW4saWR9ID0gZGF0YTtcbiAgICAgICAgICBzZXRTdG9yYWdlKFwidXNlcklkXCIsaWQpO1xuICAgICAgICAgIHNldFN0b3JhZ2UoXCJ0b2tlblwiLHRva2VuKTtcbiAgICAgICAgICByb290Lmdsb2JhbERhdGEuaXNMb2dpbj10cnVlO1xuICAgICAgICAgIHJvb3QuZ2xvYmFsRGF0YS51c2VySW5mbz1kYXRhO1xuICAgICAgICB9LHtcbiAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJlcXVlc3QoXCJhcGkvc2l0ZVwiLChyZXN1bHQ6YW55KT0+e1xuICAgICAgY29uc3Qge2RhdGF9ID0gcmVzdWx0O1xuICAgICAgcm9vdC5nbG9iYWxEYXRhLnNpdGVJbmZvID0gZGF0YTtcbiAgICAgIHNldFN0b3JhZ2UoXCJzaXRlSW5mb1wiLGRhdGEpO1xuICAgIH0pO1xuXG4gICAgd3hHZXRTeXN0ZW1JbmZvKChyZXM6YW55KT0+e1xuICAgICAgcm9vdC5nbG9iYWxEYXRhLnN5c3RlbUluZm89cmVzO1xuICAgICAgc2V0U3RvcmFnZShcInN5c3RlbUluZm9cIixyZXMpO1xuICAgIH0pO1xuICB9LFxufSkiXX0=