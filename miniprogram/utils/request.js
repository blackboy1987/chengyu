"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var wxUtils_1 = require("./wxUtils");
var request = function (url, callback, options) {
    if (options === void 0) { options = {}; }
    wx.showLoading({
        title: "数据加载中",
        mask: true,
    });
    if (!options) {
        options = {};
    }
    var method = options.method || 'GET';
    var data = options.data || {};
    var userToken = wxUtils_1.getStorage("token");
    var header = {
        'content-type': 'application/json',
    };
    if (method === 'POST') {
        header = __assign(__assign({}, header), { "content-type": "application/x-www-form-urlencoded" });
    }
    wx.request({
        url: constants_1.Constants.baseUrl + url,
        method: method,
        data: __assign({ appCode: constants_1.Constants.code, appSecret: constants_1.Constants.secret, userToken: userToken }, data),
        header: header,
        success: function (res) {
            wx.hideLoading();
            var statusCode = res.statusCode;
            if (statusCode >= 200 && statusCode <= 299) {
                callback(res.data);
            }
            else {
                wx.showToast({
                    title: res.data.data.msg,
                    image: '/images/errorClick.png'
                });
            }
        },
        fail: function (err) {
            wx.hideLoading();
            wx.showToast({
                title: err.errMsg,
                image: '/images/error.png'
            });
        }
    });
};
exports.default = request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFzQztBQUN0QyxxQ0FBcUM7QUFFckMsSUFBTSxPQUFPLEdBQUcsVUFBQyxHQUFVLEVBQUMsUUFBd0IsRUFBQyxPQUFVO0lBQVYsd0JBQUEsRUFBQSxZQUFVO0lBQzNELEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDWCxLQUFLLEVBQUMsT0FBTztRQUNiLElBQUksRUFBQyxJQUFJO0tBQ1osQ0FBQyxDQUFDO0lBRUgsSUFBRyxDQUFDLE9BQU8sRUFBQztRQUNSLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDaEI7SUFDRCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztJQUN2QyxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNoQyxJQUFNLFNBQVMsR0FBRyxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLElBQUksTUFBTSxHQUFHO1FBQ1QsY0FBYyxFQUFFLGtCQUFrQjtLQUNyQyxDQUFDO0lBQ0YsSUFBSSxNQUFNLEtBQUcsTUFBTSxFQUFDO1FBRWhCLE1BQU0seUJBQ0MsTUFBTSxLQUNULGNBQWMsRUFBRSxtQ0FBbUMsR0FDdEQsQ0FBQTtLQUNKO0lBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNQLEdBQUcsRUFBRSxxQkFBUyxDQUFDLE9BQU8sR0FBQyxHQUFHO1FBQzFCLE1BQU0sUUFBQTtRQUNOLElBQUksYUFDQSxPQUFPLEVBQUMscUJBQVMsQ0FBQyxJQUFJLEVBQ3RCLFNBQVMsRUFBQyxxQkFBUyxDQUFDLE1BQU0sRUFDMUIsU0FBUyxXQUFBLElBQ04sSUFBSSxDQUNWO1FBQ0QsTUFBTSxRQUFBO1FBQ04sT0FBTyxZQUFFLEdBQUc7WUFDUixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDVixJQUFBLFVBQVUsR0FBSSxHQUFHLFdBQVAsQ0FBUTtZQUN6QixJQUFHLFVBQVUsSUFBRSxHQUFHLElBQUUsVUFBVSxJQUFFLEdBQUcsRUFBQztnQkFDaEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QjtpQkFBSztnQkFDRixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNULEtBQUssRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUN2QixLQUFLLEVBQUMsd0JBQXdCO2lCQUNqQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7UUFDRCxJQUFJLFlBQUMsR0FBRztZQUNKLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNULEtBQUssRUFBQyxHQUFHLENBQUMsTUFBTTtnQkFDaEIsS0FBSyxFQUFDLG1CQUFtQjthQUM1QixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdGFudHN9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge2dldFN0b3JhZ2V9IGZyb20gXCIuL3d4VXRpbHNcIjtcclxuXHJcbmNvbnN0IHJlcXVlc3QgPSAodXJsOnN0cmluZyxjYWxsYmFjazoocmVzOmFueSk9PnZvaWQsb3B0aW9ucz17fSk9PntcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICB0aXRsZTpcIuaVsOaNruWKoOi9veS4rVwiLFxyXG4gICAgICAgIG1hc2s6dHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmKCFvcHRpb25zKXtcclxuICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJztcclxuICAgIGNvbnN0IGRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcbiAgICBjb25zdCB1c2VyVG9rZW4gPSBnZXRTdG9yYWdlKFwidG9rZW5cIik7XHJcbiAgICBsZXQgaGVhZGVyID0ge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICB9O1xyXG4gICAgaWYgKG1ldGhvZD09PSdQT1NUJyl7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGhlYWRlcj0ge1xyXG4gICAgICAgICAgICAuLi5oZWFkZXIsXHJcbiAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiBDb25zdGFudHMuYmFzZVVybCt1cmwsXHJcbiAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICBhcHBDb2RlOkNvbnN0YW50cy5jb2RlLFxyXG4gICAgICAgICAgICBhcHBTZWNyZXQ6Q29uc3RhbnRzLnNlY3JldCxcclxuICAgICAgICAgICAgdXNlclRva2VuLFxyXG4gICAgICAgICAgICAuLi5kYXRhLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyLFxyXG4gICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICBjb25zdCB7c3RhdHVzQ29kZX0gPSByZXM7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1c0NvZGU+PTIwMCYmc3RhdHVzQ29kZTw9Mjk5KXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTpyZXMuZGF0YS5kYXRhLm1zZyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonL2ltYWdlcy9lcnJvckNsaWNrLnBuZydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKGVycil7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTplcnIuZXJyTXNnLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6Jy9pbWFnZXMvZXJyb3IucG5nJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXF1ZXN0OyJdfQ==