"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.wxGetSystemInfo = exports.getStorage = exports.setStorage = void 0;
exports.setStorage = function (key, value) {
    wx.setStorageSync(key, value);
};
exports.getStorage = function (key) {
    return wx.getStorageSync(key);
};
exports.wxGetSystemInfo = function (callback) {
    wx.getSystemInfo({
        success: function (result) {
            wx.setStorageSync("systemInfo", result);
            if (callback) {
                callback(result);
            }
        }
    });
};
exports.getUserInfo = function (callback) {
    wx.getUserInfo({
        success: function (data) {
            if (callback) {
                callback(data);
            }
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInd4VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxVQUFVLEdBQUMsVUFBQyxHQUFHLEVBQUMsS0FBSztJQUM5QixFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUE7QUFFWSxRQUFBLFVBQVUsR0FBQyxVQUFDLEdBQUc7SUFDeEIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFDLFVBQUMsUUFBUTtJQUNsQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ2IsT0FBTyxFQUFDLFVBQUMsTUFBTTtZQUNYLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUcsUUFBUSxFQUFDO2dCQUNSLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFFWSxRQUFBLFdBQVcsR0FBRyxVQUFDLFFBQVE7SUFDaEMsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUNYLE9BQU8sRUFBQyxVQUFDLElBQUk7WUFDVCxJQUFHLFFBQVEsRUFBQztnQkFDUixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEI7UUFDTCxDQUFDO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFN0b3JhZ2U9KGtleSx2YWx1ZSk9PntcclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKGtleSx2YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTdG9yYWdlPShrZXkpPT57XHJcbiAgICByZXR1cm4gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHd4R2V0U3lzdGVtSW5mbz0oY2FsbGJhY2spPT57XHJcbiAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICBzdWNjZXNzOihyZXN1bHQpPT57XHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwic3lzdGVtSW5mb1wiLHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVzZXJJbmZvID0gKGNhbGxiYWNrKSA9PntcclxuICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICBzdWNjZXNzOihkYXRhKT0+e1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iXX0=