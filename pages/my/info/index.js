import {getStorage, getUserInfo1} from "../../../utils/wxUtils";
import request from "../../../utils/request";

const app = getApp();

Page({
    data: {
        name:'',
        mobile:'',
        wechat:'',
        active:false,
    },
    onLoad: function (options) {
        const root = this;
        getUserInfo1((data)=>{
            const {name,wechat,mobile} = data;
            this.setData({
                name,
                wechat,
                mobile,
            });
            root.check();
        })
    },
    check:function(){
      const {name,mobile,wechat} = this.data;
      if(name&&this.checkMobile(mobile)&&wechat){
          this.setData({
              active:true
          })
      }else{
          this.setData({
              active:false
          })
      }
    },
    checkMobile:function(mobile){
        const mobileReg=/^[1][3,5,6,8,9][0-9]{9}$/;
        if (!mobileReg.test(mobile)) {
            return false;
        }
        return true;
    },
    inputName(e){
        const {type} = e.currentTarget.dataset;
        const {value} = e.detail;
        this.setData({
            [`${type}`]:value
        });
        this.check();
    },
    save:function () {
        const {name,mobile,wechat,active} = this.data;
        if(!active){
            return;
        }
        request("api/user/update1",()=>{

        },{
            data:{
                id:getStorage("userId"),
                mobile,
                name,
                wechat,
            }
        })
    }
});