"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustPoint = exports.modal = exports.copy = exports.go = void 0;
var request_1 = require("./request");
exports.go = function (url) {
    wx.navigateTo({
        url: url
    });
};
exports.copy = function (data, callback) {
    wx.setClipboardData({
        data: data,
        success: function () {
            if (callback) {
                callback();
            }
        }
    });
};
exports.modal = function (title, callback) {
    wx.showModal({
        title: title,
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#576B95",
        success: function (res) {
            if (callback) {
                callback(res);
            }
        }
    });
};
exports.adjustPoint = function (point, memo, callback) {
    request_1.default('api/adjust', function (result) {
        var code = result.code, msg = result.msg;
        if (code === -1) {
            wx.showToast({
                title: msg,
                icon: 'none',
            });
            if (callback) {
                callback(result);
            }
        }
    }, {
        data: {
            point: point,
            memo: memo,
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFnQztBQUVuQixRQUFBLEVBQUUsR0FBQyxVQUFDLEdBQUc7SUFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNWLEdBQUcsS0FBQTtLQUNOLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVXLFFBQUEsSUFBSSxHQUFDLFVBQUMsSUFBSSxFQUFDLFFBQVE7SUFDNUIsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1FBQ2hCLElBQUksTUFBQTtRQUNKLE9BQU8sRUFBRTtZQUNMLElBQUcsUUFBUSxFQUFDO2dCQUNSLFFBQVEsRUFBRSxDQUFDO2FBQ2Q7UUFDTCxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBRVksUUFBQSxLQUFLLEdBQUcsVUFBQyxLQUFLLEVBQUMsUUFBUTtJQUNoQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ1QsS0FBSyxFQUFFLEtBQUs7UUFDWixVQUFVLEVBQUUsSUFBSTtRQUNoQixVQUFVLEVBQUUsSUFBSTtRQUNoQixXQUFXLEVBQUUsU0FBUztRQUN0QixXQUFXLEVBQUUsSUFBSTtRQUNqQixZQUFZLEVBQUUsU0FBUztRQUN2QixPQUFPLFlBQUUsR0FBRztZQUNSLElBQUcsUUFBUSxFQUFDO2dCQUNSLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQjtRQUNMLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFFWSxRQUFBLFdBQVcsR0FBQyxVQUFVLEtBQUssRUFBQyxJQUFJLEVBQUMsUUFBUTtJQUNsRCxpQkFBTyxDQUFDLFlBQVksRUFBQyxVQUFDLE1BQU07UUFDakIsSUFBQSxJQUFJLEdBQVEsTUFBTSxLQUFkLEVBQUMsR0FBRyxHQUFJLE1BQU0sSUFBVixDQUFXO1FBQzFCLElBQUcsSUFBSSxLQUFHLENBQUMsQ0FBQyxFQUFDO1lBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDVCxLQUFLLEVBQUMsR0FBRztnQkFDVCxJQUFJLEVBQUMsTUFBTTthQUNkLENBQUMsQ0FBQztZQUNILElBQUcsUUFBUSxFQUFDO2dCQUNSLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwQjtTQUNKO0lBQ0wsQ0FBQyxFQUFDO1FBQ0UsSUFBSSxFQUFDO1lBQ0QsS0FBSyxPQUFBO1lBQ0wsSUFBSSxNQUFBO1NBQ1A7S0FDSixDQUFDLENBQUE7QUFDTixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ289KHVybCk9PntcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29weT0oZGF0YSxjYWxsYmFjayk9PntcclxuICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGFsID0gKHRpdGxlLGNhbGxiYWNrKSA9PntcclxuICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIHNob3dDYW5jZWw6IHRydWUsXHJcbiAgICAgICAgY2FuY2VsVGV4dDogXCLlj5bmtohcIixcclxuICAgICAgICBjYW5jZWxDb2xvcjogXCIjMDAwMDAwXCIsXHJcbiAgICAgICAgY29uZmlybVRleHQ6IFwi56Gu5a6aXCIsXHJcbiAgICAgICAgY29uZmlybUNvbG9yOiBcIiM1NzZCOTVcIixcclxuICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgaWYoY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRqdXN0UG9pbnQ9ZnVuY3Rpb24gKHBvaW50LG1lbW8sY2FsbGJhY2spe1xyXG4gICAgcmVxdWVzdCgnYXBpL2FkanVzdCcsKHJlc3VsdCk9PntcclxuICAgICAgICBjb25zdCB7Y29kZSxtc2d9ID0gcmVzdWx0O1xyXG4gICAgICAgIGlmKGNvZGU9PT0tMSl7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTptc2csXHJcbiAgICAgICAgICAgICAgICBpY29uOidub25lJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LHtcclxuICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgcG9pbnQsXHJcbiAgICAgICAgICAgIG1lbW8sXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSJdfQ==