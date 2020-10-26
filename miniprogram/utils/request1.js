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
        "baseModal": "idiom",
    };
    if (method === 'POST') {
        header = __assign(__assign({}, header), { "content-type": "application/x-www-form-urlencoded" });
    }
    wx.request({
        url: constants_1.Constants.baseUrl,
        method: method,
        data: __assign(__assign({ appCode: constants_1.Constants.code, appSecret: constants_1.Constants.secret, userToken: userToken }, data), { url: url }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdDEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0MS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXNDO0FBQ3RDLHFDQUFxQztBQUVyQyxJQUFNLE9BQU8sR0FBRyxVQUFDLEdBQVUsRUFBQyxRQUF3QixFQUFDLE9BQVU7SUFBVix3QkFBQSxFQUFBLFlBQVU7SUFDM0QsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUNYLEtBQUssRUFBQyxPQUFPO1FBQ2IsSUFBSSxFQUFDLElBQUk7S0FDWixDQUFDLENBQUM7SUFFSCxJQUFHLENBQUMsT0FBTyxFQUFDO1FBQ1IsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUNELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO0lBQ3ZDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2hDLElBQU0sU0FBUyxHQUFHLG9CQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsSUFBSSxNQUFNLEdBQUc7UUFDVCxjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLFdBQVcsRUFBQyxPQUFPO0tBQ3RCLENBQUM7SUFDRixJQUFJLE1BQU0sS0FBRyxNQUFNLEVBQUM7UUFFaEIsTUFBTSx5QkFDQyxNQUFNLEtBQ1QsY0FBYyxFQUFFLG1DQUFtQyxHQUN0RCxDQUFBO0tBQ0o7SUFDRCxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ1AsR0FBRyxFQUFFLHFCQUFTLENBQUMsT0FBTztRQUN0QixNQUFNLFFBQUE7UUFDTixJQUFJLHNCQUNBLE9BQU8sRUFBQyxxQkFBUyxDQUFDLElBQUksRUFDdEIsU0FBUyxFQUFDLHFCQUFTLENBQUMsTUFBTSxFQUMxQixTQUFTLFdBQUEsSUFDTixJQUFJLEtBQ1AsR0FBRyxLQUFBLEdBQ047UUFDRCxNQUFNLFFBQUE7UUFDTixPQUFPLFlBQUUsR0FBRztZQUNSLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNWLElBQUEsVUFBVSxHQUFJLEdBQUcsV0FBUCxDQUFRO1lBQ3pCLElBQUcsVUFBVSxJQUFFLEdBQUcsSUFBRSxVQUFVLElBQUUsR0FBRyxFQUFDO2dCQUNoQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RCO2lCQUFLO2dCQUNGLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1QsS0FBSyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ3ZCLEtBQUssRUFBQyx3QkFBd0I7aUJBQ2pDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUNELElBQUksWUFBQyxHQUFHO1lBQ0osRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1QsS0FBSyxFQUFDLEdBQUcsQ0FBQyxNQUFNO2dCQUNoQixLQUFLLEVBQUMsbUJBQW1CO2FBQzVCLENBQUMsQ0FBQztRQUNQLENBQUM7S0FDSixDQUFDLENBQUE7QUFDTixDQUFDLENBQUE7QUFFRCxrQkFBZSxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnN0YW50c30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7Z2V0U3RvcmFnZX0gZnJvbSBcIi4vd3hVdGlsc1wiO1xyXG5cclxuY29uc3QgcmVxdWVzdCA9ICh1cmw6c3RyaW5nLGNhbGxiYWNrOihyZXM6YW55KT0+dm9pZCxvcHRpb25zPXt9KT0+e1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOlwi5pWw5o2u5Yqg6L295LitXCIsXHJcbiAgICAgICAgbWFzazp0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYoIW9wdGlvbnMpe1xyXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnO1xyXG4gICAgY29uc3QgZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuICAgIGNvbnN0IHVzZXJUb2tlbiA9IGdldFN0b3JhZ2UoXCJ0b2tlblwiKTtcclxuICAgIGxldCBoZWFkZXIgPSB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICBcImJhc2VNb2RhbFwiOlwiaWRpb21cIixcclxuICAgIH07XHJcbiAgICBpZiAobWV0aG9kPT09J1BPU1QnKXtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaGVhZGVyPSB7XHJcbiAgICAgICAgICAgIC4uLmhlYWRlcixcclxuICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IENvbnN0YW50cy5iYXNlVXJsLFxyXG4gICAgICAgIG1ldGhvZCxcclxuICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgYXBwQ29kZTpDb25zdGFudHMuY29kZSxcclxuICAgICAgICAgICAgYXBwU2VjcmV0OkNvbnN0YW50cy5zZWNyZXQsXHJcbiAgICAgICAgICAgIHVzZXJUb2tlbixcclxuICAgICAgICAgICAgLi4uZGF0YSxcclxuICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyLFxyXG4gICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICBjb25zdCB7c3RhdHVzQ29kZX0gPSByZXM7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1c0NvZGU+PTIwMCYmc3RhdHVzQ29kZTw9Mjk5KXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTpyZXMuZGF0YS5kYXRhLm1zZyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonL2ltYWdlcy9lcnJvckNsaWNrLnBuZydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKGVycil7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTplcnIuZXJyTXNnLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6Jy9pbWFnZXMvZXJyb3IucG5nJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXF1ZXN0OyJdfQ==